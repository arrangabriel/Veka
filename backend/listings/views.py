from urllib import request
from .serializers import ListingReadSerializer, ListingWriteSerializer
from .models import Listing, Profile
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import action


class MultiSerializerViewSet(viewsets.ModelViewSet):
    serializers = {
        'default': None,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


class ListingViewSet(MultiSerializerViewSet):

    """
    Complete listing view.
    """
    serializers = {
        'create': ListingWriteSerializer,
        'list': ListingReadSerializer,
        'retrieve': ListingReadSerializer,
        'default': ListingReadSerializer,
        'metadata': ListingWriteSerializer
    }

    # Use to set permissions for operations
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        any = ['list', 'metadata', 'retrieve', 'interested']
        authenticated = ['create', 'show_interest']
        if self.action in any:
            permission_classes = [AllowAny]
        elif self.action in authenticated:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    model = Listing
    context_object_name = 'listings'
    queryset = Listing.objects.all()
    valid_orderings = (
        'date',
        'price',
        '-date',
        '-price',
    )

    # finn.no/?param1=katt&param2=pus&sort=-date

    def get_queryset(self):
        queryset = Listing.objects.all()
        params = self.request.query_params

        # The names of these parameters are mirrors of the database attributes
        # Possible options can be found in listings/models.py
        user = params.get('user')
        ignore_self = params.get('ignore_self')
        listing_type = params.getlist('listing_type')
        event_type = params.getlist('event_type')
        location = params.getlist('location')
        sort = params.get('sort')  # prefix value with - to sort descending

        # default order
        if sort is None or sort not in self.valid_orderings:
            sort = 'date'

        queryset = queryset.order_by(sort)

        if user is not None:
            queryset = queryset.filter(owner__id=user)

        if ignore_self is not None:
            queryset = queryset.exclude(owner__id=self.request.user.id)

        if listing_type:
            queryset = queryset.filter(listing_type__in=listing_type)

        if event_type:
            queryset = queryset.filter(event_type__in=event_type)

        if location:
            queryset = queryset.filter(location__in=location)

        return queryset

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        for listing in serializer.data:
            listing['interested'] = 'false'
            if request.user.is_authenticated:
                if request.user.id in listing['interested_users']:
                    listing['interested'] = 'true'
                # remove interested users field if user is not the listing owner
                if request.user.id != listing['owner']['id']:
                    del listing['interested_users']
            else:
                del listing['interested_users']
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        listing = serializer.data
        listing['interested'] = 'false'
        if request.user.is_authenticated:
            if request.user.id in listing['interested_users']:
                listing['interested'] = 'true'
                # remove interested users field if user is not the listing owner
            if request.user.id != listing['owner']['id']:
                del listing['interested_users']
        else:
            del listing['interested_user']
        return Response(listing)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # user id should always be valid, as create is only allowed when authenticated
        serializer.validated_data['owner'] = Profile.objects.get(
            user=request.user.id)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # TODO figure out IsAdminOrIsSelf: https://www.django-rest-framework.org/api-guide/routers/
    @action(methods=['get'], detail=True)
    def show_interest(self, request, pk=None):
        listing = self.queryset.get(id=pk)
        if listing.owner.user.id == request.user.id:
            return Response(data='Cannot show interest in ones own listing!', status=status.HTTP_403_FORBIDDEN)
        listing.interested_users.add(Profile.objects.get(
            user=request.user.id)
        )
        return Response(data='Interest shown succesfully!', status=status.HTTP_200_OK)

    # get interested users
    @action(methods=['get'], detail=True)
    def interested(self, request, pk=None):
        listing = self.queryset.get(id=pk)
        # uses username, but they are unique, so that's fine
        if (listing.owner.user != request.user) and not request.user.is_staff:
            return Response(data='Listing not owned by user', status=status.HTTP_401_UNAUTHORIZED)
        interested = listing.interested_users.all()
        interested_dict = {
            key.id: key.user.username for key in interested
        }
        return Response(data=interested_dict, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def mark_sold(self, request, pk=None):
        listing = self.queryset.get(id=pk)
        listing.sold = True
        listing.save()
        return Response(status=status.HTTP_200_OK)
