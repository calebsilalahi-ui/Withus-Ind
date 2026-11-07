#!/usr/bin/env bash
# Global WithUs knowledge graph helper.
#   bash scripts/build-global-graph.sh          -> prepare corpus (then run: /graphify ~/.claude/graph-corpus --update)
#   bash scripts/build-global-graph.sh finish   -> after /graphify: make graph.html self-contained and copy outputs into .claude/graph/
set -euo pipefail
C="$HOME/.claude/graph-corpus"; R="$(cd "$(dirname "$0")/.." && pwd)"

if [ "${1:-}" = "finish" ]; then
  G="$C/graphify-out"
  [ -f "$G/graph.json" ] || { echo "No graph found in $G. Run /graphify first."; exit 1; }
  mkdir -p "$R/.claude/graph"
  # graphify's HTML loads vis-network from a CDN (blank in sandboxed previews): embed a compressed copy.
  python3 -I "$R/scripts/embed-graph-assets.py" "$G/graph.html" "$G/graph.html"
  cp "$G"/graph.json "$G"/graph.html "$G"/GRAPH_REPORT.md "$G"/manifest.json "$R/.claude/graph/"
  for f in .graphify_labels.json .graphify_partial.txt; do [ -f "$G/$f" ] && cp "$G/$f" "$R/.claude/graph/"; done
  echo "Graph synced to $R/.claude/graph (graph.html is self-contained)."
  exit 0
fi

mkdir -p "$C"/{context,skills,commands,repo}
cp "$HOME/.claude/CLAUDE.md" "$C/context/global-CLAUDE.md" 2>/dev/null || true
cp "$R/CLAUDE.md" "$C/context/project-CLAUDE.md"
cp "$R"/.claude/commands/*.md "$C/commands/"
cp "$R/scripts/setup-tools.sh" "$C/repo/"
for d in "$R"/.claude/skills/*/; do n=$(basename "$d"); [ -f "$d/SKILL.md" ] && { mkdir -p "$C/skills/$n"; cp "$d/SKILL.md" "$C/skills/$n/"; }; done
# Restore the prebuilt graph so /graphify --update only re-reads what changed.
mkdir -p "$C/graphify-out"; cp -n "$R"/.claude/graph/* "$C/graphify-out/" 2>/dev/null || true
echo "Corpus ready at $C. Next: /graphify $C --update, then: bash scripts/build-global-graph.sh finish"
