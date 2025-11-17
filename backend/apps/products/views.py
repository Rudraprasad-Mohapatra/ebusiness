from django.shortcuts import render
from rest_framework import generics
from .models import Product, Brand
from .serializers import ProductSerializer, BrandSerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class BrandDetailView(generics.RetrieveAPIView):
    queryset = Brand.objects.all()
    lookup_field = 'slug'
    serializer_class = BrandSerializer
