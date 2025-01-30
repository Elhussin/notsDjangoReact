from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.shortcuts import render

from .views import (
    index,
    LoginView,
    RefreshTokenView,
    UserSessionCheckView,
    UserViewSet,
    BranchViewSet,
    BranchManagerViewSet,
    OrderViewSet,CustomTokenObtainPairView,
    CompanyViewSet,
    FactoryViewSet,
    ProductViewSet, CategoryViewSet, BrandViewSet,
    TechnicalSpecificationViewSet,
    ProductViewSet, AdditionalDetailViewSet, RatingViewSet, ReviewViewSet,UserDetailView
)


# إنشاء الراوتر لتسجيل الـ ViewSets
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')  # إدارة المستخدمين
router.register(r'branches', BranchViewSet, basename='branches')  # إدارة الفروع
router.register(r'branch_managers', BranchManagerViewSet, basename='branch-managers')  # إدارة مديري الفروع
router.register(r'orders', OrderViewSet, basename='orders')  # إدارة الطلبات
router.register(r'companies',CompanyViewSet , basename='company')
router.register(r'factories', FactoryViewSet, basename='factory')
router.register(r'brands', BrandViewSet, basename='brands')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'technical-specifications', TechnicalSpecificationViewSet, basename="TechnicalSpecificationViewSet")
router.register(r'additional-details', AdditionalDetailViewSet)
router.register(r'ratings', RatingViewSet)
router.register(r'reviews', ReviewViewSet)


urlpatterns = [
    # المسارات الخاصة بالـ API أولًا
    path('api/', include(router.urls)),  # تسجيل المسارات الخاصة بـ ViewSets في الراوتر
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/', UserDetailView.as_view(), name='user_detail'),

    # إعادة توجيه كل المسارات الأخرى إلى صفحة React
    path('', lambda request: render(request, 'index.html')),
    path('<path:path>', lambda request, path: render(request, 'index.html')),
]
