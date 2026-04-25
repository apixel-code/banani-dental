"""Banani Dental Clinic - Backend API tests (pytest).

Covers: health, auth, doctors, gallery, appointments and admin guards.
Uses real Cloudinary credentials to verify image uploads end-to-end.
"""
import io
import os
import pytest
import requests
from PIL import Image

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://clinic-gallery-admin.preview.emergentagent.com").rstrip("/")
ADMIN_USER = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASS = os.environ.get("ADMIN_PASSWORD", "Admin@2026")


def _png_bytes(color=(200, 100, 50)):
    img = Image.new("RGB", (64, 64), color=color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return buf


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    return s


@pytest.fixture(scope="session")
def admin_token(session):
    r = session.post(f"{BASE_URL}/api/auth/login", json={"username": ADMIN_USER, "password": ADMIN_PASS}, timeout=20)
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 20
    assert data.get("user", {}).get("username") == ADMIN_USER
    return data["token"]


@pytest.fixture
def admin_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


# --- Health ---
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{BASE_URL}/api/", timeout=15)
        assert r.status_code == 200
        body = r.json()
        assert body.get("status") == "ok"


# --- Auth ---
class TestAuth:
    def test_login_wrong_password(self, session):
        r = session.post(f"{BASE_URL}/api/auth/login", json={"username": ADMIN_USER, "password": "wrong-pass"}, timeout=15)
        assert r.status_code == 401

    def test_login_missing_fields(self, session):
        r = session.post(f"{BASE_URL}/api/auth/login", json={"username": ADMIN_USER}, timeout=15)
        assert r.status_code == 400

    def test_me_with_token(self, session, admin_headers):
        r = session.get(f"{BASE_URL}/api/auth/me", headers=admin_headers, timeout=15)
        assert r.status_code == 200
        assert r.json()["user"]["username"] == ADMIN_USER

    def test_me_without_token(self, session):
        r = session.get(f"{BASE_URL}/api/auth/me", timeout=15)
        assert r.status_code == 401

    def test_me_with_invalid_token(self, session):
        r = session.get(f"{BASE_URL}/api/auth/me", headers={"Authorization": "Bearer not-a-real-token"}, timeout=15)
        assert r.status_code == 401


# --- Public reads ---
class TestPublicReads:
    def test_doctors_list_public(self, session):
        r = session.get(f"{BASE_URL}/api/doctors", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 1
        # ensure no _id leak, id present
        assert "_id" not in items[0]
        assert "id" in items[0]

    def test_gallery_list_public(self, session):
        r = session.get(f"{BASE_URL}/api/gallery", timeout=15)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_gallery_filter_category(self, session):
        r = session.get(f"{BASE_URL}/api/gallery", params={"category": "clinic"}, timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert all(it["category"] == "clinic" for it in items)

    def test_gallery_invalid_category_ignored(self, session):
        # Backend ignores invalid category and returns all
        r = session.get(f"{BASE_URL}/api/gallery", params={"category": "bogus"}, timeout=15)
        assert r.status_code == 200


# --- Admin guards ---
class TestAdminGuards:
    def test_create_doctor_no_token(self, session):
        r = session.post(f"{BASE_URL}/api/doctors", data={"name": "x", "specialization": "y"}, timeout=15)
        assert r.status_code == 401

    def test_appointments_list_no_token(self, session):
        r = session.get(f"{BASE_URL}/api/appointments", timeout=15)
        assert r.status_code == 401

    def test_gallery_post_no_token(self, session):
        r = session.post(f"{BASE_URL}/api/gallery", data={"category": "clinic"}, timeout=15)
        assert r.status_code == 401


# --- Doctors CRUD ---
class TestDoctorsCRUD:
    created_id = None
    photo_url = None

    def test_01_create_requires_photo(self, session, admin_headers):
        r = session.post(
            f"{BASE_URL}/api/doctors",
            headers=admin_headers,
            data={"name": "TEST_NoPhoto", "specialization": "x"},
            timeout=20,
        )
        assert r.status_code == 400

    def test_02_create_doctor_with_photo(self, session, admin_headers):
        files = {"photo": ("test.png", _png_bytes((10, 200, 200)), "image/png")}
        data = {
            "name": "TEST_ডা. টেস্ট",
            "nameEn": "TEST_Dr. Test",
            "specialization": "TEST Spec",
            "bio": "TEST bio",
            "experience": "5+ yrs",
            "degrees": "BDS",
            "order": "9",
        }
        r = session.post(
            f"{BASE_URL}/api/doctors", headers=admin_headers, files=files, data=data, timeout=60
        )
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["name"] == data["name"]
        assert body["specialization"] == "TEST Spec"
        assert body["photoUrl"].startswith("http")
        assert "cloudinary" in body["photoUrl"]
        assert "id" in body
        TestDoctorsCRUD.created_id = body["id"]
        TestDoctorsCRUD.photo_url = body["photoUrl"]

    def test_03_update_doctor(self, session, admin_headers):
        assert TestDoctorsCRUD.created_id
        r = session.put(
            f"{BASE_URL}/api/doctors/{TestDoctorsCRUD.created_id}",
            headers=admin_headers,
            data={"bio": "TEST bio updated"},
            timeout=30,
        )
        assert r.status_code == 200
        assert r.json()["bio"] == "TEST bio updated"

    def test_04_get_one_doctor(self, session):
        r = session.get(f"{BASE_URL}/api/doctors/{TestDoctorsCRUD.created_id}", timeout=15)
        assert r.status_code == 200
        assert r.json()["bio"] == "TEST bio updated"

    def test_05_delete_doctor(self, session, admin_headers):
        r = session.delete(
            f"{BASE_URL}/api/doctors/{TestDoctorsCRUD.created_id}", headers=admin_headers, timeout=30
        )
        assert r.status_code == 200
        # verify gone
        r2 = session.get(f"{BASE_URL}/api/doctors/{TestDoctorsCRUD.created_id}", timeout=15)
        assert r2.status_code == 404


# --- Gallery CRUD ---
class TestGalleryCRUD:
    single_id = None
    ba_id = None

    def test_01_create_single_image(self, session, admin_headers):
        files = {"image": ("g.png", _png_bytes((50, 50, 200)), "image/png")}
        data = {"category": "clinic", "title": "TEST clinic", "caption": "TEST cap"}
        r = session.post(
            f"{BASE_URL}/api/gallery", headers=admin_headers, files=files, data=data, timeout=60
        )
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["category"] == "clinic"
        assert "cloudinary" in body["imageUrl"]
        TestGalleryCRUD.single_id = body["id"]

    def test_02_invalid_category(self, session, admin_headers):
        files = {"image": ("g.png", _png_bytes(), "image/png")}
        r = session.post(
            f"{BASE_URL}/api/gallery",
            headers=admin_headers,
            files=files,
            data={"category": "bogus"},
            timeout=30,
        )
        assert r.status_code == 400

    def test_03_before_after_requires_both(self, session, admin_headers):
        # Only "before" provided -> 400
        files = {"before": ("b.png", _png_bytes((255, 0, 0)), "image/png")}
        r = session.post(
            f"{BASE_URL}/api/gallery",
            headers=admin_headers,
            files=files,
            data={"category": "before-after"},
            timeout=60,
        )
        assert r.status_code == 400

    def test_04_before_after_create(self, session, admin_headers):
        files = [
            ("before", ("b.png", _png_bytes((255, 0, 0)), "image/png")),
            ("after", ("a.png", _png_bytes((0, 255, 0)), "image/png")),
        ]
        r = session.post(
            f"{BASE_URL}/api/gallery",
            headers=admin_headers,
            files=files,
            data={"category": "before-after", "title": "TEST B/A"},
            timeout=90,
        )
        assert r.status_code == 201, r.text
        body = r.json()
        assert "cloudinary" in body["beforeUrl"]
        assert "cloudinary" in body["afterUrl"]
        TestGalleryCRUD.ba_id = body["id"]

    def test_05_filter_returns_created(self, session):
        r = session.get(f"{BASE_URL}/api/gallery", params={"category": "clinic"}, timeout=15)
        assert r.status_code == 200
        ids = [it["id"] for it in r.json()]
        assert TestGalleryCRUD.single_id in ids

    def test_06_delete_items(self, session, admin_headers):
        for gid in [TestGalleryCRUD.single_id, TestGalleryCRUD.ba_id]:
            if gid:
                r = session.delete(
                    f"{BASE_URL}/api/gallery/{gid}", headers=admin_headers, timeout=30
                )
                assert r.status_code == 200


# --- Appointments ---
class TestAppointments:
    appt_id = None

    def test_01_create_public(self, session):
        r = session.post(
            f"{BASE_URL}/api/appointments",
            json={
                "name": "TEST_রহিম",
                "phone": "+8801711000000",
                "email": "test@example.com",
                "service": "Cleaning",
                "message": "TEST",
            },
            timeout=20,
        )
        assert r.status_code == 201
        body = r.json()
        assert "id" in body and body["status"] == "new"
        TestAppointments.appt_id = body["id"]

    def test_02_create_validation(self, session):
        r = session.post(f"{BASE_URL}/api/appointments", json={"name": "noPhone"}, timeout=15)
        assert r.status_code == 400

    def test_03_list_admin(self, session, admin_headers):
        r = session.get(f"{BASE_URL}/api/appointments", headers=admin_headers, timeout=20)
        assert r.status_code == 200
        items = r.json()
        ids = [it["id"] for it in items]
        assert TestAppointments.appt_id in ids

    def test_04_status_update(self, session, admin_headers):
        r = session.patch(
            f"{BASE_URL}/api/appointments/{TestAppointments.appt_id}",
            headers=admin_headers,
            json={"status": "contacted"},
            timeout=15,
        )
        assert r.status_code == 200
        assert r.json()["status"] == "contacted"

    def test_05_invalid_status(self, session, admin_headers):
        r = session.patch(
            f"{BASE_URL}/api/appointments/{TestAppointments.appt_id}",
            headers=admin_headers,
            json={"status": "BOGUS"},
            timeout=15,
        )
        assert r.status_code == 400

    def test_06_delete(self, session, admin_headers):
        r = session.delete(
            f"{BASE_URL}/api/appointments/{TestAppointments.appt_id}",
            headers=admin_headers,
            timeout=15,
        )
        assert r.status_code == 200
