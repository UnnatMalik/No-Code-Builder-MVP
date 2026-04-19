# 🚀 No-Code Builder Backend

A minimal **Django + Django REST Framework (DRF)** backend powering a no-code website builder MVP.  
This service handles authentication, project management, JSON-based layout storage, and static site generation.

---

## ⚙️ Tech Stack

- **Backend:** Django, Django REST Framework  
- **Database:** MySQL (with `JSONField` for layout storage)  
- **Auth:** JWT (SimpleJWT)  

---

## ✨ Features

- 🔐 JWT Authentication (Register, Login, Token Refresh)  
- 📁 Project CRUD (user-scoped access control)  
- 🧩 JSON-based layout storage (`JSONField`)  
- 🛠 Layout read/update endpoints  
- ✅ Basic layout validation  
- 🚀 Publish endpoint (JSON → static HTML generation)  
- 🌐 Generated sites served via `/media/sites/`  

---

## 🧠 Architecture Overview

- **Frontend (React)** handles drag-and-drop UI and live rendering  
- **Backend (Django)** manages:
  - Persistence (MySQL)
  - Validation
  - Static site generation  

👉 The layout JSON acts as the **single source of truth**.

---

## 📦 Project Structure

backend/
├── apps/
│   ├── users/        # Authentication
│   ├── projects/     # Project + layout storage
│   ├── publishing/   # HTML generation logic
├── config/           # Django settings
├── manage.py

---

## 🚀 Quick Start

### 1. Setup Environment

```bash
python -m venv venv
source venv/bin/activate   # (Linux/Mac)
venv\Scripts\activate      # (Windows)
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Database

Create a MySQL database:

```sql
CREATE DATABASE no_code_builder;
```

Update your `.env` or `settings.py` with DB credentials.

---

### 4. Run Migrations

```bash
python manage.py makemigrations users projects
python manage.py migrate
```

---

### 5. Create Superuser

```bash
python manage.py createsuperuser
```

---

### 6. Start Server

```bash
python manage.py runserver
```

---

## 🔌 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/refresh/`

### 📁 Projects
- `GET /api/projects/`
- `POST /api/projects/`
- `GET /api/projects/{id}/`
- `PUT /api/projects/{id}/`
- `DELETE /api/projects/{id}/`

### 🧩 Layout
- `GET /api/projects/{id}/layout/`
- `PUT /api/projects/{id}/layout/`

### 🚀 Publishing
- `POST /api/projects/{id}/publish/`

---

## 🛠 Publish Flow

1. Fetch layout JSON from database  
2. Convert JSON → HTML using render engine  
3. Save generated file to:

/media/sites/{project_id}/index.html

4. Return public URL  

---

## 📄 Example Layout JSON

```json
{
  "type": "container",
  "children": [
    {
      "type": "text",
      "content": "Hello World",
      "styles": {
        "fontSize": "20px",
        "color": "black"
      }
    }
  ]
}
```

---

## 🔒 Security Notes

- All endpoints require authentication (except register/login)
- Users can only access their own projects
- Basic validation on layout JSON to prevent malformed structures

---

## 📈 Future Improvements

- Async publishing (Celery + Redis)  
- S3-based storage for generated sites  
- Versioning & rollback  
- Multi-page support  
- Template system  
- AI-based layout generation  

---

## 🧪 Development Notes

- Designed as **MVP backend**, not production-scale yet  
- Focused on simplicity and fast iteration  
- JSON → HTML renderer is modular and extendable  

---

## 🏁 Goal

Drag & Drop UI → JSON → Backend → Static Website
