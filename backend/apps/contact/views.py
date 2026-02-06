from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from .emails import send_contact_confirmation_email, send_contact_notification_to_admin


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        contact_message = serializer.save()
        try:
            # Send confirmation email to visitor
            send_contact_confirmation_email(contact_message)
        except Exception as e:
            print(f"Error sending visitor confirmation email: {e}")

        try:
            # Send notification email to admin
            send_contact_notification_to_admin(contact_message)
        except Exception as e:
            print(f"Error sending admin notification email: {e}")

