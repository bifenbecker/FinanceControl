from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from utils import all_methods_get_payload, get_operation, get_bill, get_user_id_from_payload
from .models import Operation, CategoryToUser
from .serializers import OperationSerializer, CategorySerializer


@all_methods_get_payload(viewsets.ViewSet)
class OperationViewSet:
    @get_user_id_from_payload
    def list(self, request, *args, **kwargs):
        operations = Operation.objects.filter(category__user_id=kwargs['user_id']).all()
        serializer = OperationSerializer(operations, many=True)
        return serializer.data, status.HTTP_200_OK

    @get_operation
    def retrieve(self, request, *args, **kwargs):
        serializer = OperationSerializer(instance=kwargs['operation'])
        return serializer.data, status.HTTP_200_OK

    @get_operation
    def update(self, request, *args, **kwargs):
        operation = kwargs['operation']
        bill = operation.to_bill.bill
        prev_operation = OperationSerializer(instance=operation)
        new_data = prev_operation.data
        new_data.update(request.data)
        serializer = OperationSerializer(instance=operation, data=new_data)
        if not serializer.is_valid():
            return {
                       'msg': 'Not valid data'
                   }, status.HTTP_400_BAD_REQUEST
        serializer.save()
        bill.update_balance()
        return serializer.data, status.HTTP_200_OK

    @get_operation
    def destroy(self, request, *args, **kwargs):
        operation = kwargs['operation']
        operation.delete()
        bill = operation.to_bill.bill
        bill.update_balance()

        return {
                   'msg': 'Operation was deleted'
               }, status.HTTP_200_OK

    @get_bill
    def create(self, request, *args, **kwargs):
        bill = kwargs['bill']
        try:
            operation = bill.add_operation(**request.data)
        except Exception as e:
            return str(e), status.HTTP_400_BAD_REQUEST
        serializer = OperationSerializer(instance=operation)
        return serializer.data, status.HTTP_200_OK


@all_methods_get_payload(viewsets.ViewSet)
class CategoryListView:
    @get_user_id_from_payload
    def list(self, request, *args, **kwargs):
        categories = CategoryToUser.objects.filter(user_id=kwargs['user_id'])
        serializer = CategorySerializer(categories, many=True)
        return serializer.data, status.HTTP_200_OK


@all_methods_get_payload(viewsets.ViewSet)
class CategoryView:
    @get_user_id_from_payload
    def create(self, request, *args, **kwargs):
        isIncome = request.data.get('isIncome', True)

        serializer = CategorySerializer(data={"name": request.data.get("name", ""), "isIncome": isIncome, "user_id": kwargs['user_id']})
        if serializer.is_valid(raise_exception=False):
            serializer.save(user_id=kwargs['user_id'])
            return serializer.data, status.HTTP_200_OK
        else:
            return "Not valid data", status.HTTP_400_BAD_REQUEST


@all_methods_get_payload(APIView)
class ListOperationsOfBill:
    @get_bill
    def get(self, request, *args, **kwargs):
        bill = kwargs['bill']
        bill.update_balance()
        operations = [operation_to_bill.operation for operation_to_bill in bill.operations.all()]
        serializer = OperationSerializer(operations, many=True)
        return serializer.data, status.HTTP_200_OK
