from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    class Meta:
        model = Profile
        fields = ('user', 'bio', 'location')
