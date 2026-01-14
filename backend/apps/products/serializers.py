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
        model = ProductType
        fields = [
            'id',
            'name',
            'image',
            'description',
            'created_at',
            'updated_at'
        ]
        
        read_only_fields = ['id', 'created_at']

class TestimonialSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='client_name', read_only=True)
    message = serializers.CharField(source='text', read_only=True)
    avatar = serializers.SerializerMethodField()

    def get_avatar(self, obj):
        if obj.client_image:
            request = self.context.get('request')
            if request and hasattr(obj.client_image, 'url'):
                return request.build_absolute_uri(obj.client_image.url)
            return str(obj.client_image)
        return None

    class Meta:
        model = Testimonial
        fields = [
            'id',
            'name',
            'message',
            'avatar',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
