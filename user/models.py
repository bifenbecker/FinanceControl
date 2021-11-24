import datetime

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

CURRENCY_CHOICES = (
    ('USD', '$'),
    ('EUR', '€'),
    ('RUB', '₽'),
    ('BYN', 'Br'),
    ('BTC', 'BTC')
)


# region Models
class User(AbstractUser):
    """
    User model
    """
    name = models.CharField(max_length=255, verbose_name="Name of user")
    email = models.CharField(max_length=255, unique=True, verbose_name="Email")
    password = models.CharField(max_length=255, verbose_name="Password")
    username = models.CharField(max_length=255, unique=True, verbose_name="Username")

    REQUIRED_FIELDS = []

    def update_refresh_token(self, token: str):
        prev_refresh_token = RefreshToken.objects.filter(user=self).first()
        if prev_refresh_token:
            prev_refresh_token.delete()

        RefreshToken.objects.create(
            token=token,
            user=self
        )


class Settings(models.Model):
    """
    Settings of user
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings', verbose_name="User settings")
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='USD')

    @property
    def data(self):
        return {
            'currency': self.currency
        }


class RefreshToken(models.Model):
    token = models.CharField(max_length=512)
    created_time = models.DateTimeField(default=datetime.datetime.utcnow())
    end_time = models.DateTimeField(default=datetime.datetime.utcnow() + settings.JWT['REFRESH_TOKEN_LIFETIME'])
    user = models.OneToOneField('user.User', on_delete=models.CASCADE, related_name='refresh_token')

    def __str__(self):
        return self.token

    def is_valid(self):
        return datetime.datetime.utcnow().timestamp() < self.end_time.timestamp()
# endregion
