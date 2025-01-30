from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.exceptions import InvalidToken
from .models import Branch, BranchManager, Order, Company, Factory, Product, Category, Brand, ProductImage, Discount, Review,TechnicalSpecification
from .serializers import (UserSerializer, BranchSerializer, BranchManagerSerializer, OrderSerializer, 
 TechnicalSpecificationSerializer,
    CompanySerializer,FactorySerializer, ProductSerializer, CategorySerializer, BrandSerializer,
    ProductImageSerializer, DiscountSerializer, ReviewSerializer)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


def set_auth_cookies(response, access_token, refresh_token):
    response.set_cookie(
        key="access_token",
        value=str(access_token),
        httponly=True,
        secure=False,  # في الإنتاج: ضعها إلى True مع HTTPS
        samesite="Lax",
    )
    response.set_cookie(
        key="refresh_token",
        value=str(refresh_token),
        httponly=True,
        secure=False,  # في الإنتاج: ضعها إلى True مع HTTPS
        samesite="Lax",
    )
    return response


# عرض الصفحة الرئيسية
def index(request):
    return render(request, 'index.html')
from django.shortcuts import render


# تسجيل الدخول باستخدام الكوكيز
class LoginView(APIView):
    permission_classes = [AllowAny]  # السماح لأي مستخدم باستخدام هذه الواجهة

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
            return Response({"error": "Invalid credentials"}, status=401)


# تجديد التوكن باستخدام refresh_token
class RefreshTokenView(APIView):
    permission_classes = [AllowAny]  # السماح لأي مستخدم باستخدام هذه الواجهة

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token not found"}, status=401)
        
        try:
            new_token = RefreshToken(refresh_token)
            response = Response({"message": "Token refreshed"})
            response.set_cookie(
                key="access_token",
                value=str(new_token.access_token),
                httponly=True,
                secure=True,
                samesite='Lax',
            )
            return response
        except InvalidToken as e:
            print("Invalid Token:", e)
            return Response({"error": "Invalid token"}, status=401)

# التحقق من الجلسة
class UserSessionCheckView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        return Response({
            "is_authenticated": True,
            "user": {
                "username": user.username,
                "email": user.email,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
            }
        })


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]  # تأكد أن المستخدم مسجل الدخول

    def get(self, request):
        user = request.user  # استرجاع المستخدم الحالي من التوكن
        serializer = UserSerializer(user)
        return Response(serializer.data)  # إرجاع بيانات المستخدم


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing users. Allows registration without authentication (AllowAny) 
    while protecting other actions with authentication.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  # Default permissions

    def get_permissions(self): 
        """
        Override permissions based on the action.
        """
        if self.action == 'create':  # Allow registration without authentication
            return [AllowAny()]
        return super().get_permissions()
        # return [IsAuthenticated()]



# ViewSet للفروع
class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [permissions.IsAuthenticated()]


# ViewSet لمديري الفروع
class BranchManagerViewSet(viewsets.ModelViewSet):
    queryset = BranchManager.objects.all()
    serializer_class = BranchManagerSerializer
    authentication_classes = [JWTAuthentication]


# ViewSet للطلبات
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = [JWTAuthentication]

# curl -X POST http://localhost:8000/api/branches/ \
# -H "Content-Type: application/json" \
# -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyNzEzMDc4LCJpYXQiOjE3MzI2NTMwNzgsImp0aSI6IjdhNTk2MmRmNzQ3MjQwYmM4NmY4NDE5M2JkMjQ3MWJiIiwidXNlcl9pZCI6NH0.vyJC9zGfIglWv0VJA4g2bZcF6JZZ2ErP7984Oey5LPM" \
# -d '{"name": "Branch 1", "location": "City 1" ,"phone":"2222"}'
class CompanyViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the Company model.
    Provides CRUD operations for the API endpoints.
    """
    queryset = Company.objects.all()  # Fetch all Company records
    serializer_class = CompanySerializer  # Use the serializer defined above

    # Optional: Filtering or ordering if needed
    def get_queryset(self):
        """
        Optionally filter the queryset by query parameters.
        For example, filter by company type.
        """
        queryset = super().get_queryset()
        company_type = self.request.query_params.get('company_type')
        if company_type:
            queryset = queryset.filter(company_type=company_type)
        return queryset

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # إضافة بيانات المستخدم إلى التوكن
        token['username'] = user.username
        token['email'] = user.email
        token['staff'] = user.is_staff
        token['id'] = user.id
        token['superuser'] = user.is_superuser

        return token
    


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    


class FactoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for the Factory model.
    """
    queryset = Factory.objects.all()  # Get all factories
    serializer_class = FactorySerializer  # Use the FactorySerializer

    # Optional: Add custom filtering, ordering, or permissions
    def get_queryset(self):
        """
        Optionally filter factories based on query parameters.
        """
        queryset = super().get_queryset()
        is_active = self.request.query_params.get('is_active')  # Filter by active status
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() in ['true', '1'])
        return queryset

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    filterset_fields = ['is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().prefetch_related('images', 'discounts')
    serializer_class = ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TechnicalSpecificationViewSet(viewsets.ModelViewSet):
    queryset = TechnicalSpecification.objects.all()
    serializer_class = TechnicalSpecificationSerializer




from rest_framework import viewsets
from .models import Product, AdditionalDetail, Rating, Review
from .serializers import ProductSerializer, AdditionalDetailSerializer, RatingSerializer, ReviewSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class AdditionalDetailViewSet(viewsets.ModelViewSet):
    queryset = AdditionalDetail.objects.all()
    serializer_class = AdditionalDetailSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer









# from django.db import models
# from django.apps import apps

# def create_model(name, fields=None, app_label='', module='', options=None, admin_opts=None):
#     """
#     Dynamically creates a Django model.

#     Parameters:
#     - name (str): Name of the model.
#     - fields (dict): A dictionary where keys are field names and values are Django field instances.
#     - app_label (str): The app where the model belongs (optional for standalone usage).
#     - module (str): Module name (usually `__name__`).
#     - options (dict): Additional model options, such as verbose_name (optional).
#     - admin_opts (dict): Admin configuration options (optional).

#     Returns:
#     - A Django model class.
#     """
#     # Default values for fields
#     fields = fields or {}
#     options = options or {}

#     # Add a default primary key field
#     fields['__module__'] = module
#     if 'id' not in fields:
#         fields['id'] = models.AutoField(primary_key=True)

#     # Define Meta options
#     if options:
#         class Meta:
#             pass
#         for key, value in options.items():
#             setattr(Meta, key, value)
#         fields['Meta'] = Meta

#     # Create the model class
#     model = type(name, (models.Model,), fields)

#     # Add to the app registry
#     if app_label:
#         model._meta.app_label = app_label
#         apps.register_model(app_label, model)

#     # Register model in admin if admin_opts is provided
#     if admin_opts:
#         from django.contrib import admin
#         class ModelAdmin(admin.ModelAdmin):
#             pass
#         for key, value in admin_opts.items():
#             setattr(ModelAdmin, key, value)
#         admin.site.register(model, ModelAdmin)

#     return model



# # Example usage
# new_model = create_model(
#     name="DynamicModel",
#     fields={
#         "name": models.CharField(max_length=255),
#         "created_at": models.DateTimeField(auto_now_add=True),
#         "is_active": models.BooleanField(default=True),
#     },
#     app_label="myapp",  # Replace 'myapp' with your app name
#     module=__name__,
#     options={
#         "verbose_name": "Dynamic Model",
#         "verbose_name_plural": "Dynamic Models",
#     },
#     admin_opts={
#         "list_display": ("name", "created_at", "is_active"),
#         "search_fields": ("name",),
#     }
# )

# from django.db import models
# from django.http import JsonResponse
# from django.core.management import call_command

# def create_dynamic_model(request):
#     if request.method == "POST":
#         data = request.json  # الحصول على بيانات الموديل من الطلب
#         model_name = data["model_name"]
#         fields = data["fields"]

#         # إنشاء الحقول
#         attributes = {}
#         for field in fields:
#             field_type = getattr(models, field["type"])
#             attributes[field["name"]] = field_type(**{k: v for k, v in field.items() if k != "name" and k != "type"})
        
#         # إنشاء الموديل الديناميكي
#         new_model = type(model_name, (models.Model,), attributes)
        
#         # تسجيل الموديل الجديد
#         new_model._meta.app_label = 'my_app'  # استبدل بـ اسم تطبيقك
#         models.ModelBase.__new__(models.ModelBase, model_name, (models.Model,), attributes)

#         # إجراء الهجرات لتحديث قاعدة البيانات
#         call_command("makemigrations", "my_app")
#         call_command("migrate", "my_app")

#         return JsonResponse({"message": f"Model '{model_name}' created successfully!"})

# from rest_framework.viewsets import ModelViewSet
# from rest_framework import serializers

# def dynamic_viewset(model):
#     class DynamicSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = model
#             fields = "__all__"

#     class DynamicViewSet(ModelViewSet):
#         queryset = model.objects.all()
#         serializer_class = DynamicSerializer

#     return DynamicViewSet
