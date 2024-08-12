from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Order
from .serializers import OrderSerializer
from .signals import order_confirmed
from Users.permissions import IsOwnerOrAdmin


class OrderListViews(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={200: OrderSerializer(many=True)}, tags=['Order'])
    def get(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response({'detail': "You do not have permission to perform this action"},
                            status=status.HTTP_401_UNAUTHORIZED)
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=OrderSerializer, responses={201: OrderSerializer}, tags=['Order'])
    def post(self, request, *args, **kwargs):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save(user=request.user)
            order_confirmed.send(sender=order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailView(APIView):
    permission_classes = [IsOwnerOrAdmin]

    @swagger_auto_schema(responses={200: OrderSerializer}, tags=['Order'])
    def get(self, request, order_id):
        order = get_object_or_404(Order, id=order_id)
        self.check_object_permissions(request, order)  # Kiểm tra quyền truy cập đối với đối tượng cụ thể

        serializer = OrderSerializer(order)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=OrderSerializer, responses={200: OrderSerializer}, tags=['Order'])
    def put(self, request, order_id):
        order = get_object_or_404(Order, id=order_id)
        self.check_object_permissions(request, order)  # Kiểm tra quyền truy cập đối với đối tượng cụ thể

        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={204: 'No Content'}, tags=['Order'])
    def delete(self, request, order_id):
        order = get_object_or_404(Order, id=order_id)
        self.check_object_permissions(request, order)  # Kiểm tra quyền truy cập đối với đối tượng cụ thể

        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrdersByUserIdView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={200: OrderSerializer(many=True)}, tags=['Order'])
    def get(self, request, user_id):
        user = request.user
        if user_id == user.id:
            orders = Order.objects.filter(user_id=user_id)
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data)
        return Response({'detail': 'You do not have permissions to perform this action'},
                        status=status.HTTP_403_FORBIDDEN)
