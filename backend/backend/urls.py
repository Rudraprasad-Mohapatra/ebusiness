from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/products/", include("apps.products.urls")),   # products API
    path("api/contact/", include("apps.contact.urls")),  # contact endpoint
    # catch-all: send everything else to React index.html (must be last)
    re_path(r"^(?!api/).*$", TemplateView.as_view(template_name="index.html"), name="index"),
]
