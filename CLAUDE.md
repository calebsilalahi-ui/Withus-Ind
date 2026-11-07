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

## Global knowledge graph
A graph of all WithUs context, CLAUDE.md files, commands and skills is stored in `.claude/graph/` (`graph.json`, `GRAPH_REPORT.md`, `graph.html`; 384 nodes, 23 communities). Query it before reading skills one by one:
`graphify query "<question>" --graph .claude/graph/graph.json`
Rebuild/update: `bash scripts/build-global-graph.sh`, then `/graphify ~/.claude/graph-corpus --update`, then `bash scripts/build-global-graph.sh finish` (embeds the HTML library so graph.html is not blank in previews).
Note: 70 of 115 source files were only skimmed by extraction agents (listed in `.claude/graph/.graphify_partial.txt`); `--update` re-reads them.

## Private WithUs document graph (local only)
Confidential WithUs documents (folder "PT Harpa Ananta Sora") are graphed on Martha's Mac with `scripts/local/graph-withus-folder.sh`. The graph stays local and must never be committed. It covers WithUs Indonesia only; Smashing (burger) gets its own separate graph.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
