from django.contrib.auth.models import User

from rest_framework import viewsets


class UsersViewSet(viewsets.ModelViewSet):
    model = User
