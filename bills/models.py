import uuid as uuid
from typing import Optional

from django.db import models

from operations.models import Operation, OperationToBill, CategoryToUser
from operations.serializers import OperationSerializer


class Bill(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user_id = models.PositiveIntegerField(blank=False, verbose_name="ID User")
    name = models.CharField(max_length=64, blank=False, verbose_name="Name of bill")
    balance = models.DecimalField(default=0.0, max_digits=9, decimal_places=2, verbose_name="Balance")

    def add_operation(self, category: Optional[str], description: Optional[str] = "",
                      value: Optional[float] = 0.0, isIncome: Optional[bool] = True) -> Optional[Operation]:
        """
            Valiadte data and create operation
            :param user_id: ID user
            :param bill_uuid: UUID bill
            :param category: Category of operation
            :param description: Description
            :param value: Value
            :param isIncome:
            :return: Operation
            """

        Category = CategoryToUser.objects.filter(user_id=self.user_id, name=category).first()
        if not Category:
            Category = Category.objects.create(user_id=self.user_id, name=category)


        serializer_operation = OperationSerializer(data={
            'user_id': self.user_id,
            'category': Category.id,
            'description': description,
            'isIncome': isIncome,
            'value': value
        })

        if serializer_operation.is_valid():
            operation = serializer_operation.save()
            operation_to_bill = OperationToBill.objects.create(
                operation=operation,
                bill=self
            )
            return operation
        else:
            raise Exception("No valid data")
