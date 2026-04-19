# No-Code Builder Backend

Minimal Django + DRF backend for no-code website builder MVP.

Default database configuration is MySQL.

## Features

- JWT auth: register, login, refresh
- Project CRUD scoped to authenticated owner
- Layout read/update endpoints
- JSON layout validation
- Publish endpoint generating static HTML under media

## Quick Start

1. Create virtual environment and install dependencies.
2. Create a MySQL database named `no_code_builder`.
3. Copy `.env.example` values to your environment and update credentials if needed.
4. Run migrations.
5. Start server.

Example commands:

```bash
pip install -r requirements.txt
python manage.py makemigrations users projects
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## API Routes

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/refresh/`
- `GET|POST /api/projects/`
- `GET|PUT|DELETE /api/projects/{id}/`
- `GET|PUT /api/projects/{id}/layout/`
- `POST /api/projects/{id}/publish/`
