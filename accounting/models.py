from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

class Account(models.Model):
    CURRENCIES = [
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('SAR', 'Saudi Riyal'),
        # Add more currencies as needed
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="accounts")
    name = models.CharField(max_length=255)
    currency = models.CharField(max_length=3, choices=CURRENCIES, default='USD')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def balance(self):
        income = self.transactions.filter(transaction_type='income').aggregate(total=models.Sum('amount'))['total'] or 0
        expense = self.transactions.filter(transaction_type='expense').aggregate(total=models.Sum('amount'))['total'] or 0
        return income - expense

    def __str__(self):
        return f"{self.name} ({self.currency})"

class Tax(models.Model):
    name = models.CharField(max_length=100)
    rate = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.rate}%)"

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="transactions")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="transactions")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    description = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    tax = models.ForeignKey(Tax, on_delete=models.SET_NULL, null=True, blank=True, related_name="transactions")

    def clean(self):
        if self.amount <= 0:
            raise ValidationError("Amount must be greater than zero.")
        if self.transaction_type not in dict(self.TRANSACTION_TYPES):
            raise ValidationError("Invalid transaction type.")

    def save(self, *args, **kwargs):
        self.full_clean()  # التحقق من صحة البيانات قبل الحفظ
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.transaction_type} - {self.amount}"