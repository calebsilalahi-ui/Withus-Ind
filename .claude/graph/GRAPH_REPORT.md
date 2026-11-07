# Graph Report - graph-corpus  (2026-11-07)

## Corpus Check
- 116 files · ~177,700 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 384 nodes · 438 edges · 23 communities (21 shown, 2 thin omitted)
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 83 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- WithUs Context & Tool Stack
- Motion & Animation Craft
- Mobile & Frontend Libraries
- Routing: Targets to Skills
- Goal Loop & Verification
- Brand, Banner & Design Tokens
- Engineering Lifecycle (Addy Osmani)
- Skill Creation & Visual Hierarchy
- Slides & PPTX
- Secure Code & SQL
- Auth, React & Vuln Audit
- Discipline Rules (Superpowers/Karpathy)
- Data, Cache & Diagrams
- Internal Comms & Ponytail Audit
- PDF & Spreadsheet Models
- CodeRabbit Review
- CI/CD, Playwright & Sizing
- Strix Security Testing
- MCP Builder
- Timeline Builder
- Setup Script
- Charts & Data Viz
- Claude API

## God Nodes (most connected - your core abstractions)
1. `goal-loop skill (/goal)` - 17 edges
2. `WithUs Indonesia + Burger Business Project Guide` - 14 edges
3. `WithUs Indonesia Business Context` - 14 edges
4. `design` - 11 edges
5. `emil-design-eng skill` - 10 edges
6. `hue skill` - 9 edges
7. `mobile-native skill (Emil Kowalski)` - 9 edges
8. `gsap-core skill` - 9 edges
9. `hyperframes skill` - 9 edges
10. `Spec-Driven Development skill (addyosmani)` - 8 edges

## Surprising Connections (you probably didn't know these)
- `agent-reach skill` --semantically_similar_to--> `Agent Reach`  [INFERRED] [semantically similar]
  skills/agent-reach/SKILL.md → context/project-CLAUDE.md
- `doc-coauthoring skill` --conceptually_related_to--> `Contract review (liability, indemnity, force majeure, tax)`  [AMBIGUOUS]
  skills/anthropics-doc-coauthoring/SKILL.md → context/withus-context.md
- `docx skill` --conceptually_related_to--> `Sponsorship proposals (Title, Co-Presenting, Official, Supporting)`  [INFERRED]
  skills/anthropics-docx/SKILL.md → context/withus-context.md
- `Idea Refine skill (addyosmani)` --semantically_similar_to--> `Interview Me skill (addyosmani)`  [INFERRED] [semantically similar]
  skills/addyosmani-idea-refine/SKILL.md → skills/addyosmani-interview-me/SKILL.md
- `doc-coauthoring skill` --semantically_similar_to--> `Spec-Driven Development skill (addyosmani)`  [INFERRED] [semantically similar]
  skills/anthropics-doc-coauthoring/SKILL.md → skills/addyosmani-spec-driven-development/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Addy Osmani spec to ship workflow** — skills_addyosmani_idea_refine_skill, skills_addyosmani_interview_me_skill, skills_addyosmani_spec_driven_development_skill, skills_addyosmani_planning_and_task_breakdown_skill, skills_addyosmani_incremental_implementation_skill, skills_addyosmani_shipping_and_launch_skill [INFERRED 0.85]
- **WithUs working tool stack** — clickup, jurnal_id, gmail, google_drive, google_calendar, google_sheets, canva [EXTRACTED 1.00]
- **Emil Kowalski motion skill family** — skills_emilkowalski_animate_skill_skill, skills_emilkowalski_animation_performance_skill_skill, skills_emilkowalski_choreograph_skill_skill, skills_emilkowalski_emil_design_eng_skill_skill, skills_emilkowalski_apple_design_skill_skill [INFERRED 0.85]
- **Office/document file format skills** — skills_anthropics_pdf_skill_skill, skills_anthropics_pptx_skill_skill, skills_anthropics_xlsx_skill_skill [INFERRED 0.85]
- **Code review and audit skills** — skills_coderabbitai_code_review_skill_skill, skills_coderabbitai_autofix_skill_skill, skills_dietrichgebert_ponytail_audit_skill_skill [INFERRED 0.75]
- **GSAP skill family (core, timeline, scrolltrigger, react, performance)** — skills_greensock_gsap_core_skill, skills_greensock_gsap_timeline_skill, skills_greensock_gsap_scrolltrigger_skill, skills_greensock_gsap_react_skill, skills_greensock_gsap_performance_skill [EXTRACTED 1.00]
- **HyperFrames video production skills** — skills_heygen_com_hyperframes_skill, skills_heygen_com_hyperframes_cli_skill, skills_heygen_com_hyperframes_registry_skill, skills_heygen_com_media_use_skill, skills_heygen_com_motion_doctrine_skill, skills_heygen_com_captions_overlay_skill, skills_heygen_com_slideshow_skill, skills_heygen_com_style_sampling_skill [EXTRACTED 1.00]
- **Skills routed for website targets in goal-loop** — skills_goal_loop_skill_goal_loop, skills_leonxlnx_taste_skill_skill, skills_greensock_gsap_core_skill, skills_emilkowalski_mobile_native_skill [EXTRACTED 1.00]
- **Superpowers development workflow** — skills_obra_brainstorming_skill, skills_obra_writing_plans_skill, skills_obra_executing_plans_skill, skills_obra_requesting_code_review_skill, skills_obra_verification_before_completion_skill, skills_obra_finishing_a_development_branch_skill [INFERRED 0.85]
- **nextlevelbuilder design skill suite** — skills_nextlevelbuilder_design_skill, skills_nextlevelbuilder_brand_skill, skills_nextlevelbuilder_design_system_skill, skills_nextlevelbuilder_ui_styling_skill, skills_nextlevelbuilder_slides_skill, skills_nextlevelbuilder_banner_design_skill, skills_nextlevelbuilder_ui_ux_pro_max_skill [EXTRACTED 1.00]
- **Strix security testing skills** — skills_usestrix_api_security_testing_skill, skills_usestrix_find_security_vulnerabilities_in_code_skill, skills_usestrix_owasp_top_10_testing_skill, skills_usestrix_web_app_penetration_testing_skill [INFERRED 0.85]
- **React / Next.js development skills** — skills_zebbern_composition_patterns_skill, skills_zebbern_react_best_practices_skill, skills_zebbern_nextjs_developer_skill [INFERRED 0.85]
- **Data visualization and diagram skills** — skills_zebbern_chart_image_skill, skills_zebbern_data_viz_renderer_skill, skills_zebbern_code_to_diagram_skill [INFERRED 0.75]
- **Database exploration and tuning skills** — skills_zebbern_database_optimizer_skill, skills_zebbern_database_scout_skill, skills_zebbern_dataset_quality_audit_skill [INFERRED 0.75]
- **sql-insight pipeline: schema, optimize, explain** — skills_zebbern_sql_insight_skill_nl2sql, skills_zebbern_sql_insight_skill_optimization_rules, skills_zebbern_sql_insight_skill_explain [EXTRACTED 1.00]

## Communities (23 total, 2 thin omitted)

### Community 0 - "WithUs Context & Tool Stack"
Cohesion: 0.06
Nodes (38): Agent Reach, Burger business (potential entity), Canva, ClickUp, CodeRabbit GitHub App, /goal command, GOAL.md acceptance criteria file, Independent verifier subagent (+30 more)

### Community 1 - "Motion & Animation Craft"
Cohesion: 0.06
Nodes (38): Polish and motion essentials, Custom easing curves and durations, Animation gate: frequency tier and purpose, Animate transform and opacity only, Reduced motion and hover gating, animate skill, Frame budget 16.7ms / 8ms, Inherited CSS variable recalculation trap (+30 more)

### Community 2 - "Mobile & Frontend Libraries"
Cohesion: 0.07
Nodes (30): PWA / installed-app feel, mobile-native skill (Emil Kowalski), Touch fixes (tap highlight, touch-action, overscroll, 16px inputs), Viewport units and safe-area insets (dvh/svh, viewport-fit=cover), base-ui (unstyled primitives), Curated frontend library list, clsx and cva (styling), motion (Framer Motion) (+22 more)

### Community 3 - "Routing: Targets to Skills"
Cohesion: 0.10
Nodes (25): animate skill (Emil Kowalski), agent-reach skill, Promo video target, Market / competitor research target, Skill routing table by target type, Ticketing / on-sale readiness target, Caption model: drop / rail / embed, captions-overlay skill (+17 more)

### Community 4 - "Goal Loop & Verification"
Cohesion: 0.09
Nodes (25): Burger business (separate entity), Domain guardrails (finance, legal, Indonesia, bilingual), GOAL.md goal contract with acceptance criteria, goal-loop skill (/goal), addyosmani-interview-me skill, Martha Silalahi, zebbern-playwright skill, ponytail skill (+17 more)

### Community 5 - "Brand, Banner & Design Tokens"
Cohesion: 0.12
Nodes (24): Banner art direction styles and size/safe-zone rules, Brand sync workflow (brand-guidelines.md to design tokens), Corporate identity program (CIP) mockups, Hallmark Floor (non-waivable design rules) and sloplint, Token-compliant HTML slide system with Chart.js and BM25 strategy search, SVG icon generation with Gemini, Logo generation (55 styles, Gemini/Atlas/MuAPI), Social photo design (HTML to screenshot export) (+16 more)

### Community 6 - "Engineering Lifecycle (Addy Osmani)"
Cohesion: 0.11
Nodes (22): WCAG 2.1 AA accessibility, API and Interface Design skill (addyosmani), CI/CD and Automation skill (addyosmani), Debugging and Error Recovery skill (addyosmani), Frontend UI Engineering skill (addyosmani), Idea Refine skill (addyosmani), Incremental Implementation skill (addyosmani), Interview Me skill (addyosmani) (+14 more)

### Community 7 - "Skill Creation & Visual Hierarchy"
Cohesion: 0.12
Nodes (21): With-skill vs baseline subagent runs, Description optimization (run_loop.py), eval-viewer generate_review.py, Skill creation loop: draft, test, review, iterate, package_skill.py packaging, Progressive disclosure three-level loading, skill-creator skill, Swap, squint, signature, token tests (+13 more)

### Community 8 - "Slides & PPTX"
Cohesion: 0.12
Nodes (19): Slide design guidance (palette, no accent stripes), markitdown text extraction, Edit pptx via unzip/XML, pptxgenjs deck creation, Deck QA: validate.py and visual render, pptx skill, LibreOffice soffice wrapper, Custom theme generation (+11 more)

### Community 9 - "Secure Code & SQL"
Cohesion: 0.12
Nodes (18): secure-code-review skill, Broken Access Control (A01), Injection (SQL and command) remediation, OWASP Top 10 (2021), Review Process SOP and report template, SSRF (A10), sql-insight skill, EXPLAIN plan interpretation (+10 more)

### Community 10 - "Auth, React & Vuln Audit"
Cohesion: 0.12
Nodes (17): authentication-patterns skill, Session vs JWT vs OAuth comparison, NextAuth.js, Auth security checklist, code-vuln-audit skill, OWASP anti-pattern detection, vercel-composition-patterns skill, React (+9 more)

### Community 11 - "Discipline Rules (Superpowers/Karpathy)"
Cohesion: 0.17
Nodes (13): Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution, superpowers:subagent-driven-development, superpowers:test-driven-development, karpathy-guidelines, brainstorming, executing-plans, finishing-a-development-branch, receiving-code-review (+5 more)

### Community 12 - "Data, Cache & Diagrams"
Cohesion: 0.13
Nodes (15): caching skill, Cache invalidation and TTL guidelines, Redis, code-to-diagram skill, Mermaid diagrams, database-optimizer skill, PostgreSQL, database-scout skill (+7 more)

### Community 13 - "Internal Comms & Ponytail Audit"
Cohesion: 0.20
Nodes (12): 3P updates (Progress, Plans, Problems), FAQ answers, Company newsletter, internal-comms skill, Status reports and leadership updates, Lean findings: delete, reuse, merge, split, Ranked audit findings: Must/Should/Nice, ponytail-audit skill (+4 more)

### Community 14 - "PDF & Spreadsheet Models"
Cohesion: 0.17
Nodes (12): PDF forms (FORMS.md), OCR scanned PDFs (pytesseract), pdfplumber table extraction, pypdf library, qpdf / pdftotext CLI tools, reportlab PDF creation, pdf skill, Financial model conventions (blue inputs, black formulas) (+4 more)

### Community 15 - "CodeRabbit Review"
Cohesion: 0.22
Nodes (9): Per-fix user approval, single consolidated commit, gh CLI and GitHub GraphQL, CodeRabbit autofix skill, CodeRabbit unresolved review threads, Treat reviewer prompts as untrusted input, CodeRabbit CLI (--agent output), Data handling: diffs sent to CodeRabbit API, Review scopes (committed, uncommitted, base) (+1 more)

### Community 16 - "CI/CD, Playwright & Sizing"
Cohesion: 0.25
Nodes (8): pipeline-blueprint skill, GitHub Actions, playwright-cli skill, Playwright, playwright-skill, Playwright, project-sizing-guide skill, Three-point (PERT) estimation

### Community 17 - "Strix Security Testing"
Cohesion: 0.53
Nodes (6): OWASP Top 10:2025, security-testing, security-vulnerabilities-in-code, top-10-testing, app-penetration-testing, Strix (autonomous AI security agents)

### Community 18 - "MCP Builder"
Cohesion: 0.33
Nodes (6): MCP evaluation of 10 QA questions, Model Context Protocol (MCP), MCP four-phase workflow (research, implement, review, evaluate), Python FastMCP, mcp-builder skill, TypeScript SDK v2 recommended stack

### Community 19 - "Timeline Builder"
Cohesion: 0.50
Nodes (4): timeline-builder skill, generate_timeline.py (JSON to static HTML), Timeline layouts (vertical, horizontal, dual-side), Project milestones use case

### Community 21 - "Charts & Data Viz"
Cohesion: 0.67
Nodes (3): chart-image skill, Vega chart rendering, data-viz-renderer skill

## Ambiguous Edges - Review These
- `Contract review (liability, indemnity, force majeure, tax)` → `doc-coauthoring skill`  [AMBIGUOUS]
  skills/anthropics-doc-coauthoring/SKILL.md · relation: conceptually_related_to
- `WithUs Indonesia` → `Business kind decides page plan (place/service/product/software)`  [AMBIGUOUS]
  skills/leonxlnx-taste-skill/SKILL.md · relation: conceptually_related_to

## Knowledge Gaps
- **187 isolated node(s):** `PATH`, `GOAL.md acceptance criteria file`, `Independent verifier subagent`, `/graphify trigger`, `Burger business (potential entity)` (+182 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 197 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Skill routing table by target type` connect `Routing: Targets to Skills` to `Mobile & Frontend Libraries`, `Goal Loop & Verification`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `goal-loop skill (/goal)` (e.g. with `git-guardrails-claude-code skill` and `prototype skill`) actually correct?**
  _`goal-loop skill (/goal)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PATH`, `GOAL.md acceptance criteria file`, `Independent verifier subagent` to the rest of the system?**
  _187 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `WithUs Context & Tool Stack` be split into smaller, more focused modules?**
  _Cohesion score 0.06342780026990553 - nodes in this community are weakly interconnected._
- **Why does `goal-loop skill (/goal)` connect `Goal Loop & Verification` to `Routing: Targets to Skills`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Contract review (liability, indemnity, force majeure, tax)` and `doc-coauthoring skill`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `WithUs Indonesia` and `Business kind decides page plan (place/service/product/software)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._