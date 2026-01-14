from django.shortcuts import render
from rest_framework import generics
from .models import Product, Brand, Testimonial, ProductType
from .serializers import (
    ProductSerializer,
    BrandSerializer,
    TestimonialSerializer,
    ProductTypeSerializer,
)


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.select_related("type", "brand")

        product_type = self.request.query_params.get("type")

        if product_type:
            # if type is numeric → treat as ID
            if product_type.isdigit():
                queryset = queryset.filter(type_id=product_type)
            else:
                # treat as type name
                queryset = queryset

        return queryset


class ProductTypeListView(generics.ListAPIView):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer


class TrendingProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(is_trending=True).order_by("-id")


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class BrandDetailView(generics.RetrieveAPIView):
    queryset = Brand.objects.all()
    lookup_field = "slug"
    serializer_class = BrandSerializer


class TestimonialListAPIView(generics.ListAPIView):
    serializer_class = TestimonialSerializer

    def get_queryset(self):
        queryset = Testimonial.objects.all()
        return queryset.order_by("-created_at")
