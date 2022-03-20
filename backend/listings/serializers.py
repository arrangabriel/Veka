from rest_framework import serializers

from .models import Listing


class ListingReadSerializer(serializers.ModelSerializer):
    #owner = ProfileSerializer()
    username = serializers.ReadOnlyField(source='owner.user.username')

    class Meta:
        model = Listing
        # TODO this needs to return ID
        fields = ('id', 'owner', 'username', 'title', 'description',
                  'date', 'location', 'listing_type', 'event_type', 'price')
        depth = 1


class ListingWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title', 'description', 'date', 'location',
                  'listing_type', 'event_type', 'price')
