from .serializers import ProfileSerializer
from .models import Profile
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout

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

@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def edit(request):
    if request.method == 'POST':
        bio = request.data.get('bio')
        location = request.data.get('location')
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user.id)
            if (bio):
                profile.bio = bio
            if (location):
                profile.location = location
            try: 
                profile.full_clean()
                profile.save()
                return Response(status=status.HTTP_200_OK)
            except ValidationError as e:
                #TODO: Make custom error message
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
