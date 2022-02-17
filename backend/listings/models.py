from tkinter import CASCADE
from django.db import models
from django.forms import BooleanField
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

    class Type(models.TextChoices):
        """
        Valid listing types.
        """
        BUY = 'b'
        SELL = 's'

    owner = models.ForeignKey(
        Profile, on_delete=models.CASCADE, blank=False, null=False)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=500)
    location = models.CharField(max_length=9, choices=Locations.choices)
    date = models.DateField(auto_now=True)
    type = models.CharField(max_length=1, choices=Type.choices)
    complete = models.BooleanField(default=False)
