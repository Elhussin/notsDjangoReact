from rest_framework import viewsets, permissions, filters
from rest_framework.pagination import PageNumberPagination
from .models import Account, Transaction, Tax, Category
from .serializers import AccountSerializer, TransactionSerializer, TaxSerializer, CategorySerializer

# Pagination
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# ViewSet لنموذج Account
class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)

# ViewSet لنموذج Tax
class TaxViewSet(viewsets.ModelViewSet):
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer
    permission_classes = [permissions.IsAuthenticated]

# ViewSet لنموذج Category
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

# ViewSet لنموذج Transaction
class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['description', 'transaction_type']
    ordering_fields = ['date', 'amount']
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(account__user=user)

    def perform_create(self, serializer):
        account_id = self.request.data.get('account')
        account = Account.objects.get(id=account_id, user=self.request.user)
        serializer.save(account=account)

