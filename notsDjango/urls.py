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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('notes.urls')),
    path('api/accounting/', include('accounting.urls')),
    path('api/crm/', include('crm.urls')),  
    path('api/hrm/', include('hrm.urls')),  
    path('api/waseel/', include('waseel.urls')),  # إضافة مسارات التطبيق الجديد
    
    path('product/', include('product.urls')),

    path('', lambda request: render(request, 'index.html')),
    path('<path:path>', lambda request, path: render(request, 'index.html')),
# المسار الافتراضي
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
