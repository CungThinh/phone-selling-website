from Users.models import User
from django.db import models


class Order(models.Model):
    payment_method = models.CharField(max_length=255)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_price = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(null=True, blank=True)

    def calculate_total_price(self):
        return self.total_price + self.shipping_price

    def get_total_quantity(self):
        return sum(item.quantity for item in self.order_items.all())

    def __str__(self):
        return f'Order {self.id} by User {self.user_id}'


class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    name = models.CharField(max_length=255)
    product_id = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='shipping_address')
    full_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.address
