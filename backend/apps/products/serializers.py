from rest_framework import serializers
from .models import Product, Brand

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'images', 'variants', 'brand']

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'logo', 'primary_color', 'secondary_color', 'font_family', 'header_text', 'footer_text', 'contact_email', 'contact_phone']