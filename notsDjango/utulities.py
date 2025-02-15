from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
               
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
