from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from rest_framework import status


class ListingTests(APITestCase):

    client = APIClient()

    def test_get_listings_list(self):
        url = reverse('listing-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
