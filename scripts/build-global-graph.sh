#!/usr/bin/env bash
# Rebuild the global WithUs context corpus (CLAUDE.md files, commands, skills) for /graphify.
# After running, open Claude Code and run: /graphify ~/.claude/graph-corpus   (or --update)
set -euo pipefail
C="$HOME/.claude/graph-corpus"; R="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$C"/{context,skills,commands,repo}
cp "$HOME/.claude/CLAUDE.md" "$C/context/global-CLAUDE.md" 2>/dev/null || true
cp "$R/CLAUDE.md" "$C/context/project-CLAUDE.md"
cp "$R"/.claude/commands/*.md "$C/commands/"
cp "$R/scripts/setup-tools.sh" "$C/repo/"
for d in "$R"/.claude/skills/*/; do n=$(basename "$d"); [ -f "$d/SKILL.md" ] && { mkdir -p "$C/skills/$n"; cp "$d/SKILL.md" "$C/skills/$n/"; }; done
# Restore the prebuilt graph so /graphify --update only re-reads what changed.
mkdir -p "$C/graphify-out"; cp -n "$R"/.claude/graph/* "$C/graphify-out/" 2>/dev/null || true
echo "Corpus ready at $C"
