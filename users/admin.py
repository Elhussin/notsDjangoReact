from django.contrib import admin

# Register your models here.
from django.contrib.auth import get_user_model

User = get_user_model()

# @admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'is_staff', 'is_active', 'date_joined']
    search_fields = ['username', 'email']
    list_filter = ['is_staff', 'is_active', 'date_joined']
    
    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_superuser=False)

