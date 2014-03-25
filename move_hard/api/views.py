from django.contrib.auth.models import User

from rest_framework import viewsets

from .models import Move, Game


class UsersViewSet(viewsets.ModelViewSet):
    model = User


class MovesViewSet(viewsets.ModelViewSet):
    model = Move


class GamesViewSet(viewsets.ModelViewSet):
    model = Game
