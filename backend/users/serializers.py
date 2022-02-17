from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ('id', 'last_login', 'is_superuser', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions', )

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    class Meta:
        model = Profile
        fields = ('user', 'bio', 'location')
