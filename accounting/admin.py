from django.contrib import admin
from .models import Account, Transaction, Tax

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'balance', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at', 'updated_at')

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('account', 'amount', 'transaction_type', 'date')
    search_fields = ('account__name', 'description')
    list_filter = ('transaction_type', 'date')

@admin.register(Tax)
class TaxAdmin(admin.ModelAdmin):
    list_display = ('name', 'rate', 'description')
    search_fields = ('name',)