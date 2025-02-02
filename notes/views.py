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
from .models import Branch, BranchManager, Order, Company, Factory, Product, Category, Brand, AdditionalDetail, Rating, Review, ProductImage, Discount, Review,TechnicalSpecification
from .serializers import (UserSerializer, BranchSerializer, BranchManagerSerializer, OrderSerializer, 
 TechnicalSpecificationSerializer,
    CompanySerializer,FactorySerializer, ProductSerializer, CategorySerializer, BrandSerializer,
    ProductImageSerializer, DiscountSerializer, ReviewSerializer)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import ProductSerializer, AdditionalDetailSerializer, RatingSerializer, ReviewSerializer


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

class UserDetailView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]  # تأكد أن المستخدم مسجل الدخول

    def retrieve(self, request, pk=None):
        user = request.user  # استرجاع المستخدم الحالي من التوكن
        serializer = UserSerializer(user)
        print(serializer.data)
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

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [permissions.IsAuthenticated()]

class BranchManagerViewSet(viewsets.ModelViewSet):
    queryset = BranchManager.objects.all()
    serializer_class = BranchManagerSerializer
    authentication_classes = [JWTAuthentication]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = [JWTAuthentication]

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

# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer

class AdditionalDetailViewSet(viewsets.ModelViewSet):
    queryset = AdditionalDetail.objects.all()
    serializer_class = AdditionalDetailSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
