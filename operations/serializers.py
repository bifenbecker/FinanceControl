from rest_framework import serializers

from .models import Operation, CategoryToUser


class OperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryToUser
        exclude = ['user_id']
