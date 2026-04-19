from pathlib import Path

from django.conf import settings

from .generator import render_document


def publish_project(project):
    html = render_document(project.layout or {"type": "container", "children": []})

    output_dir = Path(settings.MEDIA_ROOT) / "sites" / str(project.id)
    output_dir.mkdir(parents=True, exist_ok=True)

    output_file = output_dir / "index.html"
    output_file.write_text(html, encoding="utf-8")

    relative_path = (Path("sites") / str(project.id) / "index.html").as_posix()
    project.is_published = True
    project.published_path = relative_path
    project.save(update_fields=["is_published", "published_path", "updated_at"])

    return {
        "message": "Project published successfully.",
        "published_path": relative_path,
        "public_url": f"{settings.MEDIA_URL}{relative_path}",
    }
