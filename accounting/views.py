from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import FinancialPeriod, Account, Tax, Category, Transaction, JournalEntry, RecurringTransaction
from .serializers import (
    FinancialPeriodSerializer, AccountSerializer, TaxSerializer, 
    CategorySerializer, TransactionSerializer, RecurringTransactionSerializer, JournalEntrySerializer
)
from django.db.models import Sum


# ==============================
#  Financial Period ViewSet
# ==============================
class FinancialPeriodViewSet(viewsets.ModelViewSet):
    """ViewSet for managing financial periods."""
    
    queryset = FinancialPeriod.objects.all()
    serializer_class = FinancialPeriodSerializer
    permission_classes = [IsAuthenticated]

# ==============================
#  Account ViewSet
# ==============================
class AccountViewSet(viewsets.ModelViewSet):
    """ViewSet for managing accounts."""
    
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Ensures users only see their own accounts."""
        return self.queryset.filter(user=self.request.user)

# ==============================
#  Tax ViewSet
# ==============================
class TaxViewSet(viewsets.ModelViewSet):
    """ViewSet for managing taxes."""
    
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer
    permission_classes = [IsAuthenticated]

# ==============================
#  Category ViewSet
# ==============================
class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for managing categories."""
    
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [IsAuthenticated]

# ==============================
#  Transaction ViewSet
# ==============================
class TransactionViewSet(viewsets.ModelViewSet):
    """ViewSet for managing transactions."""
    
    queryset = Transaction.objects.select_related('account', 'category', 'tax_rate', 'period')
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Returns only transactions related to the authenticated user."""
        return self.queryset.filter(account__user=self.request.user)

    def perform_create(self, serializer):
        """Ensures transaction currency matches account currency before saving."""
         
        transaction = serializer.save()
        
        # Confirm that the transaction currency matches the account currency
        if transaction.amount.currency != transaction.account.currency:
            raise ValidationError("Transaction currency must match account currency.")

        # Confirm that the account has sufficient funds for expenses
        if transaction.transaction_type == 'expense' and transaction.amount.amount > transaction.account.balance.amount:
            raise ValidationError("Insufficient funds in the account.")
        
        transaction.account.update_balance()

    def perform_update(self, serializer):
        transaction = serializer.save()
        
        # نفس التحقق عند التحديث
        if transaction.transaction_type == 'expense' and transaction.amount.amount > transaction.account.balance.amount:
            raise ValidationError("Insufficient funds in the account.")
        
        transaction.account.update_balance()
        

# ==============================
#  RecurringTransaction ViewSet
# ==============================
class RecurringTransactionViewSet(viewsets.ModelViewSet):
    """ViewSet for managing recurring transactions."""
    
    queryset = RecurringTransaction.objects.all()
    serializer_class = RecurringTransactionSerializer
    permission_classes = [IsAuthenticated]


# ==============================
#  JournalEntry ViewSet
# ==============================
class JournalEntryViewSet(viewsets.ModelViewSet):
    """ViewSet for managing journal entries."""
    
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

# ==============================
#  Report ViewSet
# ==============================
class ReportViewSet(viewsets.ViewSet):
    
    def balance_sheet(self, request):
        assets = Account.objects.filter(category='asset').aggregate(total=Sum('balance'))['total'] or 0
        liabilities = Account.objects.filter(category='liability').aggregate(total=Sum('balance'))['total'] or 0
        equity = assets - liabilities
        return Response({'assets': assets, 'liabilities': liabilities, 'equity': equity})

    def income_statement(self, request):
        income = Transaction.objects.filter(transaction_type='income').aggregate(total=Sum('amount'))['total'] or 0
        expenses = Transaction.objects.filter(transaction_type='expense').aggregate(total=Sum('amount'))['total'] or 0
        profit = income - expenses
        return Response({'income': income, 'expenses': expenses, 'profit': profit})
    
    def cash_flow(self, request):
        income = Transaction.objects.filter(transaction_type='income').aggregate(total=Sum('amount'))['total'] or 0
        expenses = Transaction.objects.filter(transaction_type='expense').aggregate(total=Sum('amount'))['total'] or 0
        return Response({'income': income, 'expenses': expenses})


