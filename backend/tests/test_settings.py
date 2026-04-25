"""Settings API tests - public GET, admin PUT (Iteration 4)"""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://clinic-gallery-admin.preview.emergentagent.com").rstrip("/")
ADMIN_USER = "admin"
ADMIN_PASS = "Admin@2026"


@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(f"{BASE_URL}/api/auth/login", json={"username": ADMIN_USER, "password": ADMIN_PASS}, timeout=15)
    assert r.status_code == 200, f"login failed {r.status_code} {r.text}"
    return r.json()["token"]


def test_settings_get_public_ok():
    r = requests.get(f"{BASE_URL}/api/settings", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert "marqueeEnabled" in data
    assert "marqueeText" in data
    assert isinstance(data["marqueeEnabled"], bool)
    assert isinstance(data["marqueeText"], str)


def test_settings_put_requires_auth():
    r = requests.put(f"{BASE_URL}/api/settings", json={"marqueeEnabled": False}, timeout=15)
    assert r.status_code == 401


def test_settings_put_updates_persists(admin_token):
    headers = {"Authorization": f"Bearer {admin_token}"}
    new_text = "TEST_marquee_iteration4_xyz"

    # Toggle off + change text
    r = requests.put(
        f"{BASE_URL}/api/settings",
        json={"marqueeEnabled": False, "marqueeText": new_text},
        headers=headers,
        timeout=15,
    )
    assert r.status_code == 200
    body = r.json()
    assert body["marqueeEnabled"] is False
    assert body["marqueeText"] == new_text

    # Verify persistence
    r2 = requests.get(f"{BASE_URL}/api/settings", timeout=15)
    assert r2.status_code == 200
    d = r2.json()
    assert d["marqueeEnabled"] is False
    assert d["marqueeText"] == new_text


def test_settings_put_restore_default(admin_token):
    """Cleanup: restore enabled marquee with the original Bengali text per request."""
    headers = {"Authorization": f"Bearer {admin_token}"}
    original_text = "বানানী ক্লিনিকে নতুন রোগীদের জন্য বিশেষ ছাড় চলছে — আজই অ্যাপয়েন্টমেন্ট নিন"
    r = requests.put(
        f"{BASE_URL}/api/settings",
        json={"marqueeEnabled": True, "marqueeText": original_text},
        headers=headers,
        timeout=15,
    )
    assert r.status_code == 200
    body = r.json()
    assert body["marqueeEnabled"] is True
    assert body["marqueeText"] == original_text


def test_owner_image_accessible():
    r = requests.get(f"{BASE_URL}/brand/owner.jpg", timeout=15)
    assert r.status_code == 200
    assert int(r.headers.get("content-length", "0")) > 1000
