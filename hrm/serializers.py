from rest_framework import serializers
from .models import (
    Employee, Department, Leave, Attendance, Payroll,
    PerformanceReview, Task, Notification
)

# Serializer for Department
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name','description', 'location']

# Serializer for Employee
class EmployeeSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Employee
        fields = [
            'id', 'user', 'department', 'department_name', 'position',
            'salary', 'hire_date', 'is_active'
        ]

# Serializer for Leave
class LeaveSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)

    class Meta:
        model = Leave
        fields = [
            'id', 'employee', 'employee_name', 'leave_type',
            'start_date', 'end_date', 'status'
        ]

# Serializer for Attendance
class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)

    class Meta:
        model = Attendance
        fields = [
            'id', 'employee', 'employee_name', 'date',
            'check_in', 'check_out', 'hours_worked'
        ]

# Serializer for Payroll
class PayrollSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)

    class Meta:
        model = Payroll
        fields = [
            'id', 'employee', 'employee_name', 'month',
            'basic_salary', 'bonuses', 'deductions', 'net_salary'
        ]

# Serializer for PerformanceReview
class PerformanceReviewSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)

    class Meta:
        model = PerformanceReview
        fields = [
            'id', 'employee', 'employee_name', 'review_date',
            'rating', 'comments'
        ]

# Serializer for Task
class TaskSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)

    class Meta:
        model = Task
        fields = [
            'id', 'employee', 'employee_name', 'title',
            'description', 'due_date', 'status'
        ]

# Serializer for Notification
class NotificationSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)

    class Meta:
        model = Notification
        fields = [
            'id', 'notification_type', 'employee', 'employee_name',
            'message', 'is_read', 'created_at'
        ]