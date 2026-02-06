from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings


def send_contact_confirmation_email(contact_message):
    """Send confirmation email to the visitor"""
    subject = "We received your message"
    
    context = {
        'name': contact_message.name,
        'message': contact_message.message,
    }
    
    html_message = render_to_string('contact/visitor_email.html', context)
    plain_message = strip_tags(html_message)
    
    send_mail(
        subject,
        plain_message,
        settings.DEFAULT_FROM_EMAIL,
        [contact_message.email],
        html_message=html_message,
        fail_silently=False,
    )


def send_contact_notification_to_admin(contact_message):
    """Send notification email to the admin/business"""
    subject = f"New Contact Message from {contact_message.name}"
    
    context = {
        'name': contact_message.name,
        'email': contact_message.email,
        'message': contact_message.message,
    }
    
    html_message = render_to_string('contact/admin_email.html', context)
    plain_message = strip_tags(html_message)
    
    admin_email = settings.ADMIN_EMAIL
    
    send_mail(
        subject,
        plain_message,
        settings.DEFAULT_FROM_EMAIL,
        [admin_email],
        html_message=html_message,
        fail_silently=False,
    )
