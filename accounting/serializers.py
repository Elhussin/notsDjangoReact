from rest_framework import serializers
from .models import Account, Transaction, Tax, Category

# Serializer لنموذج Account
class AccountSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(  # أو PrimaryKeyRelatedField(read_only=True)
        default=serializers.CurrentUserDefault()
    )
    balance = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )
    currency = serializers.ChoiceField(choices=Account.CURRENCIES)
    class Meta:
        model = Account
        fields = ['id', 'user', 'name', 'currency', 'balance', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
        

# Serializer لنموذج Tax
class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
        fields = ['id', 'name', 'rate', 'description']
        read_only_fields = ['id']

# Serializer لنموذج Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']
        read_only_fields = ['id']

# Serializer لنموذج Transaction
class TransactionSerializer(serializers.ModelSerializer):
    account_name = serializers.CharField(
        source='account.name',
        read_only=True
    )
    category_name = serializers.CharField(
        source='category.name',
        allow_null=True,
        read_only=True
    )
    tax_name = serializers.CharField(
        source='tax.name',
        allow_null=True,
        read_only=True
    )

    class Meta:
        model = Transaction
        fields = [
            'id',
            'account',
            'account_name',
            'category',
            'category_name',
            'amount',
            'transaction_type',
            'description',
            'date',
            'tax',
            'tax_name'
        ]
        read_only_fields = ['id', 'date']

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value

    def validate_transaction_type(self, value):
        valid_types = dict(Transaction.TRANSACTION_TYPES).keys()
        if value not in valid_types:
            raise serializers.ValidationError("Invalid transaction type.")
        return value