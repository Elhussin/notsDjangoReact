from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_superuser', 'last_name', 'first_name', 'is_staff', 'is_active']
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only

    def create(self, validated_data):
        """
        Handle user creation. Hash the password when creating the user.
        """
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        """
        Handle user update. If password is provided, hash it.
        """
        password = validated_data.pop('password', None)  # Pop password if it exists
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:  # If password is provided, hash it
            instance.set_password(password)

        instance.save()
        return instance


class CoustmUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ['id', 'username', 'email', 'first_name', 'last_name']