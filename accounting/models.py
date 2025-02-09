
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth import get_user_model
from djmoney.models.fields import MoneyField
from djmoney.money import Money
from django.utils.functional import lazy

User = get_user_model()


CURRENCY_CHOICES = [('USD', 'USD'), ('EUR', 'EUR'), ('SAR', 'SAR')]


# class Currency(models.Model):
#     code = models.CharField(max_length=3, unique=True)
#     name = models.CharField(max_length=50)
#     exchange_rate = models.DecimalField(max_digits=10, decimal_places=4, default=1.0)
#     is_active = models.BooleanField(default=True)
#     currency = models.CharField(max_length=3, default='USD',choices=)

#     class Meta:
#         unique_together = ('code', 'name')

#     def __str__(self):
#         return f"{self.code} ({self.name})"
    
#     def get_currency_choices():
#         from django.db import connection
#         if "accounting_currency" not in connection.introspection.table_names():
#             return CURRENCY_CHOICES  # قيمة افتراضية مؤقتة أثناء التهيئة
#         from .models import Currency  
#         return [(c.code, c.code) for c in Currency.objects.filter(is_active=True)]


class FinancialPeriod(models.Model):
    name = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    is_closed = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    

# class Account(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="accounts")
#     name = models.CharField(max_length=255)
#     balance = MoneyField(
#         max_digits=14,
#         decimal_places=2,
#         default_currency='USD',
#         currency_choices=lazy(get_currency_choices, list)()  # استخدام lazy
#     )
    
#     def get_default_currency():
#         return Currency.objects.get(code='USD').id

#     base_currency = models.ForeignKey(
#         Currency,
#         on_delete=models.PROTECT,
#         related_name='base_accounts',
#         default=get_default_currency
#     )


#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)


#     def update_balance(self):
#         from .models import Transaction  
#         total_amount = self.transactions.aggregate(
#             total=models.Sum('amount')
#         )['total']
#         self.balance = Money(total_amount or 0, self.balance.currency)
#         self.save()


#     def __str__(self):
#         return f"{self.name} ({self.balance.currency})"
    

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
    effective_date = models.DateField()
    is_active = models.BooleanField(default=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.rate}%)"

class Category(models.Model):
    TYPE_CHOICES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]
    
    name = models.CharField(max_length=100, unique=True)
    category_type = models.CharField(max_length=7, choices=TYPE_CHOICES)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]
    
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    period = models.ForeignKey(FinancialPeriod, on_delete=models.PROTECT)
    date = models.DateField()
    amount = MoneyField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=7, choices=TRANSACTION_TYPES)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    currency = models.CharField(max_length=3, default='USD')

# python manage.py migrate accounting

    def save(self, *args, **kwargs):
        if not self.currency:
            self.currency = self.account.balance.currency
        super().save(*args, **kwargs)
        self.account.update_balance()

    def __str__(self):
        return f"{self.date} - {self.amount.amount} {self.amount.currency}"

