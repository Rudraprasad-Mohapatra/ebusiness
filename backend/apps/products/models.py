from django.db import models

class Brand(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    logo = models.ImageField(upload_to='brand_logos/')
    primary_color = models.CharField(max_length=7)
    secondary_color = models.CharField(max_length=7)
    font_family = models.CharField(max_length=100)
    header_text = models.TextField()
    footer_text = models.TextField()
    about_text = models.TextField(blank=True, null=True)
    background_image = models.ImageField(upload_to='brand_backgrounds/', blank=True, null=True)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=15)
    facebook_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    whatsapp_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    model_name = models.CharField(max_length=100, blank=True, null=True)
    short_description = models.CharField(max_length=500, blank=True, null=True)
    details = models.TextField(blank=True, null=True) 
    price = models.DecimalField(max_digits=10, decimal_places=2)
    images = models.ImageField(upload_to='product_images/')
    variants = models.JSONField(blank=True, null=True)  # For size/color options
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
    is_trending = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return f"{self.name} ({self.model_name})" if self.model_name else self.name

class Testimonial(models.Model):
    client_name = models.CharField(max_length=255)
    text = models.TextField()
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='testimonials')

    def __str__(self):
        return f"{self.client_name} - {self.brand.name}"
