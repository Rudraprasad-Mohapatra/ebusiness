from rest_framework import serializers
from .models import Product, Brand

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'logo', 'primary_color', 'secondary_color', 'font_family', 'header_text', 'footer_text', 'contact_email', 'contact_phone']
        
class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'model_name',
            'short_description',
            'details',
            'price',
            'images',
            'variants',
            'brand',
            'is_trending',
            'created_at',
            'updated_at',
        ]
