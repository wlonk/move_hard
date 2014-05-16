from django.contrib.auth import get_user_model

from rest_framework import (
    status,
    views,
    viewsets,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import (
    Game,
    Move,
)
from .serializers import (
    UserSerializer,
    UserWithTokenSerializer,
)


class AuthenticateView(views.APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserWithTokenSerializer(data=request.DATA)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsersViewSet(viewsets.ModelViewSet):
    model = get_user_model()
    serializer_class = UserSerializer


class MovesViewSet(viewsets.ModelViewSet):
    model = Move
    lookup_field = 'slug'


class GamesViewSet(viewsets.ModelViewSet):
    model = Game
    lookup_field = 'slug'
