from django.contrib.auth.models import User

data = {
    'username': 'testusername',
    'password': 'testpassword',
}


def create_test_user():
    return User.objects.create_user(**data)
