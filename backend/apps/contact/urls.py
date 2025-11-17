# filepath: f:\Projects\ebusiness\backend\apps\products\urls.py
from django.urls import path
from .views import ContactMessageCreateView

urlpatterns = [
    path('', ContactMessageCreateView.as_view(), name='contact-message-create'),
]