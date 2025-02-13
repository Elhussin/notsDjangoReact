from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    # Authentication endpoints
    path("auth/", include("dj_rest_auth.urls")),  # Login, logout, etc.
    path("auth/registration/", include("dj_rest_auth.registration.urls")),  # User registration
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),  # Token refresh

    # JWT token obtain (login)
    path('/auth/logins/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]