# PowerShell script to copy Vite build to Django backend
$ErrorActionPreference = "Stop"

$ROOT = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$FRONTEND = Join-Path $ROOT "frontend"
$BACKEND_FRONTEND = Join-Path $ROOT "backend" "frontend"
$DIST = Join-Path $FRONTEND "dist"

if (-not (Test-Path $DIST)) {
    Write-Host "No Vite build found. Run 'cd frontend && npm run build' first."
    exit 1
}

# Remove old build artifacts
$STATIC_DIR = Join-Path $BACKEND_FRONTEND "static"
$TEMPLATES_DIR = Join-Path $BACKEND_FRONTEND "templates"

if (Test-Path $STATIC_DIR) {
    Remove-Item -Path $STATIC_DIR -Recurse -Force
}
if (Test-Path $TEMPLATES_DIR) {
    Remove-Item -Path $TEMPLATES_DIR -Recurse -Force
}

# Create directories
New-Item -ItemType Directory -Path $STATIC_DIR -Force | Out-Null
New-Item -ItemType Directory -Path $TEMPLATES_DIR -Force | Out-Null

# Copy static files from dist
Copy-Item -Path (Join-Path $DIST "*") -Destination $STATIC_DIR -Recurse -Force

# Copy index.html to templates
Copy-Item -Path (Join-Path $DIST "index.html") -Destination (Join-Path $TEMPLATES_DIR "index.html") -Force

Write-Host "Copied Vite build to backend/frontend. Done."
