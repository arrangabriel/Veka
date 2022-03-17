from urllib import response
from .serializers import ProfileSerializer, UserSerializer, LoginSerializer
from .models import Profile
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, viewsets
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny


class MultiSerializerViewSet(viewsets.ModelViewSet):
    serializers = {
        'default': None,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


class ProfilesViewSet(MultiSerializerViewSet):

    queryset = Profile.objects.all()

    serializers = {
        'create': UserSerializer,
        'list': ProfileSerializer,
        'retrieve': ProfileSerializer,
        'default': ProfileSerializer,
        'metadata': ProfileSerializer,
        'detail': ProfileSerializer
    }

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list' or self.action == 'create' or self.action == 'metadata':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    def create(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        try:
            User.objects.create_user(
                username=username, email=email, password=password).save()
            return Response(status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)


class LoginViewSet(viewsets.ModelViewSet):

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    serializer_class = LoginSerializer
    queryset = User.objects.all()

    def create(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class LogoutViewSet(viewsets.ViewSet):

    def create(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class EditViewSet(viewsets.ModelViewSet):

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

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

    def update(self, request, pk):

        requestUser = request.data.get('user.username')
        loggedInUser = request.user.username

        if (requestUser != loggedInUser):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        bio = request.data.get('bio')
        location = request.data.get('location')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user.id)
            if (bio):
                profile.bio = bio
            if (location):
                profile.location = location
            if (first_name):
                profile.first_name = first_name
            if (last_name):
                profile.last_name = last_name
            try:
                profile.full_clean()
                profile.save()
                return Response(status=status.HTTP_200_OK)
            except ValidationError as e:
                # TODO: Make custom error message
                return Response(status=status.HTTP_400_BAD_REQUEST)
