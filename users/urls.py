from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView
urlpatterns = [
    path("auth/", include("dj_rest_auth.urls")),  # تسجيل الدخول والخروج
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),  # تسجيل مستخدم جديد
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),  # تجديد التوكن
]

from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('users/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
