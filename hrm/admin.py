from django.contrib import admin
from .models import (
    Department,
    Employee,
    Leave,
    Attendance,
    Payroll,
    PerformanceReview,
    Task,
    Notification,
)

# تعريف فئة Admin مخصصة لكل نموذج (اختياري)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'location')
    search_fields = ('name', 'description', 'location')

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('user', 'department', 'position', 'salary', 'hire_date', 'is_active')
    list_filter = ('department', 'position', 'is_active', 'hire_date')
    search_fields = ('user__username', 'position', 'department__name')

class LeaveAdmin(admin.ModelAdmin):
    list_display = ('employee', 'leave_type', 'start_date', 'end_date', 'status')
    list_filter = ('leave_type', 'status', 'start_date', 'end_date')
    search_fields = ('employee__user__username', 'leave_type')

class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('employee', 'date', 'hours_worked', 'check_in', 'check_out')
    list_filter = ('date',)
    search_fields = ('employee__user__username',)

class PayrollAdmin(admin.ModelAdmin):
    list_display = ('employee', 'month', 'basic_salary', 'bonuses', 'deductions', 'net_salary')
    list_filter = ('month',)
    search_fields = ('employee__user__username',)

class PerformanceReviewAdmin(admin.ModelAdmin):
    list_display = ('employee', 'review_date', 'rating', 'comments')
    list_filter = ('review_date', 'rating')
    search_fields = ('employee__user__username', 'comments')

class TaskAdmin(admin.ModelAdmin):
    list_display = ('employee', 'title', 'due_date', 'status')
    list_filter = ('status', 'due_date')
    search_fields = ('employee__user__username', 'title')

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('notification_type', 'employee', 'message', 'is_read', 'created_at')
    list_filter = ('notification_type', 'is_read', 'created_at')
    search_fields = ('employee__user__username', 'message')

# تسجيل النماذج مع فئات Admin المخصصة
admin.site.register(Department, DepartmentAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Leave, LeaveAdmin)
admin.site.register(Attendance, AttendanceAdmin)
admin.site.register(Payroll, PayrollAdmin)
admin.site.register(PerformanceReview, PerformanceReviewAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Notification, NotificationAdmin)