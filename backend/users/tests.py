#from django.test import TestCase, Client
from rest_framework.test import APITestCase
from django.urls import path
from users import views
from django.contrib.auth.models import User
from rest_framework import status

class UserTests(APITestCase):

    def test_get_profiles_list(self):
        url = '/api/profiles/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_register_profile(self):
            url = '/api/registration/'
            data = {'password': 'testpassword123', 'username': 'testusername', 'email': 'test@email.com'}
            response = self.client.post(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

            # should not be able to register the same profile twice
            response = self.client.post(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login(self):
            url = '/api/login/'
            User.objects.create_user(username='testusername', password='testpassword123', email='test@email.com')
            valid_data = {'password': 'testpassword123', 'username': 'testusername'}
            response = self.client.post(url, valid_data, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            # should not be able to login to an unregistered user
            invalid_data = {'password': 'testpassword123', 'username': 'invalidusername'}
            response = self.client.post(url, invalid_data, format='json')
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
