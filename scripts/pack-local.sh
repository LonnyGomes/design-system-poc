#!/usr/bin/env bash
# Pack all publishable @cobalt packages into tarballs for local testing.
#
# Usage:
#   pnpm pack:local                    # build + pack into ./local-packs/
#   pnpm pack:local --skip-build       # pack only (if you already ran pnpm build)
#
# Then in your external app:
#   npm install /path/to/cobalt/local-packs/cobalt-tokens-0.0.1.tgz \
#               /path/to/cobalt/local-packs/cobalt-components-0.0.1.tgz
#
# Re-run this script after making changes, then reinstall in your app.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT_DIR/local-packs"

# Parse flags
SKIP_BUILD=false
for arg in "$@"; do
  case $arg in
    --skip-build) SKIP_BUILD=true ;;
  esac
done

# Build all packages first (unless skipped)
if [ "$SKIP_BUILD" = false ]; then
  echo "Building all packages..."
  pnpm --dir "$ROOT_DIR" build
  echo ""
fi

# Clean and recreate output directory
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

# Publishable packages (skip docs since it is internal)
PACKAGES=(tokens components react vue angular icons)

echo "Packing @cobalt packages into $OUT_DIR/"
echo ""

for pkg in "${PACKAGES[@]}"; do
  pkg_dir="$ROOT_DIR/packages/$pkg"
  if [ -d "$pkg_dir" ]; then
    tarball=$(cd "$pkg_dir" && pnpm pack --pack-destination "$OUT_DIR" 2>/dev/null)
    basename=$(basename "$tarball")
    echo "  $basename"
  fi
done

echo ""
echo "Done! Install in your app with:"
echo ""
echo "  npm install $(printf "$OUT_DIR/*.tgz" | xargs -I{} echo {})"
echo ""
echo "Or install specific packages:"
for pkg in "${PACKAGES[@]}"; do
  tgz=$(ls "$OUT_DIR"/cobalt-"$pkg"-*.tgz 2>/dev/null | head -1)
  if [ -n "$tgz" ]; then
    echo "  npm install $tgz"
  fi
done
echo ""
