from django.urls import path
from Product.views import ProductDetailView, ProductCreateListView

urlpatterns = [
    path('', ProductCreateListView.as_view(), name='product-create-list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
]