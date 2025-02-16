
# تطبيق users/tests.py
from django.test import TestCase
from django.urls import reverse


class UserAPITests(TestCase):
    def test_register(self):
        url = reverse('users:register')
        response = self.client.post(url, data={'username': 'test', 'password': '123'})
        self.assertEqual(response.status_code, 200)