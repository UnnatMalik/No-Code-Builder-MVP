import shutil
import tempfile
from pathlib import Path

from django.contrib.auth import get_user_model
from django.test import override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Project


User = get_user_model()


class ProjectApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="owner1", email="owner1@example.com", password="StrongPass@123"
        )
        self.other_user = User.objects.create_user(
            username="owner2", email="owner2@example.com", password="StrongPass@123"
        )
        self.project = Project.objects.create(user=self.user, name="Project A")

    def _authenticate(self, username, password="StrongPass@123"):
        response = self.client.post(
            reverse("token_obtain_pair"),
            {"username": username, "password": password},
            format="json",
        )
        token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_projects_require_authentication(self):
        response = self.client.get(reverse("project-list"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_owner_can_crud_project(self):
        self._authenticate("owner1")

        create_response = self.client.post(
            reverse("project-list"), {"name": "New Project"}, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)

        project_id = create_response.data["id"]
        detail_response = self.client.get(reverse("project-detail", args=[project_id]))
        self.assertEqual(detail_response.status_code, status.HTTP_200_OK)

        update_response = self.client.put(
            reverse("project-detail", args=[project_id]),
            {"name": "Updated Project"},
            format="json",
        )
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.data["name"], "Updated Project")

        delete_response = self.client.delete(reverse("project-detail", args=[project_id]))
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)

    def test_non_owner_cannot_access_foreign_project(self):
        self._authenticate("owner2")
        response = self.client.get(reverse("project-detail", args=[self.project.id]))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_layout_endpoint_accepts_nested_layout_payload(self):
        self._authenticate("owner1")

        payload = {
            "layout": {
                "layout": {
                    "type": "container",
                    "children": [
                        {"type": "heading", "level": 1, "content": "Welcome"},
                        {"type": "text", "content": "Hello"},
                    ],
                }
            }
        }
        update_response = self.client.put(
            reverse("project-layout", args=[self.project.id]),
            payload,
            format="json",
        )
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.data["layout"]["type"], "container")

        get_response = self.client.get(reverse("project-layout", args=[self.project.id]))
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
        self.assertEqual(get_response.data["layout"]["type"], "container")

    def test_layout_endpoint_accepts_extended_builder_types(self):
        self._authenticate("owner1")

        payload = {
            "layout": {
                "type": "container",
                "children": [
                    {
                        "type": "navbar",
                        "children": [
                            {
                                "type": "row",
                                "children": [
                                    {
                                        "type": "column",
                                        "children": [
                                            {
                                                "type": "card",
                                                "children": [
                                                    {
                                                        "type": "image",
                                                        "props": {"src": "https://example.com/hero.png"},
                                                    },
                                                    {"type": "button", "content": "Get Started"},
                                                ],
                                            }
                                        ],
                                    }
                                ],
                            }
                        ],
                    },
                    {"type": "footer", "children": [{"type": "text", "content": "Footer"}]},
                ],
            }
        }

        response = self.client.put(
            reverse("project-layout", args=[self.project.id]),
            payload,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["layout"]["children"][0]["type"], "navbar")

    def test_publish_creates_output_file(self):
        self._authenticate("owner1")
        self.project.layout = {
            "type": "container",
            "children": [
                {"type": "heading", "level": 1, "content": "Welcome to My Website"},
                {"type": "text", "content": "This page is generated using a No-Code Builder."},
            ],
        }
        self.project.save(update_fields=["layout", "updated_at"])

        temp_media_root = tempfile.mkdtemp()
        self.addCleanup(lambda: shutil.rmtree(temp_media_root, ignore_errors=True))

        with override_settings(MEDIA_ROOT=temp_media_root):
            response = self.client.post(reverse("project-publish", args=[self.project.id]), format="json")
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data["published_path"], f"sites/{self.project.id}/index.html")

            output_file = Path(temp_media_root) / "sites" / str(self.project.id) / "index.html"
            self.assertTrue(output_file.exists())
            html = output_file.read_text(encoding="utf-8")
            self.assertIn("Welcome to My Website", html)

    def test_publish_renders_extended_builder_types(self):
        self._authenticate("owner1")
        self.project.layout = {
            "type": "container",
            "children": [
                {
                    "type": "navbar",
                    "children": [{"type": "text", "content": "Top Navigation"}],
                },
                {
                    "type": "row",
                    "children": [
                        {
                            "type": "column",
                            "children": [
                                {
                                    "type": "card",
                                    "children": [
                                        {"type": "image", "props": {"src": "https://example.com/card.png"}},
                                        {"type": "button", "content": "Learn More", "props": {"href": "https://example.com"}},
                                    ],
                                }
                            ],
                        }
                    ],
                },
                {
                    "type": "footer",
                    "children": [{"type": "text", "content": "Copyright"}],
                },
            ],
        }
        self.project.save(update_fields=["layout", "updated_at"])

        temp_media_root = tempfile.mkdtemp()
        self.addCleanup(lambda: shutil.rmtree(temp_media_root, ignore_errors=True))

        with override_settings(MEDIA_ROOT=temp_media_root):
            response = self.client.post(reverse("project-publish", args=[self.project.id]), format="json")
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            output_file = Path(temp_media_root) / "sites" / str(self.project.id) / "index.html"
            self.assertTrue(output_file.exists())
            html = output_file.read_text(encoding="utf-8")
            self.assertIn("<nav", html)
            self.assertIn("<footer", html)
            self.assertIn('href="https://example.com"', html)
            self.assertIn('src="https://example.com/card.png"', html)
