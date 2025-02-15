from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserDetailView
router = DefaultRouter()
# router.register(r'users', UserViewSet, basename='users')  # إدارة المستخدمينUserViewSet
router.register(r'users', UserDetailView, basename='user')  # تحديد basename UserDetailView


urlpatterns = [
    # Authentication endpoints
    path("", include(router.urls)),  # User management
    path("auth/", include("dj_rest_auth.urls")),  # Login, logout, etc.
    path("auth/registration/", include("dj_rest_auth.registration.urls")),  # User registration
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),  # Token refresh

    # JWT token obtain (login)
    path('auth/logins/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]

