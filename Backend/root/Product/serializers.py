from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'total_value']
        
    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price must be a positive number")
        return value
        
    def validate_inventory(self, value):
        if value < 0:
            raise serializers.ValidationError("Inventory must be a non-negative number.")
        return value

    def validate_discount(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError("Discount must be between 0 and 100.")
        return value