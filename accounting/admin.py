from django.contrib import admin
from django.contrib import messages
from .models import Account, Transaction, Tax, Category

# تسجيل النموذج Tax
@admin.register(Tax)
class TaxAdmin(admin.ModelAdmin):
    list_display = ('name', 'rate', 'description')
    search_fields = ('name',)
    list_filter = ('rate',)

# تسجيل النموذج Category
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

# إجراء مخصص لتحديث الوصف
@admin.action(description="Mark selected transactions as processed")
def mark_as_processed(modeladmin, request, queryset):
    updated = queryset.update(description="Processed")
    messages.success(request, f"{updated} transaction(s) marked as processed.")

# تسجيل النموذج Transaction
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('account', 'amount', 'transaction_type', 'date', 'category', 'tax')
    list_filter = ('transaction_type', 'date', 'account', 'category', 'tax')
    search_fields = ('account__name', 'description')
    date_hierarchy = 'date'
    autocomplete_fields = ('account', 'category', 'tax')
    actions = [mark_as_processed]

# Inline لعرض المعاملات في صفحة الحساب
class TransactionInline(admin.TabularInline):
    model = Transaction
    extra = 1

# تسجيل النموذج Account
@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'balance', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at', 'updated_at')
    readonly_fields = ('balance', 'created_at', 'updated_at')
    inlines = [TransactionInline]

    def balance(self, obj):
        return obj.balance  # استدعاء الخاصية balance من النموذج