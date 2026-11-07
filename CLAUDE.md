# WithUs Indonesia + Burger Business — Project Guide

Owner: Martha Silalahi (concert promoter / project director). WithUs Indonesia promotes international and K-Pop events in Jakarta. A separate burger business may be built here as its own entity.

## Purpose of this repo
Websites, apps, workflows and automation for WithUs Indonesia and the potential burger business.

## How to work
- **Any target → `/goal <target>`** (skill `goal-loop`): define acceptance criteria, use every relevant skill, build, verify with an independent subagent, revise until criteria pass.
- **Codebase questions → graphify first.** If `graphify-out/` exists, query the graph before reading files. Rebuild with `/graphify .` after major changes.
- Keep it simple (`ponytail`): no speculative abstractions.
- Never open PRs, send messages/emails, publish, or spend money without explicit confirmation.
- Develop on the assigned branch; commit with clear messages.

## Style
- Output language: Bahasa Indonesia by default; bilingual ID–EN for official material.
- Tone: formal but warm; executive, commercially focused, actionable.
- Money: IDR, state assumptions, scenarios (best/base/worst), reconcile totals.
- Tools in use: ClickUp, Jurnal.id, Gmail, Google Drive/Calendar/Sheets, Canva.

## Setup
`bash scripts/setup-tools.sh` reinstalls Graphify, Agent Reach and checks Hyperframes/Playwright in a fresh container.
CodeRabbit review runs via the CodeRabbit GitHub App on pull requests (no CLI needed).
