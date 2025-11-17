from django.db import models
from apps.products.models import Brand

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='contact_messages')

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
