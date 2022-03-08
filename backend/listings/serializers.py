from rest_framework import serializers
from .models import Listing


class ListingReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('owner', 'title', 'description',
                  'date', 'location', 'listing_type', 'event_type', 'price')


class ListingWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title', 'description', 'date', 'location',
                  'listing_type', 'event_type', 'price')
