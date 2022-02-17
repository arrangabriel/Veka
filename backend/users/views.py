from .serializers import ProfileSerializer
from .models import Profile
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User
from django.db import IntegrityError

@api_view(['GET'])
def profiles_list(request):
    if request.method == 'GET':
        data = Profile.objects.all()
        serializer = ProfileSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
            
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        try:
            User.objects.create_user(username=username, email=email, password=password).save()
            return Response(status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

