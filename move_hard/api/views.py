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
    MoveSerializer,
    GameSerializer,
)


User = get_user_model()


class AuthenticateView(views.APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserWithTokenSerializer(data=request.DATA)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_fields = ('username',)


class MovesViewSet(viewsets.ModelViewSet):
    queryset = Move.objects.all()
    serializer_class = MoveSerializer
    lookup_field = 'slug'
    filter_fields = ('slug',)


class GamesViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = 'slug'
    filter_fields = ('slug',)
