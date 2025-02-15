from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from notes.views import handler404, handler500, handler403, handler400
# المسارات الخاصة بـ API

from django.contrib.sitemaps.views import sitemap
from .sitemaps import ArticleSitemap

sitemaps = {
    'articles': ArticleSitemap,
}

api_patterns = [
    path('', include('notes.urls')),
    path('accounting/', include('accounting.urls')),
    path('crm/', include('crm.urls')),
    path('hrm/', include('hrm.urls')),
    path('waseel/', include('waseel.urls')),
    path('users/', include('users.urls')),
    path('product/', include('product.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

# المسارات العامة
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_patterns)),
    

    # واجهة Swagger UI


    # المسار الافتراضي
    path('', lambda request: render(request, 'index.html')),
    path('<path:path>', lambda request, path: render(request, 'index.html')),
]

# إضافة مسارات الوسائط (Media) في حالة التطوير
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
    
# تحديد معالجات الأخطاء
handler404 = handler404
handler500 = handler500
handler403 = handler403
handler400 = handler400