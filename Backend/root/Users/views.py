from django.contrib.auth import authenticate
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, mixins
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .permissions import *
from .serializers import *


# Create your views here.
class RegisterView(APIView):
    @swagger_auto_schema(request_body=RegistrationSerializers, responses={201: RegistrationSerializers}, tags=['Auth'])
    def post(self, request):
        serializer = RegistrationSerializers(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    @swagger_auto_schema(request_body=LoginSerializer, responses={200: "Return Token"}, tags=['Auth'])
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)

            if not user:
                return Response({
                    'status': 'ERR',
                    'message': 'Incorrect email or password'
                }, status=status.HTTP_400_BAD_REQUEST)

            refresh = RefreshToken.for_user(user)
            refresh['is_staff'] = user.is_staff
            refresh['is_superuser'] = user.is_superuser

            return Response({
                'status': 'OK',
                'message': 'Login Successfully',
                'access_token': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        return Response({
            'status': 'ERR',
            'message': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class UserListCreateView(generics.GenericAPIView,
                         mixins.ListModelMixin,
                         mixins.CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        if self.request.method == 'GET' or self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    @swagger_auto_schema(tags=['Users'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Users'])
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserDetailView(generics.GenericAPIView,
                     mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [IsOwnerOrAdmin]
        elif self.request.method == 'PUT':
            self.permission_classes = [IsOwnerOrAdmin]
        elif self.request.method == 'DELETE':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    @swagger_auto_schema(tags=['Users'])
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Users'])
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Users'])
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
