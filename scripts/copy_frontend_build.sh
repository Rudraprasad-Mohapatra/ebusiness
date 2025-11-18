#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"   # scripts sits in repo_root/scripts; go up one
FRONTEND="$ROOT/frontend"                  # your react source
BACKEND_FRONTEND="$ROOT/backend/frontend"  # where to copy the build into

if [ ! -d "$FRONTEND/dist" ]; then
  echo "No Vite build found. Run 'cd frontend && npm run build' first."
  exit 1
fi

# remove old build artifacts
rm -rf "$BACKEND_FRONTEND/static" "$BACKEND_FRONTEND/templates"
mkdir -p "$BACKEND_FRONTEND/static"
mkdir -p "$BACKEND_FRONTEND/templates"

# copy static files from dist
cp -r "$FRONTEND/dist"/* "$BACKEND_FRONTEND/static/"

# copy index.html to templates
cp "$FRONTEND/dist/index.html" "$BACKEND_FRONTEND/templates/index.html"

echo "Copied Vite build to backend/frontend. Done."
