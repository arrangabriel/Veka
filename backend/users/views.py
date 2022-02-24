from .serializers import ProfileSerializer, UserSerializer
from .models import Profile
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, viewsets
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

class ProfilesViewSet(viewsets.ModelViewSet):

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def create(self, request):
        username = request.POST['user.username']
        password = request.POST['user.password']
        email = request.POST['user.email']
        try:
            user = User.objects.create_user(username=username, email=email, password=password).save()
            return Response(status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginViewSet(viewsets.ModelViewSet):

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list' or self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def list(self, request):
        return Response(status=status.HTTP_200_OK)


class LogoutViewSet(viewsets.ViewSet):

    def create(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class EditViewSet(viewsets.ViewSet):

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list':
            permission_classes = [AllowAny]
        elif self.action == 'create':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    serializer = ProfileSerializer

    def create(self, request):
        bio = request.POST['bio']
        location = request.POST['location']
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
