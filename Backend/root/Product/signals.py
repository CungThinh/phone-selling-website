from Order.signals import order_confirmed
from django.dispatch import receiver
from Order.models import OrderItems
from Product.models import Product
from Order.models import Order

@receiver(order_confirmed)
def update_inventory(sender: Order, **kwargs):
    order_items = OrderItems.objects.filter(order=sender)
    for item in order_items:
        product = Product.objects.get(id=item.product_id)
        product.inventory -= item.quantity
        product.save()
    print("Successfully update")