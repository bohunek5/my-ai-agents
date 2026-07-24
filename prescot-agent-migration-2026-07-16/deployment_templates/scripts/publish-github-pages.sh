#!/usr/bin/env bash
set -euo pipefail

repo_name="${1:-$(basename "$PWD")}"
visibility="${2:-private}"
project_type="${3:-auto}"

if [ "$visibility" != "private" ] && [ "$visibility" != "public" ]; then
  echo "Usage: ./publish-github-pages.sh [repo-name] [private|public] [auto|vite|next|static]"
  exit 1
fi

if [ "$project_type" != "auto" ] && [ "$project_type" != "vite" ] && [ "$project_type" != "next" ] && [ "$project_type" != "static" ]; then
  echo "Project type must be auto, vite, next, or static"
  exit 1
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
templates_dir="$(cd "$script_dir/.." && pwd)"

if ! command -v gh >/dev/null 2>&1; then
  echo "Missing GitHub CLI. Install gh first."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not logged in. Run: gh auth login"
  exit 1
fi

if [ "$project_type" = "auto" ]; then
  if ls next.config.* >/dev/null 2>&1 || { [ -f package.json ] && grep -q '"next"' package.json; }; then
    project_type="next"
  elif ls vite.config.* >/dev/null 2>&1 || { [ -f package.json ] && grep -qi '"vite"' package.json; }; then
    project_type="vite"
  else
    project_type="static"
  fi
fi

mkdir -p .github/workflows

case "$project_type" in
  vite)
    cp "$templates_dir/github-pages-vite.yml" .github/workflows/pages.yml
    ;;
  next)
    cp "$templates_dir/github-pages-next-static.yml" .github/workflows/pages.yml
    if ! ls next.config.* >/dev/null 2>&1; then
      cp "$templates_dir/next.config.static-export.example.mjs" ./next.config.mjs
    else
      echo "Existing Next config detected. Ensure it has output: \"export\", unoptimized images, and GitHub Pages basePath."
    fi
    ;;
  static)
    cp "$templates_dir/github-pages-static-html.yml" .github/workflows/pages.yml
    ;;
esac

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

git init
git branch -M main
git add -A
git commit -m "ci: publish to github pages" || true

if ! git remote get-url origin >/dev/null 2>&1; then
  if [ "$visibility" = "public" ]; then
    gh repo create "$repo_name" --public --source=. --remote=origin --push
  else
    gh repo create "$repo_name" --private --source=. --remote=origin --push
  fi
else
  git push -u origin main
fi

repo_full="$(gh repo view --json nameWithOwner -q .nameWithOwner)"

if gh api --method POST "repos/$repo_full/pages" -f build_type=workflow >/dev/null 2>&1; then
  echo "GitHub Pages enabled for $repo_full."
elif gh api --method PUT "repos/$repo_full/pages" -f build_type=workflow >/dev/null 2>&1; then
  echo "GitHub Pages updated for $repo_full."
else
  echo "Could not enable Pages automatically. If needed, run:"
  echo "  gh auth refresh -s repo -s workflow"
  echo "Then open: https://github.com/$repo_full/settings/pages"
  echo "Set Source to: GitHub Actions"
fi

echo "Repository: https://github.com/$repo_full"
echo "Actions:    https://github.com/$repo_full/actions"
echo "Pages URL will appear in the Pages deployment after Actions finishes."
