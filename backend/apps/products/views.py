from django.shortcuts import render
from rest_framework import generics
from .models import Product, Brand
from .serializers import ProductSerializer, BrandSerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class TrendingProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        return Product.objects.filter(is_trending=True).order_by('-id')

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class BrandDetailView(generics.RetrieveAPIView):
    queryset = Brand.objects.all()
    lookup_field = 'slug'
    serializer_class = BrandSerializer
