from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, InteractionViewSet, ComplaintViewSet

router = DefaultRouter()
router.register(r'customers', CustomerViewSet, basename='customers')
router.register(r'interactions', InteractionViewSet, basename='interactions')
router.register(r'complaints', ComplaintViewSet, basename='complaints')

urlpatterns = [
    path('', include(router.urls)),
]