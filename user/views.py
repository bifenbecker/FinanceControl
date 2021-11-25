import datetime
import json

from django.conf import settings
from django.http import HttpResponse
from rest_framework import status, serializers
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User, RefreshToken, CURRENCY_CHOICES
from .serializers import UserSerializer, SettingsSerializer
from .utils import gen_pair_tokens, verify_user, validate_data_for_user, all_methods_check_token


@all_methods_check_token
class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        pass

    def retrieve(self, request, *args, **kwargs):
        serializer = UserSerializer(kwargs['user'])
        return serializer.data, status.HTTP_200_OK

    def update(self, request, *args, **kwargs):
        user = kwargs['user']
        if user.is_active:
            try:
                validate_data_for_user(request.data)
                for key in request.data:
                    if key in dir(user):
                        user.__dict__[key] = request.data[key]

                user.save()
                serializer = UserSerializer(user)
                return serializer.data, status.HTTP_202_ACCEPTED

            except serializers.ValidationError as e:
                return {'msg': e.get_full_details()[0]['message']}, status.HTTP_304_NOT_MODIFIED

            except Exception as e:
                return {'msg': str(e)}, status.HTTP_304_NOT_MODIFIED
        else:
            return {'msg': 'User was blocked'}, status.HTTP_423_LOCKED

    def destroy(self, request, *args, **kwargs):
        user = kwargs['user']
        user.delete()
        return {'msg': 'User was deleted'}, status.HTTP_202_ACCEPTED


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        response = Response()
        user = User.objects.filter(email=email).first()

        if user is None:
            response.data = {
                'email': 'User not found!'
            }
            response.status_code = status.HTTP_404_NOT_FOUND
            return response

        if not user.check_password(password):
            response.data = {
                'password': 'Incorrect password!'
            }
            response.status_code = status.HTTP_400_BAD_REQUEST
            return response

        verified_user, response.status_code = verify_user(user)

        if not verified_user:
            response.data = {
                'msg': 'No user'
            }
            return response

        access_token, refresh_token = gen_pair_tokens(user)
        user.last_login = datetime.datetime.utcnow()
        user.save()
        response.data = {
            'access_token': access_token,
            'refresh_token': refresh_token
        }
        return response


def json_token(request):
    # key = jwk.JWK.generate(kty='RSA', size=2048, kid=settings.SECRET_KEY)
    data = {
        "keys": [settings.KEY.export_public(as_dict=True)]
    }
    return HttpResponse(json.dumps(data))


class RefreshTokenView(APIView):
    def post(self, request):
        token = request.data.get('refresh_token')
        refresh_token = RefreshToken.objects.filter(token=token).first()
        if refresh_token and refresh_token.is_valid():
            user = refresh_token.user
            refresh_token.delete()
            access_token, refresh_token = gen_pair_tokens(user)
            return Response({
                'access_token': access_token,
                'refresh_token': refresh_token
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'No verify token'
            }, status=status.HTTP_403_FORBIDDEN)


class CurrencyList(APIView):
    def get(self, request):
        data = []
        for cur in CURRENCY_CHOICES:
            data.append({'name': cur[0], 'char': cur[1]})

        return Response(data)


@all_methods_check_token
class UserSettingsView(viewsets.ViewSet):
    def get(self, request, *args, **kwargs):
        user = kwargs['user']
        user_settings_serializer = SettingsSerializer(instance=user.settings)
        return user_settings_serializer.data, status.HTTP_200_OK

    def update(self, request, *args, **kwargs):
        user = kwargs['user']
        user_settings = user.settings
        if 'currency' in request.data:
            cur = request.data['currency']
            try:
                user_settings.set_currency(cur)
            except Exception as e:
                return str(e), status.HTTP_400_BAD_REQUEST

        user_settings_serializer = SettingsSerializer(instance=user_settings)
        return user_settings_serializer.data, status.HTTP_200_OK

