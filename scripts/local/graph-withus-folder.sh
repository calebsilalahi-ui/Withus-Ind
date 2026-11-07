#!/usr/bin/env bash
# Run on YOUR MAC. Builds a private knowledge graph of the WithUs document folder.
# Usage: bash graph-withus-folder.sh "/Users/<you>/path/PT Harpa Ananta Sora"
# Uses `uv`, which brings its own modern Python (graphify needs Python >= 3.10; macOS ships 3.9).
set -euo pipefail
DIR="${1:?Seret folder ke Terminal setelah nama skrip}"
[ -d "$DIR" ] || { echo "Folder tidak ditemukan: $DIR"; exit 1; }
export PATH="$HOME/.local/bin:$PATH"
command -v uv >/dev/null 2>&1 || curl -LsSf https://astral.sh/uv/install.sh | sh
uv tool install --force --python 3.12 graphifyy
graphify install
cat > "$DIR/.graphifyignore" <<'IGN'
*.csv
*.log
*dup*
*versi iCloud*
*(1)*
*(2)*
*Copy of*
.DS_Store
~$*
*.zip
*.mp4
*.mov
node_modules/
06_DELETE/
IGN
grep -qx "graphify-out/" "$DIR/.gitignore" 2>/dev/null || echo "graphify-out/" >> "$DIR/.gitignore"
echo
echo "SELESAI. Lanjut ke langkah berikutnya."
