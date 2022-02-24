from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
<<<<<<< HEAD
        fields = ('username', 'email', 'password')
=======
        exclude = ('id', 'last_login', 'is_superuser', 'first_name', 'last_name',
                   'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions', )

>>>>>>> 28f74b5aaecf853a9ea0b58d0d81b309585a069b

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Profile
        fields = ('user', 'bio', 'location')
