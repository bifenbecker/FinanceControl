from django.urls import path
from .views import *


urlpatterns = [
    path('api/register', RegisterView.as_view()),
    path('api/user', UserViewSet.as_view({
        'post': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('api/login', LoginView.as_view()),
    # path('api/user', UserView.as_view()),
    # path('api/logout', LogoutView.as_view()),
    path('api/verify-token', VerifyTokenView.as_view()),
    path('api/jwks.json', json_token),
    path('api/refresh-token', RefreshTokenView.as_view())
]
