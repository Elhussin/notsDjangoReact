from django.contrib import admin
from .models import (
    Customer,
    Interaction,
    Complaint,
    Opportunity,
    Task,
    Campaign,
    Team,
    Document,
)

# تعريف فئة Admin مخصصة لكل نموذج (اختياري)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'address', 'created_at', 'updated_at')
    search_fields = ('user__username', 'phone', 'address')
    list_filter = ('created_at', 'updated_at')

class InteractionAdmin(admin.ModelAdmin):
    list_display = ('customer', 'interaction_type', 'date')
    list_filter = ('interaction_type', 'date')
    search_fields = ('customer__user__username', 'notes')

class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('customer', 'description', 'status', 'created_at', 'updated_at')
    list_filter = ('status', 'created_at')
    search_fields = ('customer__user__username', 'description')

class OpportunityAdmin(admin.ModelAdmin):
    list_display = ('title', 'customer', 'stage', 'amount', 'created_at', 'updated_at')
    list_filter = ('stage', 'created_at')
    search_fields = ('title', 'customer__user__username')

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'priority', 'due_date', 'completed', 'created_at')
    list_filter = ('priority', 'completed', 'due_date')
    search_fields = ('title', 'description')

class CampaignAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'created_at', 'updated_at')
    list_filter = ('start_date', 'end_date')
    filter_horizontal = ('customers',)  # لعرض حقل ManyToMany بشكل أفضل

class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    filter_horizontal = ('members',)  # لعرض حقل ManyToMany بشكل أفضل

class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'customer', 'uploaded_at')
    list_filter = ('uploaded_at',)
    search_fields = ('title', 'customer__user__username')

# تسجيل النماذج مع فئات Admin المخصصة
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Interaction, InteractionAdmin)
admin.site.register(Complaint, ComplaintAdmin)
admin.site.register(Opportunity, OpportunityAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Campaign, CampaignAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Document, DocumentAdmin)