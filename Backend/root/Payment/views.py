import logging
from decimal import Decimal

import stripe
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Payment
from .serializers import PaymentSerializer
from Order.models import Order

stripe.api_key = settings.STRIPE_SECRET_KEY


# Create your views here.
class CreateCheckoutSessionView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['Payment'])
    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
            order_items = order.order_items.all()

            line_items = []
            for item in order_items:
                line_items.append({
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': item.name,
                        },
                        'unit_amount': int(Decimal(item.price) * 100),  # Chuyển đổi giá sang cents
                    },
                    'quantity': item.quantity,
                })

            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,
                mode='payment',
                metadata={
                    'order_id': order_id  # Thêm order_id vào metadata
                },
                success_url=settings.SITE_URL + '/payment/success',
                cancel_url=settings.SITE_URL + '/payment/fail',
            )

            payment = Payment.objects.create(
                order=order,
                amount=order.total_price,
                stripe_charge_id=checkout_session.id,
                status='pending'
            )

            return Response({
                'id': checkout_session.id,
                'url': checkout_session.url,
                'paymentId': payment.id,
            }, status=status.HTTP_201_CREATED)

        except Order.DoesNotExist:
            return Response({'error': 'Order does not exist'}, status=status.HTTP_404_NOT_FOUND)

        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class StripeWebhookView(APIView):

    @swagger_auto_schema(tags=['Payment'])
    def post(self, request):
        payload = request.body
        sig_header = request.META['HTTP_STRIPE_SIGNATURE']
        endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.SignatureVerificationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Xử lý sự kiện từ Stripe
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            stripe_charge_id = session['id']

            try:
                payment = Payment.objects.get(stripe_charge_id=stripe_charge_id)
                payment.status = 'succeeded'
                payment.save()

                order = payment.order
                order.is_paid = True
                order.paid_at = timezone.now()
                order.save()

            except Payment.DoesNotExist:
                logging.error(f"Payment with stripe_charge_id {stripe_charge_id} does not exist.")
                return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_200_OK)


class PaymentListView(APIView):
    permission_classes = [IsAdminUser]

    @swagger_auto_schema(responses={200: PaymentSerializer(many=True)}, tags=['Payment'])
    def get(self, request):
        payment = Payment.objects.all()
        serializer = PaymentSerializer(payment, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PaymentDetailView(APIView):
    permission_classes = [IsAuthenticated]  # Đảm bảo người dùng đã đăng nhập

    @swagger_auto_schema(responses={200: PaymentSerializer}, tags=['Payment'])
    def get(self, request, payment_id):
        payment = get_object_or_404(Payment, id=payment_id)
        if payment.order.user != request.user and not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = PaymentSerializer(payment)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=PaymentSerializer, responses={200: PaymentSerializer}, tags=['Payment'])
    def put(self, request, payment_id):
        payment = get_object_or_404(Payment, id=payment_id)
        if payment.order.user != request.user and not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = PaymentSerializer(payment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={204: 'No Content'}, tags=['Payment'])
    def delete(self, request, payment_id):
        payment = get_object_or_404(Order, id=payment_id)
        if payment.order.user != request.user and not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)

        payment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
