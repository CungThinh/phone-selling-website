from django.urls import path
from .views import CreateCheckoutSessionView, StripeWebhookView, PaymentListView, PaymentDetailView

urlpatterns = [
    path('create-checkout-session/<int:order_id>/', CreateCheckoutSessionView.as_view(), name='create-checkout-session'),
    path('stripe-webhook/', StripeWebhookView.as_view(), name='stripe-webhook'),
    path('', PaymentListView.as_view(), name="payment_list"),
    path('<int:payment_id>/', PaymentDetailView.as_view(), name="payment_detail"),
]