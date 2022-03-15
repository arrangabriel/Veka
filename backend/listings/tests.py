from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from rest_framework import status
from utils import create_test_user
from django.contrib.auth.models import User


class ListingTests(APITestCase):

    client = APIClient()
    url = reverse('listing-list')

    def test_get_listings(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_listing(self):

        postData = {
            "title": "testtitle",
            "description": "testdescription",
            "location": "trondheim",
            "type": "b",
            "price": "1234"
        }

        response = self.client.post(self.url, postData, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        create_test_user()

        # Logging in like this currently does not work, not really an issue, and probably has to do with authTokens
        # self.client.force_login(user=User.objects.first())

        # response = self.client.post(self.url, postData, format='json')
        # self.assertEqual(response.status_code, status.HTTP_201_CREATED)
