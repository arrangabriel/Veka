from curses.ascii import US
from django.contrib.auth.models import User

data = {
    'username': 'testusername',
    'password': 'testpassword',
}


def create_test_user():
    User.objects.create_user(**data)
