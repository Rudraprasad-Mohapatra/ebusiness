from django.test import TestCase
from .models import Brand, Product, Testimonial
from django.urls import reverse

class TestBrandModel(TestCase):
    def setUp(self):
        self.brand = Brand.objects.create(
            name="Test Brand",
            slug="test-brand",
            logo="test_logo.png",
            primary_color="#FFFFFF",
            secondary_color="#000000",
            font_family="Arial",
            header_text="Welcome to Test Brand",
            footer_text="Thank you for visiting",
            contact_email="test@brand.com",
            contact_phone="1234567890"
        )

    def test_brand_creation(self):
        self.assertEqual(self.brand.name, "Test Brand")
        self.assertEqual(self.brand.slug, "test-brand")

class TestProductModel(TestCase):
    def setUp(self):
        self.brand = Brand.objects.create(
            name="Test Brand",
            slug="test-brand",
            logo="test_logo.png",
            primary_color="#FFFFFF",
            secondary_color="#000000",
            font_family="Arial",
            header_text="Welcome to Test Brand",
            footer_text="Thank you for visiting",
            contact_email="test@brand.com",
            contact_phone="1234567890"
        )
        self.product = Product.objects.create(
            name="Test Product",
            description="This is a test product",
            price=99.99,
            images="test_image.png",
            variants={"size": "M", "color": "Red"},
            brand=self.brand
        )

    def test_product_creation(self):
        self.assertEqual(self.product.name, "Test Product")
        self.assertEqual(self.product.brand.name, "Test Brand")

class TestTestimonialModel(TestCase):
    def setUp(self):
        self.brand = Brand.objects.create(
            name="Test Brand",
            slug="test-brand",
            logo="test_logo.png",
            primary_color="#FFFFFF",
            secondary_color="#000000",
            font_family="Arial",
            header_text="Welcome to Test Brand",
            footer_text="Thank you for visiting",
            contact_email="test@brand.com",
            contact_phone="1234567890"
        )
        self.testimonial = Testimonial.objects.create(
            client_name="Test Client",
            text="Great service!",
            brand=self.brand
        )

    def test_testimonial_creation(self):
        self.assertEqual(self.testimonial.client_name, "Test Client")
        self.assertEqual(self.testimonial.brand.name, "Test Brand")

class TestProductAPI(TestCase):
    def setUp(self):
        self.brand = Brand.objects.create(
            name="Test Brand",
            slug="test-brand",
            logo="test_logo.png",
            primary_color="#FFFFFF",
            secondary_color="#000000",
            font_family="Arial",
            header_text="Welcome to Test Brand",
            footer_text="Thank you for visiting",
            contact_email="test@brand.com",
            contact_phone="1234567890"
        )
        self.product = Product.objects.create(
            name="Test Product",
            description="This is a test product",
            price=99.99,
            images="test_image.png",
            variants={"size": "M", "color": "Red"},
            brand=self.brand
        )

    def test_product_list_api(self):
        response = self.client.get(reverse('product-list'))
        self.assertEqual(response.status_code, 200)

    def test_product_detail_api(self):
        response = self.client.get(reverse('product-detail', args=[self.product.id]))
        self.assertEqual(response.status_code, 200)

    def test_brand_detail_api(self):
        response = self.client.get(reverse('brand-detail', args=[self.brand.slug]))
        self.assertEqual(response.status_code, 200)
