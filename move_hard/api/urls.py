from django.conf.urls import patterns, url, include
from rest_framework import routers

from .views import UsersViewSet, MovesViewSet, GamesViewSet


router = routers.DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'moves', MovesViewSet)
router.register(r'games', GamesViewSet)


urlpatterns = patterns('',  # NOQA
    url(r'^', include(router.urls)),
)
