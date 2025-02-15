from rest_framework import serializers
from .models import FinancialPeriod, Account, Tax, Category, Transaction, JournalEntry, RecurringTransaction
from djmoney.money import Money
from drf_spectacular.utils import extend_schema_field

# ==============================
#  Financial Period Serializer
# ==============================
class FinancialPeriodSerializer(serializers.ModelSerializer):
    """Serializer for financial periods."""
    
    class Meta:
        model = FinancialPeriod
        fields = '__all__'  # Includes all fields

# ==============================
#  Account Serializer
# ==============================
class AccountSerializer(serializers.ModelSerializer):
    """Serializer for user accounts with balance calculation."""
   
    balance = serializers.SerializerMethodField()  # Read-only calculated field

    class Meta:
        model = Account
        fields = ['id', 'user', 'name', 'currency', 'created_at', 'updated_at', 'balance']
    @extend_schema_field(serializers.DecimalField(max_digits=10, decimal_places=2))
    def get_balance(self, obj):
        """Calculates account balance dynamically."""
        return str(obj.balance)  # Converts Money object to string for API response

# ==============================
#  Tax Serializer
# ==============================
class TaxSerializer(serializers.ModelSerializer):
    """Serializer for tax records."""
    
    class Meta:
        model = Tax
        fields = '__all__'

# ==============================
#  Category Serializer
# ==============================
class CategorySerializer(serializers.ModelSerializer):
    """Serializer for transaction categories, supporting nested parent categories."""
    
    parent_name = serializers.CharField(source='parent.name', read_only=True)  # Shows parent category name

    class Meta:
        model = Category
        fields = ['id', 'name', 'category_type', 'parent', 'parent_name', 'description']
        ref_name = 'AccountingCategory'  # اسم جديد للمكون
# ==============================
#  Transaction Serializer
# ==============================
class TransactionSerializer(serializers.ModelSerializer):
    """Serializer for transactions, ensuring currency consistency."""
    
    account_currency = serializers.CharField(source='account.currency', read_only=True)  # Ensures transactions match account currency

    class Meta:
        model = Transaction
        fields = [
            'id', 'account', 'account_currency', 'period', 'date', 'amount', 'transaction_type', 
            'category', 'tax_rate', 'description', 'created_at', 'updated_at'
        ]
    
    def validate(self, data):
        """Ensures that transaction currency matches account currency."""
        account = data.get('account')
        amount = data.get('amount')

        if account and amount and amount.currency != account.currency:
            raise serializers.ValidationError(
                f"Transaction currency ({amount.currency}) must match account currency ({account.currency})."
            )

        return data



class JournalEntrySerializer(serializers.ModelSerializer):
    """Serializer for journal entries."""
    
    class Meta:
        model = JournalEntry
        fields = '__all__'
        
class RecurringTransactionSerializer(serializers.ModelSerializer):
    """Serializer for recurring transactions."""
    
    class Meta:
        model = RecurringTransaction
        fields = '__all__'  # Includes all fields
        
        
        
