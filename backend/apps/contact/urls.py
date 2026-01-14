from django.urls import path
from .views import ContactMessageCreateView
from apps.products.views import TestimonialListAPIView

urlpatterns = [
    path('', ContactMessageCreateView.as_view(), name='contact-message-create'),
    path('testimonials/', TestimonialListAPIView.as_view(), name='testimonial-list'),
]