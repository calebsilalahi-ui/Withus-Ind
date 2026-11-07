---
name: goal-loop
description: Goal-driven execution loop for WithUs Indonesia and the burger business. Use whenever there is a target to achieve (build a website/app/workflow/automation, produce a proposal/deck/model/contract review, fix or improve something). Defines the goal and acceptance criteria, selects and uses every skill needed, builds, then runs an independent verify-and-revise loop until the result provably matches the goal. Invoke via /goal <target> or automatically for any multi-step objective.
---

# Goal Loop

Every target runs through this loop. Do not skip phases. Do not declare done on self-assessment: an independent check against written criteria decides.

## Phase 0 — Orient (cheap)
- If `graphify-out/` exists, query it first (`/graphify` query/path/explain) before reading files. If the repo has substantial code and no graph, run `/graphify .` once.
- Restate the target in 2–3 lines: context, who it is for (WithUs Indonesia / burger business / Martha), constraints (deadline, budget, tools: ClickUp, Jurnal.id, Gmail, Drive, Canva).
- Ambiguous or high-stakes target → `addyosmani-interview-me` or `mattpocock-grilling`, max 3–5 questions. Otherwise assume sensibly and state assumptions.

## Phase 1 — Define the goal contract
Write `.goal/<slug>/GOAL.md` (create folder):
1. **Goal** (one sentence, outcome not activity).
2. **Acceptance criteria**: 5–10 binary, checkable statements. Each has a *how to verify* (command, screenshot, file inspection, number reconciliation, checklist).
3. **Out of scope** and **kill switches** (what makes us stop and ask).
4. **Skills selected** (see routing table) and why.
5. **Iteration budget**: default 5 loops. 

Criteria must be falsifiable. "Looks good" is not a criterion; "Lighthouse mobile ≥90, no horizontal scroll at 375px, ID and EN copy both present" is.

## Phase 2 — Plan
Use `obra-writing-plans` / `addyosmani-planning-and-task-breakdown`. Small verifiable slices, each mapped to criteria. Parallelizable slices → subagents.

## Phase 3 — Execute
Use every skill the routing table says applies. Invoke skills with the Skill tool rather than paraphrasing from memory. Build in thin slices (`addyosmani-incremental-implementation`). Record what was done in `.goal/<slug>/LOG.md`.

## Phase 4 — Verify (independent)
Spawn a **fresh-context verifier subagent** (Agent tool, general-purpose). Give it only: GOAL.md, the artifact paths/URLs, and the instruction "try to prove each criterion FAILS; report PASS/FAIL per criterion with evidence". It must run the verification step itself (tests, Playwright screenshots at 375/768/1440, `xlsx` recalculation, document render, link check, etc.). Never grade your own work in the same context.
Also run as relevant: `obra-verification-before-completion`, `zebbern-playwright`, `anthropics-webapp-testing`, `zebbern-code-vuln-audit`, `coderabbitai-code-review`, `ponytail-audit`.

## Phase 5 — Revise loop
- Write verifier results to `.goal/<slug>/REVIEW-<n>.md`.
- Any FAIL → diagnose root cause (`obra-systematic-debugging`), fix, return to Phase 4 with a **new** verifier.
- Same criterion fails twice → change approach, not just effort. Third time → stop and ask Martha with options and a recommendation.
- Regression check: previously passing criteria are re-verified every loop.
- Stop when all criteria PASS, or budget is exhausted (then report honestly what passes, what does not, and why).

## Phase 6 — Close
- Final report (Bahasa Indonesia unless asked otherwise): what was achieved vs. each criterion, evidence, residual risks, recommended next actions with owner and timeframe.
- Commit to the working branch. Never open a PR, send an email/message, publish, spend money, or sign anything without explicit confirmation.

## Skill routing table (use all that apply)

| Target type | Skills |
|---|---|
| Website / landing page | `anthropics-frontend-design`, `nextlevelbuilder-ui-ux-pro-max`, `nutlope-hallmark`, `leonxlnx-taste-skill`, `nextlevelbuilder-design-system`, `zebbern-nextjs-developer`, `zebbern-react-best-practices`, `zebbern-localization-toolkit`, `emilkowalski-*`, `greensock-gsap-*` |
| Web app / internal tool | above + `addyosmani-api-and-interface-design`, `zebbern-authentication-patterns`, `zebbern-database-scout`, `zebbern-caching`, `zebbern-typescript-pro` |
| Ticketing / on-sale readiness | `zebbern-http-load-profiler`, `addyosmani-performance-optimization`, `zebbern-log-error-digest` |
| Workflow / automation / integration | `anthropics-mcp-builder`, `zebbern-pipeline-blueprint`, `addyosmani-ci-cd-and-automation`, `zebbern-route-to-openapi` |
| Brand / visual identity (WithUs or burger) | `nextlevelbuilder-brand`, `dominikmartn-hue`, `nextlevelbuilder-banner-design`, `anthropics-canvas-design`, `anthropics-theme-factory` |
| Promo video | `heygen-com-hyperframes`, `-motion-doctrine`, `-captions-overlay`, `-media-use` |
| Proposal / sponsorship deck | `anthropics-pptx`, `nextlevelbuilder-slides`, `anthropics-doc-coauthoring`, `anthropics-docx`, `zebbern-chart-image` |
| Financial model / P&L | `anthropics-xlsx`, `zebbern-data-viz-renderer`, `zebbern-dataset-quality-audit` |
| Contract / compliance | `anthropics-docx`, `zebbern-tos-clause-scanner`, `zebbern-regulatory-audit-generator` |
| Market / competitor research | `agent-reach`, `mattpocock-research`, `anthropics-claude-api` (if building AI features) |
| Scope / timeline | `zebbern-project-sizing-guide`, `zebbern-timeline-builder`, `addyosmani-spec-driven-development` |
| Security before launch | `usestrix-*` (needs Docker + key), `addyosmani-security-and-hardening`, `zebbern-secure-code-review` |
| Anything touching code | `graphify`, `ponytail` (do not over-engineer), `karpathy-guidelines`, `obra-*` |

## Domain guardrails
- Financial outputs: state assumptions, show base/best/worst, name the kill switches, reconcile totals (revenue − cost = P&L) before claiming done.
- Legal outputs: flag as draft needing counsel review; protect promoter interests; list must-have vs nice-to-have.
- Indonesia reality: IDR, PPN/PPh, local ticketing behavior, venue limits. Benchmark to global promoters but adapt locally.
- Bilingual: formal-warm ID+EN for official material; natural Indonesian for fandom channels.
- Burger business is a separate entity: do not mix its numbers, branding, or accounts with WithUs.
