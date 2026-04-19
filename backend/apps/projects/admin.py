from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "user", "is_published", "created_at", "updated_at")
    search_fields = ("name", "user__username", "user__email")
    list_filter = ("is_published", "created_at")
