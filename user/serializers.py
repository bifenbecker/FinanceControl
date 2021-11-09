from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict

from .models import User

from .utils import validate_data_for_user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'password', 'is_active']

    def validate(self, attrs):
        try:
            validate_data_for_user(attrs)
            return attrs
        except serializers.ValidationError:
            raise serializers.ValidationError

    @property
    def data(self):
        data = super(UserSerializer, self).data
        del data['password']
        return ReturnDict(data, serializer=self)


    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance