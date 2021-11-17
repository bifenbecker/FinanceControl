from rest_framework import status
from rest_framework import viewsets

from .models import Bill
from .serializers import BillSerializer
from utils import all_methods_get_payload, get_bill, get_user_id_from_payload


@all_methods_get_payload
class BillViewSet(viewsets.ViewSet):

    @get_user_id_from_payload
    def list(self, request, **kwargs):
        """
        List banks
        """

        user_banks = Bill.objects.filter(user_id=kwargs['user_id']).all()
        serializer = BillSerializer(user_banks, many=True)
        return serializer.data, status.HTTP_200_OK

    @get_bill
    def retrieve(self, request, **kwargs):
        """
        Get bank
        """
        serializer = BillSerializer(kwargs['bank'])
        return serializer.data, status.HTTP_200_OK

    @get_bill
    def update(self, request, **kwargs):
        """
        Update bank
        """
        new_bank_data = request.data
        new_bank_data['user_id'] = kwargs['user_id']
        bank = kwargs['bill']
        serializer = BillSerializer(instance=bank)
        serializer.update(bank, new_bank_data)
        return serializer.data, status.HTTP_202_ACCEPTED

    @get_bill
    def destroy(self, request, **kwargs):
        """
        Delete bank
        """
        bank = kwargs['bill']
        bank.delete()
        return {'msg': 'Bill was deleted'}, status.HTTP_202_ACCEPTED

    @get_user_id_from_payload
    def create(self, request, **kwargs):
        """
        Create bank
        """
        bank_data = request.data
        bank_data.update({'user_id': kwargs['user_id']})
        serialiser = BillSerializer(data=bank_data)
        serialiser.is_valid(raise_exception=True)
        serialiser.save()
        return serialiser.data, status.HTTP_202_ACCEPTED

