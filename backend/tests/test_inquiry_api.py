import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")

def test_health():
    response = requests.get(f"{BASE_URL}/api/")
    assert response.status_code == 200
    assert response.json()["message"] == "Ascenxion systems online"

def test_inquiry_create(): 
    payload = {"name":"TEST_Review User","email":"review@example.com","company":"TEST Agency","project":"Build an AI workflow"}
    response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert isinstance(data["id"], str)

def test_inquiry_validation(): 
    response = requests.post(f"{BASE_URL}/api/inquiries", json={"name":"Only name"})
    assert response.status_code == 422
