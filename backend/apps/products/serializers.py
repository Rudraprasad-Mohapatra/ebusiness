from rest_framework import serializers
from .models import Product, Brand, Testimonial, ProductType

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'logo', 'primary_color', 'secondary_color', 'accent_color', 'accent_background_color', 'font_family', 'header_text', 'footer_text', 'address', 'about_text', 'background_image', 'contact_email', 'contact_phone','facebook_url','instagram_url','twitter_url','linkedin_url','whatsapp_url',]
        
class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'model_name',
            'type',
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


class ProductTypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        Model = ProductType
        fields = [
            'id',
            'name',
            'description',
            'created_at',
            'updated_at'
        ]
        
        read_only_fields = ['id', 'created_at']

class TestimonialSerializer(serializers.ModelSerializer):

    class Meta:
        model = Testimonial
        fields = [
            'id',
            'client_name',
            'text',
            'client_image',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
