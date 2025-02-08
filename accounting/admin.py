# from django.contrib import admin
# from django.contrib import messages
# from .models import Account, Transaction, Tax, Category

# # تسجيل النموذج Tax
# @admin.register(Tax)
# class TaxAdmin(admin.ModelAdmin):
#     list_display = ('name', 'rate', 'description')
#     search_fields = ('name',)
#     list_filter = ('rate',)

# # تسجيل النموذج Category
# @admin.register(Category)
# class CategoryAdmin(admin.ModelAdmin):
#     list_display = ('name', 'description')
#     search_fields = ('name',)

# # إجراء مخصص لتحديث الوصف
# @admin.action(description="Mark selected transactions as processed")
# def mark_as_processed(modeladmin, request, queryset):
#     updated = queryset.update(description="Processed")
#     messages.success(request, f"{updated} transaction(s) marked as processed.")

# # تسجيل النموذج Transaction
# @admin.register(Transaction)
# class TransactionAdmin(admin.ModelAdmin):
#     list_display = ('account', 'amount', 'transaction_type', 'date', 'category', 'tax')
#     list_filter = ('transaction_type', 'date', 'account', 'category', 'tax')
#     search_fields = ('account__name', 'description')
#     date_hierarchy = 'date'
#     autocomplete_fields = ('account', 'category', 'tax')
#     actions = [mark_as_processed]

# # Inline لعرض المعاملات في صفحة الحساب
# class TransactionInline(admin.TabularInline):
#     model = Transaction
#     extra = 1

# # تسجيل النموذج Account
# @admin.register(Account)
# class AccountAdmin(admin.ModelAdmin):
#     list_display = ('name', 'balance', 'created_at', 'updated_at')
#     search_fields = ('name',)
#     list_filter = ('created_at', 'updated_at')
#     readonly_fields = ('balance', 'created_at', 'updated_at')
#     inlines = [TransactionInline]

#     def balance(self, obj):
#         return obj.balance  # استدعاء الخاصية balance من النموذج
    
    
from django.contrib import admin
from django.db.models import F
from django_admin_listfilter_dropdown.filters import DateRangeFilter
from .models import Currency, FinancialPeriod, Account, Tax, Category, Transaction

@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'exchange_rate', 'is_active')
    list_editable = ('exchange_rate', 'is_active')
    search_fields = ('code', 'name')
    ordering = ('code',)

@admin.register(FinancialPeriod)
class FinancialPeriodAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'is_closed', 'days_remaining')
    list_filter = ('is_closed',)
    date_hierarchy = 'start_date'
    
    def days_remaining(self, obj):
        from django.utils.timezone import now
        return (obj.end_date - now().date()).days
    days_remaining.short_description = 'أيام متبقية'

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'balance_display', 'base_currency', 'created_at')
    search_fields = ('name', 'user__username')
    list_select_related = ('user', 'base_currency')
    autocomplete_fields = ('user', 'base_currency')
    
    def balance_display(self, obj):
        return f"{obj.balance.amount} {obj.balance.currency}"
    balance_display.short_description = 'الرصيد'

@admin.register(Tax)
class TaxAdmin(admin.ModelAdmin):
    list_display = ('name', 'rate', 'effective_date', 'is_active')
    list_filter = ('is_active',)
    date_hierarchy = 'effective_date'

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category_type', 'parent', 'hierarchy_level')
    list_filter = ('category_type',)
    search_fields = ('name',)
    autocomplete_fields = ('parent',)
    
    def hierarchy_level(self, obj):
        level = 0
        parent = obj.parent
        while parent:
            level += 1
            parent = parent.parent
        return "▸" * level
    hierarchy_level.short_description = 'مستوى التصنيف'

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('date', 'account', 'amount_display', 'transaction_type', 'period', 'category')
    list_filter = (
        'transaction_type',
        ('date', DateRangeFilter),
        'period',
        'category'
    )
    search_fields = ('description', 'account__name')
    autocomplete_fields = ('account', 'category')
    date_hierarchy = 'date'
    actions = ['recalculate_balances']
    
    def amount_display(self, obj):
        return f"{obj.amount.amount} {obj.amount.currency}"
    amount_display.short_description = 'المبلغ'
    
    @admin.action(description='إعادة حساب أرصدة الحسابات')
    def recalculate_balances(self, request, queryset):
        accounts = Account.objects.filter(
            transactions__in=queryset
        ).distinct()
        
        for account in accounts:
            account.update_balance()
        
        self.message_user(
            request,
            f"تم تحديث {accounts.count()} حساب بنجاح"
        )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related(
            'account', 'period', 'category'
        )