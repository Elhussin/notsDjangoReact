from django.contrib import admin
from .models import Customer, Interaction, Complaint

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'address', 'created_at', 'updated_at')
    search_fields = ('user__username', 'phone')
    list_filter = ('created_at', 'updated_at')

@admin.register(Interaction)
class InteractionAdmin(admin.ModelAdmin):
    list_display = ('customer', 'interaction_type', 'date')
    search_fields = ('customer__user__username', 'notes')
    list_filter = ('interaction_type', 'date')

@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('customer', 'status', 'created_at', 'updated_at')
    search_fields = ('customer__user__username', 'description')
    list_filter = ('status', 'created_at')