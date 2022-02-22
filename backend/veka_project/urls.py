"""veka_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from users import views as userViews
from listings import views as listingViews

router = routers.DefaultRouter()
router.register(r'listings2', listingViews.ListingViewSet, basename='listing')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    re_path(r'^api/profiles/$', userViews.profiles_list),
    re_path(r'^api/registration/$', userViews.register_user),
    re_path(r'^api/login/$', userViews.login_user),
    re_path(r'^api/bio/$', userViews.edit_bio),
    re_path(r'^api/logout/$', userViews.logout_user),
]
