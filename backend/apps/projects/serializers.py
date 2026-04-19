from rest_framework import serializers

from apps.builder.validators import validate_layout_payload

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "name", "is_published", "created_at"]
        read_only_fields = ["id", "is_published", "created_at"]


class LayoutSerializer(serializers.Serializer):
    layout = serializers.JSONField()

    @staticmethod
    def _normalize_layout(value):
        # Accept accidental nested payloads like {"layout": {"type": ...}}.
        current = value
        for _ in range(3):
            if not isinstance(current, dict):
                break
            if "type" in current:
                break
            nested = current.get("layout")
            if isinstance(nested, dict):
                current = nested
                continue
            break
        return current

    def validate_layout(self, value):
        normalized = self._normalize_layout(value)
        validate_layout_payload(normalized)
        return normalized
