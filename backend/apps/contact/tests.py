from django.test import TestCase
from .models import ContactMessage
from apps.products.models import Brand
from django.urls import reverse

class TestContactMessageModel(TestCase):
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
        self.contact_message = ContactMessage.objects.create(
            name="Test User",
            email="testuser@example.com",
            message="This is a test message",
            brand=self.brand
        )

    def test_contact_message_creation(self):
        self.assertEqual(self.contact_message.name, "Test User")
        self.assertEqual(self.contact_message.brand.name, "Test Brand")

class TestContactMessageAPI(TestCase):
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

    def test_create_contact_message_api(self):
        data = {
            "name": "Test User",
            "email": "testuser@example.com",
            "message": "This is a test message",
            "brand": self.brand.id
        }
        response = self.client.post(reverse('contact-message-create'), data)
        self.assertEqual(response.status_code, 201)
