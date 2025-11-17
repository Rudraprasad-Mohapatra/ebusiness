# filepath: f:\Projects\ebusiness\backend\apps\products\urls.py
from django.urls import path
from .views import ProductListView, ProductDetailView, BrandDetailView

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('brand/<slug:slug>/', BrandDetailView.as_view(), name='brand-detail'),
]