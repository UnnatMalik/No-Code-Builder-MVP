from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.publishing.services import publish_project

from .models import Project
from .permissions import IsOwner
from .serializers import LayoutSerializer, ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        if not self.request.user or not self.request.user.is_authenticated:
            return Project.objects.none()
        return Project.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["get"], url_path="layout")
    def layout(self, request, pk=None):
        project = self.get_object()
        serializer = LayoutSerializer({"layout": project.layout})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @layout.mapping.put
    def update_layout(self, request, pk=None):
        project = self.get_object()
        serializer = LayoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project.layout = serializer.validated_data["layout"]
        project.save(update_fields=["layout", "updated_at"])
        return Response({"layout": project.layout}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="publish")
    def publish(self, request, pk=None):
        try:
            project = self.get_object()
            result = publish_project(project)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Publish error for project {pk}: {str(e)}", exc_info=True)
            return Response(
                {"detail": f"Publishing failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
