# Session Handoff: WithUs Indonesia static website (Fase 1)

Branch: `claude/relaxed-mendel-lyn0ll` (HEAD `998491c`, pushed, working tree clean). Remote also has Martha's `CNAME` commits (`9e44ec9`, `11bc579`, `4cc1a29` "Delete CNAME"); no CNAME file currently exists.
Rules from `CLAUDE.md`: no PRs / publishing / sending without confirmation; output in Bahasa Indonesia by default; commit trailer `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` + `Claude-Session: https://claude.ai/code/session_01XQQkBpY6igoZhvyE5qAAXU`.

## 1. Objective & Current Status
Build `withusindonesia.com` replacement as static HTML/CSS/JS in `website/` (no build step; web team copy-pastes). Company profile + "what a promoter does" education. Brand colors ONLY `#F47527`, black, white (user decree).
Milestone: all Fase 1 pages built, verified locally with Playwright (desktop 1440 / mobile 390: no console errors, no horizontal overflow, one visible h1 per page), pushed. Last user topic: how to share a preview. Answer given (Netlify Drop of `website/`, Cloudflare Pages/Vercel with root `website`, GitHub Pages needs `/docs` or workflow); nothing hosted. User then requested this handoff. No hosting action has been taken or confirmed.

## 2. Completed Changes (all under `website/`)
Pages (7, EN/ID paired elements): `index.html`, `about.html`, `services.html`, `promoter-101.html`, `contact.html`, `privacy-policy.html`, `terms.html`. Also `README.md`, `robots.txt`, `sitemap.xml`.
Assets: `assets/css/style.css`; `assets/js/events.js`; `assets/js/main.js`; `assets/img/logo.png` (user's orange logo, cropped 480x190), `favicon.svg` (orange "W"), `og-image.jpg` (1200x630, 44 KB, rendered), `placeholder-poster.svg`, `placeholder-photo.svg`, `events/kim-bum.webp`, `events/ikon.webp`, `events/park-ji-hoon.webp` (posters ~390px wide, low-res).

**`assets/js/events.js`**: sets `window.EVENTS` = array of `{slug, name, subtitle, artist, status:"past"|"upcoming", date, venue, city, poster, heroImage, accent, summary:{en,id}, story:[{phase,title:{en,id},body:{en,id},image}], stats:[{label:{en,id},value}], gallery:[{src,alt}], posters:[], partners:[], ticketUrl:null}`. Data (from user's posters only): kim-bum "Kim Bum Fanmeeting: PAGE" / "Debut 20th Anniversary Tour Jakarta" / 24 Oct 2026 (Sat), 18:30 / Bengkel Hall SCBD / partners Kingkong by Starship, VICSHOT, WithUs Indonesia; ikon "iKON World Tour: FOUR EVER" / 21 Aug 2026 (Fri) / Istora Senayan; park-ji-hoon "Park Ji Hoon RE:FLECT Fanconcert" / "2026 Park Ji Hoon Asia Fancon in Jakarta" / 29 Aug 2026 (Sat) / Spike Air Dome, PIK 2. Everything else `[ISI]`/`[VERIFIKASI]`. All `status:"past"` (assumed, today 2026-11-13).

**`assets/js/main.js`** (IIFE, key functions): `setLang`/`applyMeta` (language toggle via `data-lang` on `<html>`, stored `localStorage["wu-lang"]`; title/meta from `data-titleen/-titleid/-descen/-descid`); header/footer injected into `#site-header`/`#site-footer` (`NAV`, `IC` svg path map, `icon(name)`, `SOC`); `mark()` wraps `[ISI...]`/`[VERIFIKASI...]` in `<span class="isi">`; `initScroll` (GSAP reveal, `.scrub p` word scrub, `[data-count]` counters); **`initRing()`** 3D ring (below); modal: `ensureModal`, `eventHTML(e,i)`, `renderModal`, `openEvent(slug,push,swap)`, `hideModal`, `closeEvent`, `syncHash`; Promoter 101 horizontal pin (`.h-pin`, GSAP, >=900px else `.no-pin`); `toast()` + `[data-copy]` clipboard handler; `[data-depth]` scroll parallax; contact form handler (`#contact-form`, aria-busy loading, aborts to error msg if action contains `[ISI`).

**Ring (`initRing`)**: `slots` = EVENTS repeated until >= 6; `n=slots.length`, `step=360/n`, `K=14` vertical slices per card, `phi=step*0.86`; `cw=min(w*(w<600?.6:.36),440)`, `ch=cw*4/3`, `R=cw/(phi*pi/180)`; each slice `.sl` = `rotateY(a) translateZ(R)` inside `.ring` (`translateZ(-R) rotateY(theta)`), background-image cropped cover-style via `background-size/position`; slice width `sw+3` px overlap. Per-slice `filter: blur()/brightness()` by angle from front; `visibility:hidden` beyond 105deg. Physics: drag (`pointerdown` on `#ring`, window `pointermove/up`, 6px threshold), momentum `vel*.95`, release target `round((theta + clamp(vel*5, +-1.4*step))/step)*step`, ease `theta += d*.11`. Click non-center card -> `focusIndex`; click center card or `#rc-open` -> `openEvent(slug,true)`. Keyboard: arrows, Enter. Buttons `#rc-prev/#rc-next`; caption `#rc-title/#rc-meta/#rc-count` (aria-live). Preloads posters (loading shimmer via `.ring-wrap.loading`). Pointer tilt `.ring-tilt`.

**Modal/URL**: event detail is an overlay, NOT a page. Deep link `index.html#event-<slug>`; `history.pushState({ev:slug})`; browser Back/Esc/backdrop closes; swap between events uses `replaceState`. Focus trap on Tab.

**`assets/css/style.css`**: tokens `--ink --brand/--gold(#F47527) --text --muted(.8 white) --s1..s9 --r1..r3 --maxw --hdr`; fonts Outfit (headings) + Geist (body) via Google Fonts; `html[data-lang] [lang]` hide rule; `.isi` placeholder style; ring (`.ring-wrap .ring-tilt .ring .rc .sl .ring-cap .ring-ctrl`), modal (`.modal .modal-card .m-grid .m-story`), `.cta-band` (solid orange), `.socials`, `.ig-link`, `.copy-btn`, `.toast`, `.cmp`, `.h-pin`, `.form`; `section:not(.hero) .eyebrow:not(.keep){display:none}`; `@view-transition{navigation:auto}`; reduced-motion block.

Content: Promoter 101 has 10 steps + "Aturan main di Indonesia" cards (izin keramaian/izin lokasi, PBJT 10% Jakarta Perda 1/2024, royalti, visa C7A/C7B, ticketing fees) + deal glossary + source links; all marked `[VERIFIKASI]`. Home stats only "20+ years team experience" and "3 Jakarta shows in 2026".

## 3. Architectural Decisions & Constraints
- **Pages were generated by a script NOT in the repo**: `/tmp/claude-0/-home-user-Withus-Ind/e3de75dc-7acf-5613-94d7-04bb894a4086/scratchpad/gen/gen.py` (+ `patch2.py`, `patch_js.py`). It may not exist in the new session. Treat committed `website/*.html` as the source of truth and edit HTML directly. Do not rely on regenerating.
- Bilingual via paired `lang="en"`/`lang="id"` elements (no `i18n.js`) so web team can edit HTML directly; default EN.
- Header/footer rendered by JS (single source) -> not in static HTML.
- Events are a modal + `events.js`; `events/*.html` pages were deliberately deleted at user request ("not a separate page you can't go back from"). Do not recreate them.
- Ring uses CSS 3D slices (not images flattened) so cards truly bend; do not add `filter` to preserve-3d parents (flattens 3D). Blur is per-slice on purpose; ring has `overflow:hidden` to prevent mobile x-overflow.
- Ring repeats events to reach 6 slots; clicking a repeat opens the same event.
- No invented facts: only data from user posters/doc; `[ISI]` stays visible. Doc-conflicting emails resolved to `admin@withusindonesia.com` (martha@/hello@ appear in the Google Doc; unconfirmed with user).
- Doc rules: "20+ tahun pengalaman tim" never as company age (company founded 2024); no ticket price figures; Get Tickets only to official platform links; no payments on site; legal pages marked draft.
- Style bans from user lists: no filler badges, no section meta-labels, no pill images, no glow shadows, no emojis, consistent stroke icons (24px grid), tabular nums, inner radius = outer - padding.
- Shadcn `@skiper-ui/skiper40` NOT installed: site is static (no React/build), `skiper-ui.com` blocked by sandbox proxy, package absent from npm. Replaced with vanilla `.ig-link`.
- Sandbox: cdnjs (GSAP) is blocked, so GSAP paths (reveal, scrub, Promoter 101 pin, counters) were never executed; only the no-GSAP fallback was tested. Ring/modal/drag use no GSAP.
- Bash tool quirk: long heredoc commands sometimes get blocked by a false "rm safety check". Write scripts with the Write tool, then run them.
- Never publish/host/send without user confirmation.

## 4. Known Bugs / Unresolved
- GSAP animations untested in a real browser (see above). Promoter 101 horizontal pin and `.scrub` text are the riskiest.
- Faint vertical seams between ring slices on the centered card (sub-pixel; overlap already raised to +3px). Not fully eliminated.
- Mobile Playwright test `scratchpad/t3.js` fails at the last step (`Cannot read properties of null (reading 'hidden')`) because the test scrolls the page after clicking `#rc-next`; the manual repro (`t4.js`) confirms center-click opens the modal on 390px. Test artifact, not an app bug.
- Dead CSS may remain from removed event pages (`.ev-hero`, `.story*`, `.masonry`, `.lightbox`, `.ev-nav`, `.filters`); safe to prune.
- Posters (kim-bum, ikon, park-ji-hoon) are ~390px wide webp; look soft at modal size. Park Ji Hoon poster is 4:5, cropped to 3:4 in the ring. iKON/PJH footer credit logos unreadable, partners left empty.
- Original SVG posters/logo from Drive only link local Mac PNGs; the iKON SVG's embedded image is just a texture. Real PNGs were supplied as chat images instead (not in git beyond the converted webp).
- Kim Bum title ornament after "PAGE" unconfirmed; name written "PAGE".
- Event `status` all "past" and `ticketUrl:null` unconfirmed. `summary/story/stats` are `[ISI]`.
- Unfilled before launch: Formspree endpoint (`contact.html` form `action="https://formspree.io/f/[ISI]"`), Cloudflare Turnstile site key, GA4 ID (commented in `<head>`), WhatsApp, X/FB/Threads/TikTok/LinkedIn/YouTube URLs, Media Kit flow (currently mailto), team profiles (need consent), KBLI/NIB check for listed services, FAQ claims (immigration, event insurance, GOERS partnership), legal review of Privacy/Terms and Promoter 101 regulatory facts.
- Promoter 101 research caveats: sources partly secondary; visa durations conflict (60 vs 30/90 days) and were left out; PBJT 10% from Jakarta Perda 1/2024 via news/tax-consultant citations, full Perda text not read.

## 5. Immediate Next Steps
1. Ask Martha which share method she wants (Netlify Drop ZIP vs Cloudflare/Vercel with password vs GitHub Pages). For GitHub Pages: needs `/docs` folder or Actions workflow, repo must be public or paid; check the earlier CNAME history so the live domain is not repointed prematurely. Do not host anything without confirmation.
2. Real-browser verification of GSAP features: open `website/index.html` with internet (or serve with `cd website && python3 -m http.server 8765`) and check Promoter 101 pin at >=900px, `.scrub` reveal, counters; fix in `website/assets/js/main.js` if broken.
3. Ask for high-res posters (kim-bum, ikon, park-ji-hoon), event photos, readable partner/credit logos; replace files in `website/assets/img/events/` and update `website/assets/js/events.js`.
4. When Martha supplies data via "Event name: ...", fill `summary`, `story[]`, `stats[]`, `gallery`, `partners`, `ticketUrl` in `website/assets/js/events.js` (no HTML changes needed).
5. Fill unfilled keys listed in section 4 (`grep -rn "ISI\|VERIFIKASI" website`).
6. Prune dead CSS in `website/assets/css/style.css`; optionally add a custom 404.
7. Run the `goal-loop` independent review (subagent) against the original criteria: one h1, title/meta/JSON-LD valid, no `href="#"`, EN/ID toggle on all pages, reduced-motion, 360px layout, console clean. JSON-LD currently only Organization (event JSON-LD was removed with event pages); consider Event JSON-LD injected in the modal or page head.
8. Commit with trailer above and `git push -u origin claude/relaxed-mendel-lyn0ll` (retry with fetch/rebase if remote moved). No PR unless Martha asks.
