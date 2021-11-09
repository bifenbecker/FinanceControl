import datetime
import hashlib
import random
import re
import string
import time
from typing import Optional, Union

from django.conf import settings
from jwcrypto import jwk, jwt
from rest_framework import status, serializers

from .models import User


def verify_access_token(token: str) -> Union[dict, None]:
    """
    Check is valid access token
    """

    if not token:
        raise Exception("No token")

    key = settings.JWKS
    try:
        ET = jwt.JWT(key=key, jwt=token)
    except jwt.JWTExpired:
        raise Exception("Token expired")
    except Exception as e:
        raise e

    claims = ET.claims
    if claims['iss'] != settings.ISSUER:
        raise Exception("Incorrect issuer")

    return claims


def gen_pair_tokens(user):
    """
    Get access token and refresh token for user
    """

    payload_for_access_token = {
        'id': user.id,
        'exp': int(time.time()) + int(datetime.timedelta(minutes=10).seconds),
        'iat': time.time(),
        'iss': settings.ISSUER,
        'aud': settings.AUDIENCES
    }

    refresh_token = hashlib.md5(
        f'{user.id}{generate_random_string(settings.JWT["LENGTH_STRING_REFRESH_HASH"])}'.encode()).hexdigest()

    key = jwk.JWK(**settings.JWKS)
    token = jwt.JWT(header={"alg": "HS256"}, claims=payload_for_access_token)

    token.make_signed_token(key)
    access_token = token.serialize()
    # access_token = jwt.encode(payload_for_access_token, settings.JWT['SIGNING_KEY_ACCESS'],
    #                           algorithm=settings.JWT['ALGORITHM'])

    user.update_refresh_token(refresh_token)

    return (access_token, refresh_token)


def get_payload(token: str) -> Union[dict, None]:
    """
    Get payload of access token
    :param token: access token
    :return: dict payload
    """

    try:
        payload = verify_access_token(token)
        return payload
    except Exception as e:
        raise e


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
    return user if user else None, verify_user(user)


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
