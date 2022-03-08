from django.db import models
from users.models import Profile


class Listing(models.Model):
    """
    A user post (buy/sell).
    """
    class Locations(models.TextChoices):
        """
        Valid locations.
        """
        OSLO = 'oslo'
        TRONDHEIM = 'trondheim'
        STAVANGER = 'stavanger'
        BERGEN = 'bergen'

    class ListingType(models.TextChoices):
        """
        Valid listing types.
        """
        BUY = 'b'
        SELL = 's'

    class EventType(models.TextChoices):
        """
        Valid event types.
        """
        KONSERT = 'konsert'
        TEATER = 'teater'
        FESTIVAL = 'festival'

    owner = models.ForeignKey(
        Profile, on_delete=models.CASCADE, blank=False, null=False)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=500)
    location = models.CharField(max_length=9, choices=Locations.choices)
    date = models.DateField(auto_now=True)
    listing_type = models.CharField(max_length=1, choices=ListingType.choices)
    event_type = models.CharField(max_length=10, choices=EventType.choices)
    complete = models.BooleanField(default=False)
    # maybe add a max value
    price = models.PositiveBigIntegerField()
