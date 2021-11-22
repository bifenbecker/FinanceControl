from rest_framework import serializers

from .models import Operation, CategoryToUser


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryToUser
        exclude = ['user_id']


class OperationSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = Operation
        fields = ['uuid', 'description', 'date', 'isIncome', 'value', 'category']
