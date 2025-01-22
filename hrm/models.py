from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="employee")
    position = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    hire_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username

class Leave(models.Model):
    LEAVE_TYPES = [
        ('sick', 'Sick Leave'),
        ('vacation', 'Vacation Leave'),
        ('personal', 'Personal Leave'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="leaves")
    leave_type = models.CharField(max_length=10, choices=LEAVE_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending')

    def __str__(self):
        return f"{self.leave_type} for {self.employee.user.username}"