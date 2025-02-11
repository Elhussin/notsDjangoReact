import pytest
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_login():
    client = APIClient()
    response = client.post("/api/auth/login/", {"username": "me", "password": "1"}, format="json")
    assert response.status_code == 200


# @pytest.mark.django_db
