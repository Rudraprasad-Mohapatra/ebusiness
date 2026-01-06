from rest_framework.test import APITestCase
from django.urls import reverse
from .models import ContactMessage

class TestContactMessageModel(APITestCase):
    def setUp(self):
        self.contact_message = ContactMessage.objects.create(
            name="Test User",
            email="testuser@example.com",
            message="This is a test message",
        )

    def test_contact_message_creation(self):
        self.assertEqual(self.contact_message.name, "Test User")
        self.assertEqual(self.contact_message.email, "testuser@example.com")
        self.assertEqual(self.contact_message.message, "This is a test message")

class TestContactMessageAPI(APITestCase):

    def test_create_contact_message_api(self):
        data = {
            "name": "Test User",
            "email": "testuser@example.com",
            "message": "This is a test message",
        }

        response = self.client.post(
            reverse('contact-message-create'),
            data,
            format='json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)

