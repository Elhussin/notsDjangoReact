from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="crm_customer")
    phone = models.CharField(max_length=15)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

class Interaction(models.Model):
    INTERACTION_TYPES = [
        ('call', 'Call'),
        ('email', 'Email'),
        ('meeting', 'Meeting'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="interactions")
    interaction_type = models.CharField(max_length=10, choices=INTERACTION_TYPES)
    notes = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.interaction_type} with {self.customer.user.username}"

class Complaint(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="complaints")
    description = models.TextField()
    status = models.CharField(max_length=20, choices=[('open', 'Open'), ('resolved', 'Resolved')], default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Complaint by {self.customer.user.username}"