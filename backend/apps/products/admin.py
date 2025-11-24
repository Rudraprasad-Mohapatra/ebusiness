from django.contrib import admin
from .models import Brand, Product, Testimonial

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'primary_color', 'secondary_color', 'contact_email')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug')
        }),
        ('Branding', {
            'fields': ('logo', 'primary_color', 'secondary_color', 'font_family', 'background_image')
        }),
        ('Content', {
            'fields': ('header_text', 'footer_text', 'about_text')
        }),
        ('Contact Information', {
            'fields': ('contact_email', 'contact_phone')
        }),
    )

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'brand', 'is_trending')
    list_filter = ('brand', 'is_trending')
    search_fields = ('name', 'description')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'brand')
    search_fields = ('client_name', 'text')
