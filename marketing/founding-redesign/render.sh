#!/usr/bin/env bash
# Renders the founding-client redesign assets using the pre-installed Chromium.
# Fonts are embedded as base64 in the HTML, so no network is required.
# Usage: bash marketing/founding-redesign/render.sh
set -euo pipefail

# chrome-headless-shell is the standalone "old headless" — it captures the full
# document at the exact window size (new headless reserves window chrome and
# clips content below the viewport, so we don't use it here).
CHROME=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$DIR/../../public/social/founding-redesign"
mkdir -p "$OUT"

shot() { # html width height outfile scale
  "$CHROME" --no-sandbox --disable-gpu --hide-scrollbars \
    --force-device-scale-factor="$5" --window-size="$2,$3" \
    --default-background-color=00000000 --virtual-time-budget=4000 \
    --screenshot="$OUT/$4" "file://$DIR/$1" 2>/dev/null
  echo "✓ $4  (${2}×${3} @${5}x)"
}

shot social-square.html   1080 1080 founding-redesign-square.png   1
shot social-portrait.html 1080 1350 founding-redesign-portrait.png 1
shot social-story.html    1080 1920 founding-redesign-story.png    1
shot onepager.html        794  1123 founding-redesign-onepager.png 2

# Print-quality PDF of the one-pager (A4, CSS @page handles sizing)
"$CHROME" --headless=new --no-sandbox --disable-gpu \
  --virtual-time-budget=4000 --no-pdf-header-footer \
  --print-to-pdf="$OUT/founding-redesign-onepager.pdf" \
  "file://$DIR/onepager.html" 2>/dev/null
echo "✓ founding-redesign-onepager.pdf  (A4)"

echo "All assets → $OUT"
