#!/usr/bin/env bash
set -euo pipefail

msg=${1:-"chore: update $(date '+%Y-%m-%d %H:%M:%S')"}

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: must run inside the repo" >&2
  exit 1
fi

if [ -f package.json ]; then
  echo "Running build..."
  npm run build --silent
fi

if ! git status --short | grep -q '.'; then
  echo "No changes to commit."
  exit 0
fi

echo "Staging changes..."
git add -A

echo "Committing with message: $msg"
git commit -m "$msg"

echo "Pushing to origin..."
git push

echo "Done."
