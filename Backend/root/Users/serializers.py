from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(allow_null=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone', 'address', 'avatar', 'city', 'created_at', 'updated_at']
        read_only_fields = ['email', 'created_at', 'updated_at']

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        instance.city = validated_data.get('city', instance.city)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        return instance


class RegistrationSerializers(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
