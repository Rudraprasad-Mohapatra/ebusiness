from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.http import FileResponse
from pathlib import Path
import os
import mimetypes

BASE_DIR = Path(__file__).resolve().parent.parent

# Ensure CSS and JS MIME types are registered
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("application/javascript", ".js")

def serve_assets(request, path):
    """Serve assets with correct MIME types"""
    assets_path = os.path.join(BASE_DIR, 'frontend', 'static', 'assets')
    file_path = os.path.join(assets_path, path)
    
    # Security check: ensure the file is within the assets directory
    if not os.path.abspath(file_path).startswith(os.path.abspath(assets_path)):
        from django.http import Http404
        raise Http404("File not found")
    
    if os.path.isfile(file_path):
        mime_type, _ = mimetypes.guess_type(file_path)
        response = FileResponse(open(file_path, 'rb'))
        if mime_type:
            response['Content-Type'] = mime_type
        return response
    
    from django.http import Http404
    raise Http404("File not found")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/products/", include("apps.products.urls")),   # products API
    path("api/contact/", include("apps.contact.urls")),  # contact endpoint
    re_path(r'^assets/(?P<path>.*)$', serve_assets, name='serve-assets'),
]

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# catch-all: send everything else to React index.html (must be LAST)
urlpatterns.append(re_path(r"^.*$", TemplateView.as_view(template_name="index.html"), name="index"))
