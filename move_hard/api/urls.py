from django.conf.urls import patterns, url, include
from rest_framework import routers

from .views import UsersViewSet


router = routers.DefaultRouter()
router.register(r'users', UsersViewSet)


urlpatterns = patterns('',  # NOQA
    url(r'^', include(router.urls)),
)
