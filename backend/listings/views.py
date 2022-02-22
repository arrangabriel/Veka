from .serializers import ListingSerializer
from .models import Listing, Profile
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET', 'POST'])
def listings(request):
    """
    Listing api, allows GET and POST. 
    """
    # Gets all listings
    # TODO - filtering, adding options to the request i.e. location
    if request.method == 'GET':
        data = Listing.objects.all()
        serializer = ListingSerializer(
            data, context={'request': request}, many=True)
        return Response(serializer.data)

    # Create a listing
    elif request.method == 'POST':
        # Do not allow creation if user is not logged in
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            # Set owner field to be profile of session user
            data["owner"] = Profile.objects.get(user=request.user.id)
            Listing.objects.create(**serializer.validated_data).save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_400_BAD_REQUEST)
