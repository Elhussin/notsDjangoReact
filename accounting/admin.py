from django.contrib import admin
from django.db.models import F
from .models import FinancialPeriod, Account, Tax, Category, Transaction, JournalEntry, RecurringTransaction
from django.contrib.admin import DateFieldListFilter
from djmoney.money import Money
from django.db.models import Sum
from django.utils.timezone import now

# ==============================
#  Financial Period Admin
# ==============================
@admin.register(FinancialPeriod)
class FinancialPeriodAdmin(admin.ModelAdmin):
    """Admin configuration for Financial Periods."""
    list_display = ('name', 'start_date', 'end_date', 'is_closed', 'days_remaining')
    list_filter = ('is_closed',)
    date_hierarchy = 'start_date'
    
    def days_remaining(self, obj):
        """Calculates remaining days until the period ends."""
        from django.utils.timezone import now
        return (obj.end_date - now().date()).days
    days_remaining.short_description = 'Days Remaining'

# ==============================
#  Transaction Inline for Account
# ==============================
class TransactionInline(admin.TabularInline):
    """Allows transactions to be added directly from the Account admin panel."""
    model = Transaction
    extra = 1

# ==============================
#  Account Admin
# ==============================
@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    """Admin configuration for user accounts."""
    list_display = ('name', 'get_balance', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')

    def get_balance(self, obj):
        """Fetches the dynamically calculated balance."""
        return obj.balance  # Uses the balance property
    get_balance.short_description = "Balance"
    
    actions = ['generate_balance_sheet', 'generate_income_statement']
    
    # creat genrete balance sheet action
    def generate_balance_sheet(self, request, queryset):
        assets = sum(account.balance.amount for account in Account.objects.all())
        liabilities = sum(account.balance.amount for account in Account.objects.all())

        equity = assets - liabilities
        self.message_user(
            request,
            f"Balance Sheet: Assets: {assets}, Liabilities: {liabilities}, Equity: {equity}"
        )

    generate_balance_sheet.short_description = 'Generate Balance Sheet'

    # Custom action to generate an income statement
    def generate_income_statement(self, request, queryset):
        income = Transaction.objects.filter(transaction_type='income').aggregate(total=models.Sum('amount'))['total'] or 0
        expenses = Transaction.objects.filter(transaction_type='expense').aggregate(total=Sum('amount'))['total'] or 0
        profit = income - expenses
        self.message_user(
            request,
            f"Income Statement: Income: {income}, Expenses: {expenses}, Profit: {profit}"
        )

    generate_income_statement.short_description = 'Generate Income Statement'
    
    inlines = [TransactionInline]  # Allows adding transactions from the Account page


# ==============================
#  Tax Admin
# ==============================
@admin.register(Tax)
class TaxAdmin(admin.ModelAdmin):
    """Admin configuration for tax settings."""
    list_display = ('name', 'rate', 'effective_date', 'is_active')
    list_filter = ('is_active',)
    date_hierarchy = 'effective_date'

# ==============================
#  Category Admin
# ==============================
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin configuration for transaction categories."""
    list_display = ('name', 'category_type', 'parent', 'hierarchy_level')
    list_filter = ('category_type',)
    search_fields = ('name',)
    autocomplete_fields = ('parent',)
    
    def hierarchy_level(self, obj):
        """Displays the hierarchy level of categories using indentation."""
        level = 0
        parent = obj.parent
        while parent:
            level += 1
            parent = parent.parent
        return "▸" * level
    hierarchy_level.short_description = 'Category Level'

# ==============================
#  Transaction Admin
# ==============================
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    """Admin configuration for transactions."""
    list_display = ('date', 'account', 'amount_display', 'transaction_type', 'period', 'category')
    
    list_filter = ('transaction_type', 'period')  # Removed redundant DateFieldListFilter

    search_fields = ('description', 'account__name')
    autocomplete_fields = ('account', 'category')
    date_hierarchy = 'date'
    actions = ['recalculate_balances']
    
    def amount_display(self, obj):
        """Displays the transaction amount including currency."""
        return obj.amount  # MoneyField automatically includes currency
    amount_display.short_description = 'Amount'
    
    @admin.action(description='Recalculate account balances')
    def recalculate_balances(self, request, queryset):
        """Recalculates and saves balances for affected accounts."""
        account_ids = queryset.values_list('account_id', flat=True).distinct()
        accounts = Account.objects.filter(id__in=account_ids)

        for account in accounts:
            account.update_balance()  # Ensure update_balance persists the value if needed

        self.message_user(
            request,
            f"Successfully updated {accounts.count()} account balances."
        )

    def get_queryset(self, request):
        """Optimizes query performance by prefetching related fields."""
        return super().get_queryset(request).select_related(
            'account', 'period', 'category'
        )

@admin.register(JournalEntry)
class JournalEntryAdmin(admin.ModelAdmin):
    """Admin configuration for journal entries."""
    list_display = ('account', 'transaction', 'debit', 'credit')
    list_filter = ('transaction',)
    search_fields = ('account__name', 'transaction__description')
    
    def get_queryset(self, request):
        """Optimizes query performance by prefetching related fields."""
        return super().get_queryset(request).select_related('account')
    
    def amount(self, obj):
        """Displays the transaction amount including currency."""
        return obj.amount  # MoneyField automatically includes currency
    amount.short_description = 'Amount'


@admin.register(RecurringTransaction)
class RecurringTransactionAdmin(admin.ModelAdmin):
    """Admin configuration for recurring transactions."""
    list_display = ('account','amount', 'transaction_types', 'interval','next_execution' )
    list_filter = ('transaction_types', 'interval')
    search_fields = ('account',)
    date_hierarchy = 'next_execution'
    
    
    def amount(self, obj):
        """Displays the transaction amount including currency."""
        return obj.amount  # MoneyField automatically includes currency
    amount.short_description = 'Amount'
    

