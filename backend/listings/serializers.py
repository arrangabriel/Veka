from rest_framework import serializers
from .models import Listing


class ListingReadSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    class Meta:
        model = Listing
        # TODO this needs to return ID
        fields = ('id', 'owner', 'title', 'description',
                  'date', 'location', 'listing_type', 'event_type', 'price')
=======
    username = serializers.ReadOnlyField(source='owner.user.username')
    interested_users = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='id')

    class Meta:
        model = Listing
        fields = ('id', 'owner', 'username', 'title', 'description',
                  'date', 'location', 'listing_type', 'event_type', 'price', 'amount', 'interested_users')
        depth = 1
>>>>>>> b1d0eaf484243eff556bf257e7e3dd8d29fd227d


class ListingWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title', 'description', 'date', 'location',
                  'listing_type', 'event_type', 'amount', 'price')
