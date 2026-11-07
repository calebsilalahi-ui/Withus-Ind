#!/usr/bin/env bash
# Reinstall helper tools in a fresh container. Safe to re-run.
set -euo pipefail
python3 -m venv "$HOME/.venvs/tools" 2>/dev/null || true
"$HOME/.venvs/tools/bin/pip" install -q graphifyy
export PATH="$HOME/.venvs/tools/bin:$HOME/.local/bin:$PATH"
graphify install
if command -v uv >/dev/null; then
  uv tool install --force https://github.com/Panniantong/Agent-Reach/releases/latest/download/agent-reach.zip || true
  agent-reach setup || true
fi
npx --yes hyperframes --help >/dev/null && echo "hyperframes ok"
command -v ffmpeg >/dev/null && echo "ffmpeg ok" || echo "ffmpeg missing"
echo "Optional: strix needs Docker + LLM key. Add ~/.venvs/tools/bin to PATH."
