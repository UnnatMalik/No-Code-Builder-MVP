import os
from pathlib import Path

from django.conf import settings

from .generator import render_document


def _publish_to_gcs(project_id, html):
    import json
    from google.cloud import storage
    from google.oauth2 import service_account

    bucket_name = os.getenv("GCS_BUCKET_NAME")
    blob_path = f"sites/{project_id}/index.html"

    creds_json = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    if creds_json:
        info = json.loads(creds_json)
        credentials = service_account.Credentials.from_service_account_info(info)
        client = storage.Client(credentials=credentials)
    else:
        client = storage.Client()

    bucket = client.bucket(bucket_name)
    blob = bucket.blob(blob_path)
    blob.upload_from_string(html, content_type="text/html")
    blob.make_public()

    return blob_path, blob.public_url


def _publish_to_local(project_id, html):
    output_dir = Path(settings.MEDIA_ROOT) / "sites" / str(project_id)
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / "index.html"
    output_file.write_text(html, encoding="utf-8")

    relative_path = (Path("sites") / str(project_id) / "index.html").as_posix()
    public_url = f"{settings.MEDIA_URL}{relative_path}"
    return relative_path, public_url


def publish_project(project):
    html = render_document(project.layout or {"type": "container", "children": []})

    use_gcs = bool(os.getenv("GCS_BUCKET_NAME"))

    if use_gcs:
        published_path, public_url = _publish_to_gcs(project.id, html)
    else:
        published_path, public_url = _publish_to_local(project.id, html)

    project.is_published = True
    project.published_path = public_url
    project.save(update_fields=["is_published", "published_path", "updated_at"])

    return {
        "message": "Project published successfully.",
        "published_path": published_path,
        "public_url": public_url,
    }