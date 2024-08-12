from django.contrib import admin
from django.urls import path
from django.urls import include
from Users.views import LoginView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from django.conf.urls.static import static
from django.conf import settings

schema_view = get_schema_view(
    openapi.Info(
        title="WebPhone Backend APIs",
        default_version="v1",
        description="This is the documentation for the backend API",
        contact=openapi.Contact(email="macthinh22@gmail.com"),
        license=openapi.License(name="BSD Licence"),
    ),
    public=True,
    permission_classes = (permissions.AllowAny, )
)

urlpatterns = [
    path("", schema_view.with_ui('swagger', cache_timeout=0), name="schema-swagger-ui"),
    path('admin/', admin.site.urls),
    path('register/', RegisterView.as_view(), name = 'register'),
    path('login/', LoginView.as_view(), name = 'login'),
    path('token/refresh', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('api/products/', include('Product.urls')),  
    path('api/orders/', include('Order.urls')),
    path('api/users/', include('Users.urls')),
    path('api/payment/', include('Payment.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
