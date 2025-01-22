from django.contrib import admin
from .models import Employee, Leave

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('user', 'position', 'salary', 'hire_date', 'is_active')
    search_fields = ('user__username', 'position')
    list_filter = ('is_active', 'hire_date')

@admin.register(Leave)
class LeaveAdmin(admin.ModelAdmin):
    list_display = ('employee', 'leave_type', 'start_date', 'end_date', 'status')
    search_fields = ('employee__user__username', 'leave_type')
    list_filter = ('leave_type', 'status', 'start_date')