from django.contrib import admin
from django.urls import path
from .views import OrderListViews, OrderDetailView, OrdersByUserIdView

urlpatterns = [
    path('', OrderListViews.as_view(), name="orders_list"),
    path('<int:order_id>/', OrderDetailView.as_view(), name="orders_detail"),
    path('user_id/<int:user_id>/', OrdersByUserIdView.as_view(), name='orders_by_user_id'),
]