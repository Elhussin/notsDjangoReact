from rest_framework import serializers
from .models import Customer, Interaction, Complaint

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'phone', 'address', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class InteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = ['id', 'customer', 'interaction_type', 'notes', 'date']
        read_only_fields = ['date']

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ['id', 'customer', 'description', 'status', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']