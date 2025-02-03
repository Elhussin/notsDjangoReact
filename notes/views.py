# views.py
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *
from .serializers import *
from .utils import set_auth_cookies
import logging

logger = logging.getLogger(__name__)

def index(request):
    return render(request, 'index.html')

class BaseViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def get_default_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class DynamicModelViewSet(BaseViewSet):
    model = None
    serializer_class = None

    def get_queryset(self):
        if self.model is None:
            raise NotImplementedError("You must define a 'model' attribute in your ViewSet.")
        return self.model.objects.all()

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            response = Response({"message": "Login successful"})
            return set_auth_cookies(response, access, refresh)
        else:
            logger.warning("Invalid login attempt for username: %s", username)
            return Response({"error": "Invalid credentials"}, status=401)

class UserDetailView(BaseViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        # استرجاع المستخدم الحالي فقط
        return User.objects.filter(id=self.request.user.id).only('id', 'username', 'email', 'is_superuser', 'last_name', 'first_name', 'is_staff', 'is_active')

    def retrieve(self, request, pk=None):
        user = request.user  # استرجاع المستخدم الحالي من التوكن
        serializer = self.serializer_class(user)
        return Response(serializer.data)
    

class UserViewSet(DynamicModelViewSet):
    model = User
    serializer_class = UserSerializer

    def get_permissions(self):
        return super().get_default_permissions()

class BranchViewSet(DynamicModelViewSet):
    model = Branch
    serializer_class = BranchSerializer

    def get_permissions(self):
        return super().get_default_permissions()

class BranchManagerViewSet(DynamicModelViewSet):
    model = BranchManager
    serializer_class = BranchManagerSerializer

class OrderViewSet(DynamicModelViewSet):
    model = Order
    serializer_class = OrderSerializer

class CompanyViewSet(DynamicModelViewSet):
    model = Company
    serializer_class = CompanySerializer

class FactoryViewSet(DynamicModelViewSet):
    model = Factory
    serializer_class = FactorySerializer

class BrandViewSet(DynamicModelViewSet):
    model = Brand
    serializer_class = BrandSerializer

class ProductViewSet(DynamicModelViewSet):
    model = Product
    serializer_class = ProductSerializer

class CategoryViewSet(DynamicModelViewSet):
    model = Category
    serializer_class = CategorySerializer

class TechnicalSpecificationViewSet(DynamicModelViewSet):
    model = TechnicalSpecification
    serializer_class = TechnicalSpecificationSerializer

class AdditionalDetailViewSet(DynamicModelViewSet):
    model = AdditionalDetail
    serializer_class = AdditionalDetailSerializer

class RatingViewSet(DynamicModelViewSet):
    model = Rating
    serializer_class = RatingSerializer

class ReviewViewSet(DynamicModelViewSet):
    model = Review
    serializer_class = ReviewSerializer