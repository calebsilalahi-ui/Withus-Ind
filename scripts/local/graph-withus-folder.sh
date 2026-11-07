#!/usr/bin/env bash
# Run on YOUR MAC (not in the cloud). Builds a private knowledge graph of the WithUs document folder.
# Usage: bash graph-withus-folder.sh "/Users/<you>/path/PT Harpa Ananta Sora"
# Nothing leaves your computer except what Claude Code reads during extraction.
set -euo pipefail
DIR="${1:?Pass the folder path in quotes}"
[ -d "$DIR" ] || { echo "Folder not found: $DIR"; exit 1; }

# 1) Install graphify in an isolated venv and register the skill with Claude Code
python3 -m venv "$HOME/.venvs/graphify" 2>/dev/null || true
"$HOME/.venvs/graphify/bin/pip" install -q graphifyy
"$HOME/.venvs/graphify/bin/graphify" install

# 2) Skip noise that wastes tokens (duplicates, huge logs, system files)
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

# 3) Make sure the graph output can never be committed by accident
echo "graphify-out/" >> "$DIR/.gitignore"

echo
echo "Ready. Open Claude Code in this folder and run:"
echo "    cd \"$DIR\" && claude"
echo "    /graphify ."
echo "Tip: first run only reads new files; later use '/graphify . --update'."
