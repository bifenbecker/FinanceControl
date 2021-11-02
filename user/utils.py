import datetime
import hashlib
import jwt
import random
import re
import string

from django.conf import settings
from rest_framework import status, serializers

from .models import User


def verify_access_token(token):
    """
    Check is valid access token
    """

    if not token:
        return False

    key = settings.JWT['SIGNING_KEY_ACCESS']
    try:
        payload = jwt.decode(token, key,
                             algorithms=[settings.JWT['ALGORITHM']], options={'verify_exp': False})
    except Exception:
        return False

    # May be need to delete
    if datetime.datetime.utcnow().timestamp() > payload['exp']:
        return False

    return True


def gen_pair_tokens(user):
    """
    Get access token and refresh token for user
    """

    payload_for_access_token = {
        'id': user.id,
        'exp': (datetime.datetime.utcnow() + settings.JWT['ACCESS_TOKEN_LIFETIME']).timestamp(),
        'iat': datetime.datetime.utcnow().timestamp()
    }

    refresh_token = hashlib.md5(
        f'{user.id}{generate_random_string(settings.JWT["LENGTH_STRING_REFRESH_HASH"])}'.encode()).hexdigest()

    access_token = jwt.encode(payload_for_access_token, settings.JWT['SIGNING_KEY_ACCESS'],
                              algorithm=settings.JWT['ALGORITHM'])

    user.update_refresh_token(refresh_token)

    return (access_token, refresh_token)


def get_payload(token):
    """
    Get payload of access token
    :param token: access token
    :return: dict payload
    """

    if not verify_access_token(token):
        raise Exception('No verify token')

    try:
        payload = jwt.decode(token,
                             settings.JWT['SIGNING_KEY_ACCESS'],
                             algorithms=settings.JWT['ALGORITHM'],
                             options={'verify_exp': False}
                             )
        return payload
    except:
        raise Exception('Error in payload')


def validate_email(email: str) -> bool:
    """
    Check email
    :param email: str
    :return: True or False
    """

    pattern = r'[a-zA-Z0-9]+[@][a-z\.]+[a-z]{2,4}'
    if re.match(pattern, email):
        return True


def generate_random_string(length: int) -> str:
    """
    Generate random string
    :param length: Length of random string
    :return: string
    """
    letters = string.ascii_lowercase
    rand_string = ''.join(random.choice(letters) for _ in range(length))
    return rand_string


def verify_user(user):
    """
    Check status of user
    :params: user - User
    :return: status_code
    """

    if not user:
        return status.HTTP_404_NOT_FOUND
    elif not user.is_active:
        return status.HTTP_423_LOCKED

    return status.HTTP_200_OK


def check_user(request):
    token = request.data.get('access_token')

    if not verify_access_token(token):
        return (None, status.HTTP_401_UNAUTHORIZED)

    payload = get_payload(token)

    user = User.objects.filter(id=payload['id']).first()
    if not user or not user.is_active:
        return (None, verify_user(user))

    return user, status.HTTP_200_OK


def validate_data_for_user(attrs):
    """

    """
    email = attrs.get('email')
    name = attrs.get('name')
    password = attrs.get('password')
    username = attrs.get('username')

    if User.objects.filter(email=email).exists():
        raise serializers.ValidationError('Email is already exist')

    if User.objects.filter(username=username).exists():
        raise serializers.ValidationError('Username is already exist')

    if name and len(name) < 4:
        raise serializers.ValidationError('Name is too short')

    if username and len(username) < 4:
        raise serializers.ValidationError('Username is too short')

    if password and len(password) < 4:
        raise serializers.ValidationError('Password is too easy')

    if email and not validate_email(email):
        raise serializers.ValidationError('Incorrect email')

    return True
