from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    index,
    UserViewSet,
    BranchViewSet,
    BranchManagerViewSet,
    OrderViewSet,
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
router.register(r'additional-details', AdditionalDetailViewSet,basename='additional-details')
router.register(r'ratings', RatingViewSet , basename='ratings')
router.register(r'reviews', ReviewViewSet , basename='reviews')
router.register(r'user', UserDetailView, basename='user')  # تحديد basename

urlpatterns = [
    path('', include(router.urls)),  # تسجيل المسارات الخاصة بـ ViewSets في الراوتر

]
