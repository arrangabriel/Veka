from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status


class UserTests(APITestCase):

    client = APIClient()

    def test_get_profiles_list(self):
        url = reverse('profiles-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_register_profile(self):
        url = reverse('profiles-list')
        data = {'password': 'testpassword123',
                'username': 'testusername', 'email': 'test@email.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # should not be able to register the same profile twice
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login(self):
        url = reverse('login-list')
        User.objects.create_user(
            username='testusername', password='testpassword123')
        valid_data = {'password': 'testpassword123',
                      'username': 'testusername'}
        response = self.client.post(url, valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # should not be able to login to an unregistered user
        invalid_data = {'password': 'testpassword123',
                        'username': 'invalidusername'}
        response = self.client.post(url, invalid_data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
