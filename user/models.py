import datetime

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)

    REQUIRED_FIELDS = []
    # USERNAME_FIELD = 'email'

    def update_refresh_token(self, token: str):
        prev_refresh_token = RefreshToken.objects.filter(user=self).first()
        if prev_refresh_token:
            prev_refresh_token.delete()

        RefreshToken.objects.create(
            token=token,
            user=self
        )


class RefreshToken(models.Model):
    token = models.CharField(max_length=512)
    created_time = models.DateTimeField(default=datetime.datetime.utcnow())
    end_time = models.DateTimeField(default=datetime.datetime.utcnow() + settings.JWT['REFRESH_TOKEN_LIFETIME'])
    user = models.OneToOneField('user.User', on_delete=models.CASCADE, related_name='refresh_token')

    def __str__(self):
        return self.token

    def is_valid(self):
        return datetime.datetime.utcnow().timestamp() < self.end_time.timestamp()
