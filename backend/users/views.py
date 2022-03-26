from .serializers import ProfileSerializer, UpdateProfileSerializer, UserSerializer, LoginSerializer
from .models import Profile
from rest_framework.response import Response
from rest_framework import status, viewsets
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
    queryset = Profile.objects.all()

    serializers = {
        'create': UserSerializer,
        'list': ProfileSerializer,
        'retrieve': ProfileSerializer,
        'update': UpdateProfileSerializer,
        'default': UserSerializer,
        'metadata': ProfileSerializer
    }

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list' or self.action == 'create' or self.action == 'metadata':
            permission_classes = [AllowAny]
        elif self.action == 'me' or self.action == 'retrieve':
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

    def update(self, request, *args, **kwargs):
        print(request)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    @action(methods=['get'], detail=False)
    def me(self, request):
        profile = request.user.id
        if not profile:
            return Response(data='Could not find a logged in profile', status=status.HTTP_403_FORBIDDEN)
        return Response(str(profile), status=status.HTTP_200_OK)


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
            except ValidationError:
                return Response(status=status.HTTP_400_BAD_REQUEST)
