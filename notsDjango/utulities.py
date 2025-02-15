from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
import os
import shutil

class BaseViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def get_default_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class DynamicModelViewSet(BaseViewSet):
    model = None
    serializer_class = None

    def get_queryset(self):
        if self.model is None:
            raise NotImplementedError("You must define a 'model' attribute in your ViewSet.")
        return self.model.objects.all()




def clear_cache():
    """
    Deletes all files in the cache directory.
    """
    from django.conf import settings

    cache_dir = settings.CACHES['default']['LOCATION']
    if os.path.exists(cache_dir):
        try:
            # حذف جميع الملفات والمجلدات داخل مجلد الـ Cache
            shutil.rmtree(cache_dir)
            print(f"Cache cleared successfully from {cache_dir}")
        except Exception as e:
            print(f"Error clearing cache: {e}")
    else:
        print(f"Cache directory does not exist: {cache_dir}")