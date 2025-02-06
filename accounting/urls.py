# Router
from rest_framework.routers import DefaultRouter
from .views import AccountViewSet, TaxViewSet, CategoryViewSet, TransactionViewSet
# URLs
from django.urls import path, include

router = DefaultRouter()
router.register(r'accounts', AccountViewSet, basename='account')
router.register(r'taxes', TaxViewSet, basename='tax')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'transactions', TransactionViewSet, basename='transaction')



urlpatterns = [
    path('', include(router.urls)),
]