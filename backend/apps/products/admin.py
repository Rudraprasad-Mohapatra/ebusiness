from django.contrib import admin
from .models import Brand, Product, Testimonial

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'contact_email', 'contact_phone')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'brand', 'is_trending')
    list_filter = ('brand', 'is_trending')
    search_fields = ('name', 'description')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'brand')
    search_fields = ('client_name', 'text')
