#!/usr/bin/env bash
set -euo pipefail

repo_name="${1:-}"
visibility="${2:-private}"

if [ -z "$repo_name" ]; then
  echo "Usage: ./init-github-repo.sh REPO_NAME [private|public]"
  exit 1
fi

if [ "$visibility" != "private" ] && [ "$visibility" != "public" ]; then
  echo "Visibility must be private or public"
  exit 1
fi

git init
git branch -M main

if [ ! -f .gitignore ]; then
  cat > .gitignore <<'EOF'
node_modules/
dist/
build/
.next/
out/
.env
.env.*
!.env.example
.DS_Store
EOF
fi

git add -A
git commit -m "feat: initial site" || true

if [ "$visibility" = "public" ]; then
  gh repo create "$repo_name" --public --source=. --remote=origin --push
else
  gh repo create "$repo_name" --private --source=. --remote=origin --push
fi

echo "GitHub repo ready: $repo_name"

