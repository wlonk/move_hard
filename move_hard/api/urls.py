from django.conf.urls import patterns, url, include
from rest_framework import routers

from .views import (
    AuthenticateView,
    GamesViewSet,
    MovesViewSet,
    UsersViewSet,
)


router = routers.DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'moves', MovesViewSet)
router.register(r'games', GamesViewSet)


urlpatterns = patterns('',  # NOQA
    url(
        r'^api-token-auth/$',
        AuthenticateView.as_view(),
        name='api-token-auth'
    ),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^', include(router.urls)),
)
