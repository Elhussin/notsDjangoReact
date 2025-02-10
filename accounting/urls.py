from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FinancialPeriodViewSet, AccountViewSet, TaxViewSet, 
    CategoryViewSet, TransactionViewSet,ReportViewSet, JournalEntryViewSet, RecurringTransactionViewSet
)

router = DefaultRouter()
router.register(r'financial-periods', FinancialPeriodViewSet , basename='financial-period')
router.register(r'accounts', AccountViewSet , basename='account')
router.register(r'taxes', TaxViewSet , basename='tax')
router.register(r'categories', CategoryViewSet , basename='category')
router.register(r'transactions', TransactionViewSet , basename='transaction')
router.register(r'reports', ReportViewSet, basename='report')
router.register(r'journal-entries', JournalEntryViewSet, basename='journal-entry')
router.register(r'recurring-transactions', RecurringTransactionViewSet, basename='recurring-transaction')

urlpatterns = [
    path('', include(router.urls)),
]

