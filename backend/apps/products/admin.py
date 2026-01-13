from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Brand, Product, Testimonial, ProductType

@admin.register(Brand)
class BrandAdmin(ImportExportModelAdmin):
    list_display = ('name', 'slug', 'primary_color', 'secondary_color', 'contact_email')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug')
        }),
        ('Branding', {
            'fields': ('logo', 'primary_color', 'secondary_color','accent_color', 'accent_background_color', 'font_family', 'background_image')
        }),
        ('Content', {
            'fields': ('header_text', 'footer_text', 'about_text', 'address')
        }),
        ('Contact Information', {
            'fields': ('contact_email', 'contact_phone')
        }),
        ('Social Media', {
            'fields': (
                'facebook_url',
                'instagram_url',
                'twitter_url',
                'linkedin_url',
                'whatsapp_url',
            )
        }),
    )

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    list_display = ('name', 'price', 'brand', 'is_trending', 'type')
    list_filter = ('brand', 'is_trending', 'type')
    search_fields = ('name', 'description', 'type')
    
@admin.register(ProductType)
class ProductTypeAdmin(ImportExportModelAdmin):
    list_display = ('name',)
    list_filter = ('name',)
    search_fields = ('name', 'description')

@admin.register(Testimonial)
class TestimonialAdmin(ImportExportModelAdmin):
    list_display = ('client_name',)
    search_fields = ('client_name', 'text')
