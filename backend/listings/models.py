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

    class listingType(models.TextChoices):
        """
        Valid listing types.
        """
        BUY = 'b'
        SELL = 's'

    class eventType(models.TextChoices):
        """
        Valid event types.
        """
        THEATRE = 't'
        CONCERT = 'c'
        FESTIVAL = 'f'

    owner = models.ForeignKey(
        Profile, on_delete=models.CASCADE, blank=False, null=False)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=500)
    location = models.CharField(max_length=9, choices=Locations.choices)
    date = models.DateField()
    listing_type = models.CharField(max_length=1, choices=listingType.choices)
    event_type = models.CharField(max_length=2, choices=eventType.choices)
    complete = models.BooleanField(default=False)
    amount = models.PositiveIntegerField(default=1)
    # maybe add a max value
    price = models.PositiveBigIntegerField()
    interested_users = models.ManyToManyField(
        Profile, related_name='interested')
