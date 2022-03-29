from rest_framework import serializers
from .models import Listing


class ListingSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.user.username')
    interested_users = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='id')

    class Meta:
        model = Listing
        fields = ('id', 'owner', 'username', 'title', 'description',
                  'date', 'location', 'listing_type', 'event_type', 'price', 'amount', 'sold', 'interested_users')
        depth = 1

        extra_kwargs = {
            'id': {'read_only': True},
            'owner': {'read_only': True},
            'username': {'read_only': True},
            'sold': {'read_only': True},
            'interested_users': {'read_only': True},
        }
