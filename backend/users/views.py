from .serializers import ProfileSerializer, UpdateProfileSerializer, UserSerializer, LoginSerializer
from .models import Profile
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import action


class MultiSerializerViewSet(viewsets.ModelViewSet):
    serializers = {
        'default': None,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


class ProfilesViewSet(MultiSerializerViewSet):
    """
    Profile viewset.
    """
    queryset = Profile.objects.all()
    serializers = {
        'create': UserSerializer,
        'list': ProfileSerializer,
        'update': UpdateProfileSerializer,
        'retrieve': ProfileSerializer,
        'metadata': ProfileSerializer,
        'default': UserSerializer,
    }
    any = ['list', 'retrieve', 'create', 'metadata']
    authenticated = ['me', 'update']

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in self.any:
            permission_classes = [AllowAny]
        elif self.action in self.authenticated:
            permission_classes = [IsAuthenticated]
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

    @action(methods=['get'], detail=False)
    def me(self, request):
        profile = request.user.id
        if not profile:
            return Response(data='Could not find a logged in profile', status=status.HTTP_403_FORBIDDEN)
        return Response(str(profile), status=status.HTTP_200_OK)


class LoginViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = LoginSerializer

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
