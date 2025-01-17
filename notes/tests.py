from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken
from .models import Branch

class BranchViewSetTest(APITestCase):

    def setUp(self):
        # إنشاء مستخدم وتوليد توكن
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.token = str(AccessToken.for_user(self.user))
        self.headers = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}

        # إنشاء بيانات فرع للاختبار
        self.branch_data = {"name": "Branch 1", "location": "City 1","phone":"12345"}

    def test_list_branches_without_authentication(self):
        # الوصول إلى قائمة الفروع بدون توثيق
        response = self.client.get('/api/branches/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_branch_without_authentication(self):
        # محاولة إنشاء فرع بدون توثيق
        response = self.client.post('/api/branches/', self.branch_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_branch_with_authentication(self):
        # محاولة إنشاء فرع مع توثيق
        response = self.client.post('/api/branches/', self.branch_data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_branch_without_authentication(self):
        # إنشاء فرع ثم محاولة عرضه بدون توثيق
        branch = Branch.objects.create(name="Branch 1", location="City 1")
        response = self.client.get(f'/api/branches/{branch.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_branch_without_authentication(self):
        # إنشاء فرع ثم محاولة تعديله بدون توثيق
        branch = Branch.objects.create(name="Branch 1", location="City 1")
        update_data = {"name": "Updated Branch", "location": "New City"}
        response = self.client.put(f'/api/branches/{branch.id}/', update_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_branch_with_authentication(self):
        # تعديل فرع باستخدام توثيق
        branch = Branch.objects.create(name="Branch 1", location="City 1")
        update_data = {"name": "Updated Branch", "location": "New City"}
        response = self.client.put(f'/api/branches/{branch.id}/', update_data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
