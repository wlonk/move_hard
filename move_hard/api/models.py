from django.conf import settings
from django.db import models
from django.utils import timezone


class Move(models.Model):
    created = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=50)
    body = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='moves')
    game = models.ForeignKey('Game', related_name='moves')

    def __unicode__(self):
        return u"{} by {}".format(unicode(self.name), self.user.username)


class Game(models.Model):
    name = models.CharField(max_length=50)

    def __unicode__(self):
        return unicode(self.name)
