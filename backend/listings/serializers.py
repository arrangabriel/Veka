from rest_framework import serializers

from .models import Listing


class ListingReadSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.user.username')
    interested_users = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='id')

    class Meta:
        model = Listing
        fields = ('id', 'owner', 'username', 'title', 'description',
                  'date', 'location', 'listing_type', 'event_type', 'price', 'interested_users')
        depth = 1


class ListingWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title', 'description', 'date', 'location',
                  'listing_type', 'event_type', 'price')
