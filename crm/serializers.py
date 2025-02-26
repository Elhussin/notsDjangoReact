from rest_framework import serializers
from .models import (
    Customer, Interaction, Complaint, Opportunity, Task, Campaign, Team, Document
)
from django.contrib.auth import get_user_model
from users.serializers import CoustmUserSerializer
User = get_user_model()
# Serializer لنموذج User


# Serializer لنموذج Customer
class CustomerSerializer(serializers.ModelSerializer):
    user = CoustmUserSerializer(read_only=True)

    class Meta:
        model = Customer
        fields = ['id', 'user', 'phone', 'address', 'created_at', 'updated_at']

# Serializer لنموذج Interaction
class InteractionSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())

    class Meta:
        model = Interaction
        fields = ['id', 'customer', 'interaction_type', 'notes', 'date']

# Serializer لنموذج Complaint
class ComplaintSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())

    class Meta:
        model = Complaint
        fields = ['id', 'customer', 'description', 'status', 'created_at', 'updated_at']

# Serializer لنموذج Opportunity
class OpportunitySerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())

    class Meta:
        model = Opportunity
        fields = ['id', 'customer', 'title', 'stage', 'amount', 'created_at', 'updated_at']

# Serializer لنموذج Task
class TaskSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), required=False, allow_null=True)
    opportunity = serializers.PrimaryKeyRelatedField(queryset=Opportunity.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Task
        fields = ['id', 'customer', 'opportunity', 'title', 'description', 'priority', 'due_date', 'completed', 'created_at', 'updated_at']
        ref_name = 'CRMTask'  # اسم جديد للمكون
# Serializer لنموذج Campaign
class CampaignSerializer(serializers.ModelSerializer):
    customers = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), many=True)

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'description', 'start_date', 'end_date', 'customers', 'created_at', 'updated_at']

# Serializer لنموذج Team
class TeamSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'members', 'created_at', 'updated_at']

# Serializer لنموذج Document
class DocumentSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Document
        fields = ['id', 'customer', 'title', 'file', 'uploaded_at']