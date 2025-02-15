from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.shortcuts import render
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('notes.urls')),
    path('api/accounting/', include('accounting.urls')),
    path('api/crm/', include('crm.urls')),  
    path('api/hrm/', include('hrm.urls')),  
    path('api/waseel/', include('waseel.urls')), 
    path("api/users/", include("users.urls")), 
    path('product/', include('product.urls')),


    # واجهة Swagger UI
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    
       # وثائق خاصة بتطبيق معين
  # وثائق خاصة بتطبيق معين
    # path('api/crm/schema/', SpectacularAPIView.as_view(api_version='crm'), name='crm-schema'),
    # path('api/crm/docs/', SpectacularSwaggerView.as_view(url_name='crm-schema'), name='crm-swagger-ui'),
    path('', lambda request: render(request, 'index.html')),
    path('<path:path>', lambda request, path: render(request, 'index.html')),
        # تنزيل ملف OpenAPI JSON

# المسار الافتراضي
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


