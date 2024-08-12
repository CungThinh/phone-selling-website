from django.utils import timezone
from rest_framework import serializers

from .models import Order, OrderItems, ShippingAddress


class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['product_id', 'name', 'quantity', 'price']


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ['full_name', 'address', 'city', 'phone']


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemsSerializer(many=True)
    shipping_address = ShippingAddressSerializer()

    class Meta:
        model = Order
        exclude = ['user']

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')
        shipping_address_data = validated_data.pop('shipping_address')

        order = Order.objects.create(**validated_data)

        for item_data in order_items_data:
            OrderItems.objects.create(order=order, **item_data)

        ShippingAddress.objects.create(order=order, **shipping_address_data)

        return order

    def update(self, instance, validated_data):
        instance.payment_method = validated_data.get('payment_method', instance.payment_method)
        instance.is_paid = validated_data.get('is_paid', instance.is_paid)
        instance.paid_at = timezone.now() if validated_data.get('is_paid', False) and not instance.is_paid else None
        instance.shipping_price = validated_data.get('shipping_price', instance.shipping_price)
        instance.is_delivered = validated_data.get('is_delivered', instance.is_delivered)
        instance.delivered_at = timezone.now() if validated_data.get('is_delivered',
                                                                     False) and not instance.is_delivered else None
        instance.save()

        return instance
