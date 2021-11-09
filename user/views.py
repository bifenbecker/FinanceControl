import datetime, json

from django.conf import settings
from django.http import HttpResponse
from rest_framework import status, serializers
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User, RefreshToken
from .producer import publish
from .serializers import UserSerializer
from .utils import gen_pair_tokens, get_payload, verify_user, check_user, validate_data_for_user


# Create your views here.
class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        pass

    def retrieve(self, request):
        user, code = check_user(request)
        response = Response(status=code)
        if user:
            serializer = UserSerializer(user)
            response.data = serializer.data
        return response

    def update(self, request):
        user, code = check_user(request)
        response = Response(status=code)
        if user:
            try:
                validate_data_for_user(request.data)
                for key in request.data:
                    if key in dir(user):
                        user.__dict__[key] = request.data[key]

                user.save()
                serializer = UserSerializer(user)
                response.data = serializer.data
                response.status_code = status.HTTP_202_ACCEPTED

            except serializers.ValidationError as e:
                response.data = {'msg': e.get_full_details()[0]['message']}
                response.status_code = status.HTTP_304_NOT_MODIFIED

            except Exception as e:
                response.data = {'msg': str(e)}
                response.status_code = status.HTTP_304_NOT_MODIFIED

        return response

    def destroy(self, request):
        user, code = check_user(request)
        response = Response(status=code)
        if user:
            user.delete()
            response.status_code = status.HTTP_202_ACCEPTED
        return response


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

        user = User.objects.filter(email=email).first()
        response = Response()
        response.status_code = verify_user(user)
        if user is None:
            response.data = {
                'email': 'User not found!'
            }

            return response

        if not user.check_password(password):
            response.data = {
                'password': 'Incorrect password!'
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


class VerifyTokenView(APIView):
    def post(self, request):
        print("POST")
        print(request.data)
        print(request.headers)
        return Response(status=status.HTTP_200_OK)
        # if verify_access_token(request.data.get('token')):
        #     return Response({
        #         'Result': 'OK'
        #     }, status=status.HTTP_200_OK)
        # else:
        #     return Response({
        #         'Result': 'error'
        #     }, status=status.HTTP_401_UNAUTHORIZED)

    def get(self, request):
        print("GET")
        print(request.data)
        print(request.headers)
        return Response(status=status.HTTP_200_OK)


def json_token(request):
    data = {
        "keys": [settings.JWKS]
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


def hello(request):
    publish()
    return HttpResponse('Hello world')
