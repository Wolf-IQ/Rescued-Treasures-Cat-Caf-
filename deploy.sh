#!/usr/bin/env bash
# One-step publish: pushes this folder to GitHub and turns on GitHub Pages.
# Run from inside this folder:  bash deploy.sh
set -e
REPO="Wolf-IQ/Rescued-Treasures-Cat-Caf-"
git push -u origin main
if command -v gh >/dev/null 2>&1; then
  gh api -X POST "repos/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 \
    || gh api -X PUT "repos/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 || true
  echo "GitHub Pages enabled."
else
  echo "Turn on Pages: GitHub > repo Settings > Pages > Deploy from branch > main / (root)."
fi
echo "Live in about a minute at: https://wolf-iq.github.io/Rescued-Treasures-Cat-Caf-/"
