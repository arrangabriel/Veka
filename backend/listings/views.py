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
        if self.action == 'list' or self.action == 'metadata' or self.action == 'retrieve':
            permission_classes = [AllowAny]
        elif self.action == 'create':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    model = Listing
    context_object_name = 'listings'
    #queryset = Listing.objects.all()
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

        if listing_type:
            queryset = queryset.filter(listing_type__in=listing_type)

        if event_type:
            queryset = queryset.filter(event_type__in=event_type)

        if location:
            queryset = queryset.filter(location__in=location)

        return queryset

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
    @action(methods=['get'], detail=True, permission_classes=[IsAuthenticated])
    def show_interest(self, request, pk=None):
        listing = self.queryset.get(id=pk)
        if listing.owner.user.id == request.user.id:
            return Response(data='Cannot show interest in ones own listing!', status=status.HTTP_403_FORBIDDEN)
        listing.interested_users.add(Profile.objects.get(
            user=request.user.id)
        )
        return Response(data='Interest shown succesfully!', status=status.HTTP_200_OK)

    # get interested users
    @action(methods=['get'], detail=True, permission_classes=[IsAuthenticated])
    def interested(self, request, pk=None):
        listing = self.queryset.get(id=pk)
        # uses username, but they are unique, so that's fine
        if listing.owner.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        interested = listing.interested_users.all()
        interested_dict = {
            key.id: key.user.username for key in interested
        }
        return Response(data=interested_dict, status=status.HTTP_200_OK)
