# filepath: f:\Projects\ebusiness\backend\apps\products\urls.py
from django.urls import path
from .views import ProductListView, ProductDetailView, BrandDetailView, TrendingProductsView

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('trending/', TrendingProductsView.as_view(), name='products-trending'),
    path('brand/<slug:slug>/', BrandDetailView.as_view(), name='brand-detail'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
]
