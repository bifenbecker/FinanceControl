from rest_framework import serializers

from .models import Operation, CategoryToUser


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryToUser
        exclude = ['user_id']


class OperationSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    def create(self, validated_data):
        print(validated_data)
        print(validated_data['category'][0]['id'])
        data = {'category': validated_data['category'][0]}


    class Meta:
        model = Operation
        fields = '__all__'
