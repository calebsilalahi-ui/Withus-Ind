/* WithUs Indonesia — Official Production Script
   Incorporating React Bits Architecture:
   - <CircularCarousel /> (3D Cylinder Event Stage)
   - <StaggeredMenu /> (GSAP Multi-layer Staggered Navigation)
   - <Stepper /> (Multi-step Interactive Contact Experience)
   Pure Vanilla JS / ES6 (No build step required). Grounded in Company Profile 2026. */

(function () {
  "use strict";

  const doc = document;
  const root = doc.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const base = "";

  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function lang() { return root.getAttribute("data-lang") || "en"; }
  function tr(o) { return typeof o === "string" ? o : (o && (o[lang()] || o.en)) || ""; }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  }
  function bi(en, id) {
    return `<span lang="en">${en}</span><span lang="id">${id}</span>`;
  }

  /* ==========================================================================
     1. LANGUAGE HANDLING & LOCALIZATION
     ========================================================================== */
  let savedLang;
  try { savedLang = localStorage.getItem("wu-lang"); } catch (e) {}
  root.setAttribute("data-lang", savedLang === "id" ? "id" : "en");
  root.lang = lang();

  function applyMeta() {
    const t = $("title");
    if (t && t.dataset["title" + lang()]) t.textContent = t.dataset["title" + lang()];
    const m = $('meta[name="description"]');
    if (m && m.dataset["desc" + lang()]) m.content = m.dataset["desc" + lang()];
  }

  function setLang(l) {
    root.setAttribute("data-lang", l);
    root.lang = l;
    try { localStorage.setItem("wu-lang", l); } catch (e) {}
    $$(".lang button, .sm-lang button").forEach(b => {
      b.setAttribute("aria-pressed", b.dataset.l === l);
    });
    applyMeta();
    if (window.CIRCULAR_CAROUSEL) window.CIRCULAR_CAROUSEL.updateCaptions();
    if (window.renderDynamicModal) window.renderDynamicModal();
  }

  /* ==========================================================================
     2. REACT BITS: <StaggeredMenu /> COMPONENT
     ========================================================================== */
  const NAV_ITEMS = [
    { href: "index.html", titleEn: "Home", titleId: "Beranda", num: "01" },
    { href: "index.html#events", titleEn: "Events", titleId: "Event", num: "02" },
    { href: "about.html", titleEn: "About", titleId: "Tentang", num: "03" },
    { href: "services.html", titleEn: "Services", titleId: "Layanan", num: "04" },
    { href: "promoter-101.html", titleEn: "Promoter 101", titleId: "Promoter 101", num: "05" },
    { href: "contact.html", titleEn: "Work WithUs", titleId: "Bekerja dengan WithUs", num: "06" }
  ];

  const SOCIAL_ITEMS = [
    { label: "Instagram", url: "https://www.instagram.com/withusind/" },
    { label: "X", url: "https://x.com/withusind" },
    { label: "Threads", url: "https://www.threads.com/@withusind" },
    { label: "TikTok", url: "https://www.tiktok.com/@withusindonesia" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/withusind/" },
    { label: "YouTube", url: "https://www.youtube.com/@withusind" },
    { label: "WhatsApp", url: "https://wa.me/628170288258?text=Hello%20Admin%20WithUs" },
    { label: "Email", url: "mailto:admin@withusindonesia.com" }
  ];

  const currentPage = (location.pathname.split("/").pop() || "index.html");

  function initHeaderAndMenu() {
    const headerEl = $("#site-header");
    if (!headerEl) return;

    headerEl.className = "site-header";
    headerEl.setAttribute("role", "banner");

    headerEl.innerHTML = `
      <div class="wrap header-wrap">
        <a class="brand" href="${base}index.html" aria-label="WithUs Indonesia">
          <img src="${base}assets/img/logo.png" width="138" height="54" alt="WithUs Indonesia">
        </a>
        <div class="header-actions">
          <button class="sm-toggle" id="sm-toggle-btn" aria-label="Open Navigation Menu" aria-expanded="false" aria-controls="sm-panel">
            <span class="sm-toggle-textWrap">
              <span class="sm-toggle-textInner">
                <span class="sm-toggle-line" id="sm-toggle-label">${bi("Menu", "Menu")}</span>
              </span>
            </span>
            <span class="sm-icon">
              <span class="sm-icon-line" id="sm-icon-top" style="transform: translateY(-4px)"></span>
              <span class="sm-icon-line" id="sm-icon-bot" style="transform: translateY(4px)"></span>
            </span>
          </button>
          <div class="lang" role="group" aria-label="Language">
            <button data-l="id" aria-pressed="${lang() === 'id'}">ID</button>
            <button data-l="en" aria-pressed="${lang() === 'en'}">EN</button>
          </div>
          <a class="btn primary header-cta" href="${base}contact.html">${bi("Work WithUs", "Bekerja dengan WithUs")}</a>
        </div>
      </div>
    `;

    // Inject StaggeredMenu overlay into body
    let menuWrapper = $("#staggered-menu-wrap");
    if (!menuWrapper) {
      menuWrapper = doc.createElement("div");
      menuWrapper.id = "staggered-menu-wrap";
      menuWrapper.className = "staggered-menu-wrapper fixed-wrapper";
      menuWrapper.setAttribute("aria-hidden", "true");
      menuWrapper.innerHTML = `
        <div class="sm-prelayers" aria-hidden="true">
          <div class="sm-prelayer" style="background:#14151f"></div>
          <div class="sm-prelayer" style="background:#F47527"></div>
          <div class="sm-prelayer" style="background:#070709"></div>
        </div>
        <aside class="staggered-menu-panel" id="sm-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;width:100%">
            <a href="${base}index.html" class="sm-logo" aria-label="WithUs Indonesia">
              <img src="${base}assets/img/logo.png" width="138" height="54" alt="WithUs Indonesia">
            </a>
            <div style="display:flex;align-items:center;gap:16px">
              <div class="lang sm-lang" role="group" aria-label="Language Switch">
                <button data-l="id" aria-pressed="${lang() === 'id'}">ID</button>
                <button data-l="en" aria-pressed="${lang() === 'en'}">EN</button>
              </div>
              <button class="sm-toggle" id="sm-close-btn" aria-label="Close Menu">
                <span class="sm-toggle-textWrap">
                  <span class="sm-toggle-line">${bi("Close", "Tutup")}</span>
                </span>
                <span class="sm-icon">
                  <span class="sm-icon-line" style="transform: rotate(45deg)"></span>
                  <span class="sm-icon-line" style="transform: rotate(-45deg)"></span>
                </span>
              </button>
            </div>
          </div>
          <div style="margin:auto 0;padding:24px 0">
            <ul class="sm-panel-list" role="list">
              ${NAV_ITEMS.map((item, idx) => `
                <li class="sm-panel-item">
                  <div class="sm-panel-itemWrap">
                    <a href="${base}${item.href}" class="sm-panel-link" data-index="${idx}"${item.href === currentPage ? ' aria-current="page"' : ""}>
                      <span class="sm-panel-link-num">${item.num}</span>
                      <span class="sm-panel-link-text">${bi(item.titleEn, item.titleId)}</span>
                    </a>
                  </div>
                </li>
              `).join("")}
            </ul>
          </div>
          <div class="sm-panel-footer" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;padding-top:20px;border-top:1px solid var(--line)">
            <div class="sm-socials" style="display:flex;gap:20px;flex-wrap:wrap">
              ${SOCIAL_ITEMS.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener" style="color:var(--muted);font-size:0.95rem;font-weight:600;transition:color 0.2s">${s.label}</a>
              `).join("")}
            </div>
            <p style="color:var(--subtle);font-size:0.85rem;margin:0">© ${new Date().getFullYear()} PT Harpa Ananta Sora · WithUs Indonesia</p>
          </div>
        </aside>
      `;
      doc.body.appendChild(menuWrapper);
      menuWrapper.inert = true;
    }

    let menuOpen = false;
    const toggleBtn = $("#sm-toggle-btn");
    const closeBtn = $("#sm-close-btn");
    const prelayers = $$(".sm-prelayer", menuWrapper);
    const panel = $(".staggered-menu-panel", menuWrapper);
    const links = $$(".sm-panel-link", menuWrapper);
    const socials = $$(".sm-socials a", menuWrapper);

    function toggleMenu(open) {
      menuOpen = typeof open === "boolean" ? open : !menuOpen;
      toggleBtn.setAttribute("aria-expanded", String(menuOpen));
      menuWrapper.setAttribute("aria-hidden", String(!menuOpen));
      if (menuOpen) {
        menuWrapper.setAttribute("data-open", "");
      } else {
        menuWrapper.removeAttribute("data-open");
      }
      menuWrapper.style.pointerEvents = menuOpen ? "auto" : "none";
      menuWrapper.inert = !menuOpen;

      if (window.gsap && !reduce) {
        if (menuOpen) {
          const tl = gsap.timeline();
          tl.set([prelayers, panel], { x: "100%" })
            .to(prelayers, {
              x: "0%",
              duration: 0.45,
              stagger: 0.08,
              ease: "power3.inOut"
            })
          .to(panel, {
            x: "0%",
            duration: 0.5,
            ease: "power3.out"
          }, "-=0.2")
          .fromTo(links, {
            y: 40,
            opacity: 0,
            rotateX: -30
          }, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "back.out(1.2)"
          }, "-=0.3")
          .fromTo(socials, {
            y: 20,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "power2.out"
          }, "-=0.2");
        } else {
          const tl = gsap.timeline();
          tl.to(panel, {
            x: "100%",
            duration: 0.4,
            ease: "power3.in"
          })
          .to(prelayers, {
            x: "100%",
            duration: 0.35,
            stagger: 0.05,
            ease: "power3.in"
          }, "-=0.2");
        }
      } else {
        panel.style.transform = menuOpen ? "translateX(0)" : "translateX(100%)";
        prelayers.forEach(l => l.style.transform = menuOpen ? "translateX(0)" : "translateX(100%)");
      }
    }

    toggleBtn.addEventListener("click", () => toggleMenu());
    if (closeBtn) closeBtn.addEventListener("click", () => toggleMenu(false));
    menuWrapper.addEventListener("click", e => {
      if (e.target.closest(".sm-panel-link")) toggleMenu(false);
    });
    doc.addEventListener("keydown", e => {
      if (e.key === "Escape" && menuOpen) toggleMenu(false);
    });

    headerEl.addEventListener("click", e => {
      const b = e.target.closest(".lang button");
      if (b) setLang(b.dataset.l);
    });
    menuWrapper.addEventListener("click", e => {
      const b = e.target.closest(".lang button");
      if (b) setLang(b.dataset.l);
    });
  }

  /* ==========================================================================
     3. REACT BITS: <CircularCarousel /> COMPONENT FOR EVENTS
     ========================================================================== */
  const PRESETS = {
    cylinder: {
      axis: "y",
      tilt: -5,
      perspective: 2500,
      curve: 1,
      spread: 1,
      inward: false,
      billboard: false,
      backfaces: true,
      window: 0
    },
    orbit: {
      axis: "y",
      tilt: -16,
      perspective: 1500,
      curve: 0,
      spread: 1.45,
      inward: false,
      billboard: true,
      backfaces: false,
      window: 0
    },
    wheel: {
      axis: "x",
      tilt: 0,
      perspective: 1800,
      curve: 0,
      spread: 1,
      inward: false,
      billboard: false,
      backfaces: true,
      window: 1.7
    },
    panorama: {
      axis: "y",
      tilt: 0,
      perspective: 1800,
      curve: 1,
      spread: 1,
      inward: true,
      billboard: false,
      backfaces: false,
      window: 0
    }
  };

  class CircularCarousel {
    constructor(container, options = {}) {
      this.container = container;
      this.options = Object.assign({
        preset: "cylinder",
        intro: "rise",
        cardWidth: 260,
        aspectRatio: 1,
        speed: 14,
        gap: 25,
        tilt: -5,
        perspective: 2500,
        curve: 1,
        captions: true,
        parallax: 0.3,
        depthFade: 0.55,
        fadeColor: "#070709",
        innerShade: 0.6,
        cornerRadius: 14,
        autoplay: "drift",
        draggable: true,
        momentum: 0.6,
        snap: true,
        pauseOnHover: true,
        focusOnClick: true
      }, options);

      this.layout = PRESETS[this.options.preset] || PRESETS.cylinder;
      this.axis = this.layout.axis;
      this.tiltValue = this.options.tilt !== undefined ? this.options.tilt : this.layout.tilt;
      this.curveValue = this.options.curve !== undefined ? this.options.curve : this.layout.curve;

      this.rawItems = window.EVENTS || [];
      if (!this.rawItems.length) return;

      // Duplicate items to 6 cards for an evenly spaced 360-degree cylinder
      this.items = this.rawItems.length < 5 ? [...this.rawItems, ...this.rawItems] : this.rawItems;
      this.count = this.items.length;
      this.step = 360 / this.count;

      this.angle = 0;
      this.targetAngle = 0;
      this.velocity = 0;
      this.isDragging = false;
      this.isHovered = false;
      this.lastPointerPos = 0;
      this.lastTime = 0;
      this.activeIndex = 0;
      this.introStart = performance.now();
      this.introDone = false;
      this.holdUntil = 0;

      this.pointer = { x: 0, y: 0, inside: false };
      this.yaw = 0;
      this.pitch = 0;

      this.buildDOM();
      this.computeDimensions();
      this.bindEvents();
      this.startLoop();
    }

    buildDOM() {
      this.container.classList.add("circular-carousel");
      this.container.setAttribute("data-shape", this.options.preset);
      this.container.setAttribute("data-axis", this.axis);
      if (this.options.draggable) this.container.setAttribute("data-draggable", "true");
      this.container.tabIndex = 0;

      this.container.innerHTML = `
        <div class="circular-carousel__view">
          <div class="circular-carousel__stage">
            <div class="circular-carousel__camera">
              <div class="circular-carousel__ring"></div>
            </div>
          </div>
        </div>
        <div class="circular-carousel__caption" aria-live="polite">
          <div class="circular-carousel__title"></div>
          <div class="circular-carousel__subtitle"></div>
          <div class="circular-carousel__count"></div>
        </div>
      `;

      this.stage = $(".circular-carousel__stage", this.container);
      this.camera = $(".circular-carousel__camera", this.container);
      this.ring = $(".circular-carousel__ring", this.container);
      this.captionTitle = $(".circular-carousel__title", this.container);
      this.captionSub = $(".circular-carousel__subtitle", this.container);
      this.captionCount = $(".circular-carousel__count", this.container);

      const TILES = this.tileCount = (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) ? 4 : 8;
      this.cards = [];
      this.items.forEach((item, i) => {
        const card = doc.createElement("div");
        card.className = "circular-carousel__card";
        card.dataset.index = i;
        card.dataset.slug = item.slug;
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", item.name);

        let tilesHtml = "";
        for (let t = 0; t < TILES; t++) {
          tilesHtml += `
            <div class="circular-carousel__tile" data-tile="${t}">
              <div class="circular-carousel__frame">
                <img class="circular-carousel__photo" src="${item.poster}" alt="${esc(item.name)}" draggable="false">
                <div class="circular-carousel__shade"></div>
                <div class="circular-carousel__inner"></div>
              </div>
            </div>
          `;
        }
        card.innerHTML = tilesHtml;
        this.ring.appendChild(card);
        this.cards.push(card);
      });

      this.container.setAttribute("data-ready", "true");
      this.updateCaptions();
    }

    computeDimensions() {
      const rect = this.container.getBoundingClientRect();
      const w = rect.width || 1200;
      const h = rect.height || 560;

      // Card sizing with mobile adaptation
      let cw = this.options.cardWidth;
      if (w < 480) cw = Math.min(cw, w * 0.72);
      else if (w < 768) cw = Math.min(cw, w * 0.52);

      const ch = cw / this.options.aspectRatio;
      this.cardW = Math.round(cw);
      this.cardH = Math.round(ch);
      const along = this.axis === "x" ? this.cardH : this.cardW;

      // Radius calculation from React Bits
      const n = Math.max(this.count, 3);
      const pitch = (along + this.options.gap) * this.layout.spread;
      const chord = pitch / (2 * Math.sin(Math.PI / n));
      const arc = (n * pitch) / (2 * Math.PI);
      this.radius = Math.max(chord + (arc - chord) * this.curveValue, along * 0.6);

      // Perspective for camera
      this.perspective = this.layout.inward
        ? this.radius
        : (this.options.perspective || this.layout.perspective || 1800);

      this.stage.style.perspective = `${this.perspective}px`;
      this.container.style.setProperty("--cc-radius", `${this.options.cornerRadius}px`);
      this.container.style.setProperty("--cc-fade", this.options.fadeColor);
      this.container.style.setProperty("--cc-inner", this.options.innerShade);

      // Fit calculation to ensure cards are framed perfectly
      const room = this.options.captions ? 76 : 0;
      const viewW = w * 0.94;
      const viewH = (h - room) * 0.92;
      let fit = 1;
      if (this.layout.inward) {
        const spanX = Math.max(this.cardW * 2.8, 1);
        const spanY = Math.max(this.cardH, 1);
        fit = Math.min(1, viewW / spanX, viewH / spanY);
      } else {
        fit = Math.min(1, viewW / (this.radius * 2.2), viewH / (this.cardH * 1.2));
      }
      this.fit = fit;
      this.drop = (h / fit) * 0.55 + this.cardH;
      const stageOffsetY = this.options.captions ? -20 : 0;
      this.stage.style.transform = `translateY(${stageOffsetY}px) scale(${fit})`;

      // Configure each card dimensions and bendable sliced tiles
      const TILES = this.tileCount || 8;
      const tileW = this.cardW / TILES;
      const bend = this.cardW / Math.max(0.001, this.curveValue);

      this.cards.forEach((card, i) => {
        const base = i * this.step;
        card.style.width = `${this.cardW}px`;
        card.style.height = `${this.cardH}px`;
        card.style.left = `${-this.cardW / 2}px`;
        card.style.top = `${-this.cardH / 2}px`;

        const z = this.layout.inward ? -this.radius : this.radius;
        card.style.transform = `rotateY(${base}deg) translateZ(${z}px)`;

        const tiles = $$(".circular-carousel__tile", card);
        tiles.forEach((tile, t) => {
          tile.style.width = `${tileW + 0.6}px`;
          tile.style.height = `${this.cardH}px`;
          tile.style.left = `${t * tileW}px`;
          tile.style.top = "0px";

          if (this.curveValue > 0) {
            const center = (t + 0.5) * tileW - this.cardW / 2;
            const alpha = center / bend;
            const shift = bend * Math.sin(alpha);
            const sink = bend * (1 - Math.cos(alpha));
            const turn = (alpha * 180) / Math.PI;
            tile.style.transform = `translate3d(${shift - center}px, 0, ${-sink}px) rotateY(${turn}deg)`;
          } else {
            tile.style.transform = "none";
          }

          const r = this.options.cornerRadius;
          if (t === 0) {
            tile.style.borderTopLeftRadius = `${r}px`;
            tile.style.borderBottomLeftRadius = `${r}px`;
          } else if (t === TILES - 1) {
            tile.style.borderTopRightRadius = `${r}px`;
            tile.style.borderBottomRightRadius = `${r}px`;
          } else {
            tile.style.borderRadius = "0";
          }

          const frame = $(".circular-carousel__frame", tile);
          if (frame) {
            frame.style.width = `${this.cardW}px`;
            frame.style.height = `${this.cardH}px`;
            frame.style.transform = `translateX(${-t * tileW}px)`;
          }

          const photo = $(".circular-carousel__photo", tile);
          if (photo) {
            photo.style.width = `${this.cardW}px`;
            photo.style.height = `${this.cardH}px`;
          }
        });
      });
    }

    bindEvents() {
      window.addEventListener("resize", () => this.computeDimensions());
      const dragSign = this.layout.inward ? -1 : 1;

      if (this.options.draggable) {
        this.container.addEventListener("pointerdown", e => {
          if (e.button !== 0) return;
          this.isDragging = true;
          this.hasDragged = false;
          this.justDragged = false;
          this.pointerStartX = e.clientX;
          this.pointerStartY = e.clientY;
          this.container.setAttribute("data-dragging", "true");
          this.lastPointerPos = e.clientX;
          this.lastTime = performance.now();
          this.velocity = 0;
          this.dragStartCard = Math.round(this.angle / this.step) * this.step;
          try { this.container.setPointerCapture(e.pointerId); } catch (_) {}
        });

        this.container.addEventListener("pointermove", e => {
          const rect = this.container.getBoundingClientRect();
          if (e.pointerType !== "mouse") { this.pointer.inside = false; } else {
          this.pointer.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
          this.pointer.y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
          this.pointer.inside = true;
          }

          if (!this.isDragging) return;
          const dist = Math.hypot(e.clientX - this.pointerStartX, e.clientY - this.pointerStartY);
          if (dist > 6) {
            this.hasDragged = true;
          }

          const now = performance.now();
          const dt = Math.max(1, now - this.lastTime);
          const dx = e.clientX - this.lastPointerPos;
          this.lastPointerPos = e.clientX;
          this.lastTime = now;

          const perPixel = 180 / (Math.PI * this.radius * (this.fit || 1));
          const delta = dx * perPixel * dragSign;
          this.angle += delta;
          this.velocity = (delta / dt) * 1000;
        });

        const onUp = () => {
          if (!this.isDragging) return;
          this.isDragging = false;
          this.container.removeAttribute("data-dragging");
          this.holdUntil = performance.now() + 1800;
          if (this.hasDragged) {
            this.justDragged = true;
            setTimeout(() => {
              this.justDragged = false;
              this.hasDragged = false;
            }, 120);
          }
          if (this.options.snap) {
            // one swipe moves at most one card, then eases into place (no runaway spin)
            const fling = Math.max(-this.step * 0.6, Math.min(this.step * 0.6, this.velocity * 0.12));
            const nearest = this.dragStartCard !== undefined ? this.dragStartCard : Math.round(this.angle / this.step) * this.step;
            let target = Math.round((this.angle + fling) / this.step) * this.step;
            target = Math.max(nearest - this.step, Math.min(nearest + this.step, target));
            this.targetAngle = target;
            this.velocity = 0;
          }
        };

        this.container.addEventListener("pointerup", onUp);
        this.container.addEventListener("pointercancel", onUp);
      }

      this.container.addEventListener("wheel", e => {
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
        if (!delta) return;
        e.preventDefault();
        const perPixel = 180 / (Math.PI * this.radius * (this.fit || 1));
        this.angle -= delta * perPixel * dragSign;
        this.velocity = -delta * perPixel * dragSign * 20;
        this.holdUntil = performance.now() + 1500;
      }, { passive: false });

      if (this.options.pauseOnHover) {
        this.container.addEventListener("pointerenter", () => { this.isHovered = true; });
        this.container.addEventListener("pointerleave", () => {
          this.isHovered = false;
          this.pointer.inside = false;
        });
      }

      this.container.addEventListener("click", e => {
        if (this.hasDragged || this.justDragged) {
          this.hasDragged = false;
          this.justDragged = false;
          return;
        }

        let card = e.target.closest(".circular-carousel__card");
        if (!card && e.clientX && e.clientY) {
          card = doc.elementFromPoint(e.clientX, e.clientY)?.closest(".circular-carousel__card");
        }
        if (!card) return;
        const idx = parseInt(card.dataset.index, 10);
        const cardAngle = -idx * this.step;
        this.targetAngle = cardAngle;
        this.holdUntil = performance.now() + 2500;

        const slug = card.dataset.slug;
        if (slug && window.openEventModal) {
          window.openEventModal(slug);
        }
      });

      this.container.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") { this.stepBy(-1); }
        else if (e.key === "ArrowRight") { this.stepBy(1); }
        else if (e.key === "Enter") {
          const item = this.items[this.activeIndex];
          if (item && window.openEventModal) window.openEventModal(item.slug);
        }
      });
    }

    stepBy(delta) {
      const dragSign = this.layout.inward ? -1 : 1;
      const cur = this.targetAngle !== undefined ? this.targetAngle : Math.round(this.angle / this.step) * this.step;
      this.targetAngle = cur - delta * this.step * dragSign;
      this.holdUntil = performance.now() + 2500;
    }

    startLoop() {
      let last = performance.now();
      this.onScreen = true;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(en => { this.onScreen = en[0].isIntersecting; }, { rootMargin: "100px" }).observe(this.container);
      }
      const loop = now => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        this.frameDt = dt;
        if (!this.onScreen || doc.hidden) { requestAnimationFrame(loop); return; }

        const paused = (this.options.pauseOnHover && this.isHovered) || this.isDragging || now < this.holdUntil;

        if (!this.isDragging) {
          if (Math.abs(this.velocity) > 0.05) {
            this.angle += this.velocity * dt;
            this.velocity *= Math.pow(0.2, dt);
            if (Math.abs(this.velocity) <= 0.05 && this.options.snap) {
              this.targetAngle = Math.round(this.angle / this.step) * this.step;
            }
          } else if (this.options.snap && this.targetAngle !== undefined && Math.abs(this.targetAngle - this.angle) > 0.01) {
            this.angle += (this.targetAngle - this.angle) * Math.min(1, dt * 7);
          } else if (this.options.autoplay === "drift" && !paused && !reduce) {
            const dragSign = this.layout.inward ? -1 : 1;
            this.angle -= this.options.speed * dt * dragSign;
          }
        }

        this.render(now);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    render(now) {
      const dt = this.frameDt || 1 / 60;
      const elapsed = this.introStart ? now - this.introStart : 0;
      if (elapsed > 1800) this.introDone = true;

      // Parallax smooth interpolation
      const ease = 1 - Math.exp(-dt / 0.35);
      const aimYaw = this.pointer.inside ? this.pointer.x * this.options.parallax * 9 : 0;
      const aimPitch = this.pointer.inside ? -this.pointer.y * this.options.parallax * 6 : 0;
      this.yaw += (aimYaw - this.yaw) * ease;
      this.pitch += (aimPitch - this.pitch) * ease;

      // Camera and ring transforms
      if (this.layout.inward) {
        this.camera.style.transform = `translate3d(0, 0, ${this.perspective - 1}px) rotateX(${this.tiltValue + this.pitch}deg) rotateY(${this.yaw}deg)`;
        this.ring.style.transform = `rotateY(${this.angle}deg)`;
      } else {
        const cam = `translate3d(0, 0, ${-this.radius}px) rotateX(${(this.tiltValue + this.pitch).toFixed(2)}deg) rotateY(${this.yaw.toFixed(2)}deg)`;
        if (this._cam !== cam) { this.camera.style.transform = cam; this._cam = cam; }
        this.ring.style.transform = `rotateY(${this.angle.toFixed(3)}deg)`;
      }

      // Card positioning, intro rise effect, and depth fade
      this.cards.forEach((card, i) => {
        const base = i * this.step;
        const world = ((((base + this.angle) % 360) + 540) % 360) - 180;
        const absWorld = Math.abs(world);

        // Intro 'rise' animation from below
        let lift = 0;
        if (!this.introDone && this.options.intro === "rise" && !reduce) {
          const delay = (absWorld / 180) * 480;
          const cardElapsed = Math.max(0, elapsed - delay);
          const p = 1 - Math.pow(1 - Math.min(1, cardElapsed / 900), 5); // easeOutQuint
          lift = (1 - p) * (this.drop || 300);
        }

        const z = this.layout.inward ? -this.radius : this.radius;
        let tf = `rotateY(${base}deg) translateZ(${z}px)`;
        if (lift) tf += ` translateY(${lift.toFixed(1)}px)`;
        if (card._tf !== tf) { card.style.transform = tf; card._tf = tf; }

        // Visibility & depth fade
        if (this.layout.inward) {
          card.style.visibility = absWorld > 86 ? "hidden" : "";
          const facing = Math.cos(world * Math.PI / 180);
          const fade = 0.42 * Math.pow((1 - facing) / 2, 0.9);
          card.style.setProperty("--cc-depth", fade.toFixed(3));
        } else {
          // In cylinder preset, cards wrap the 3D ring with visible inner shaded faces
          // cards past the side are hidden: no back faces fighting the front ones
          const vis = absWorld > 100 ? "hidden" : "";
          if (card._vis !== vis) { card.style.visibility = vis; card._vis = vis; }
          const facing = Math.cos(world * Math.PI / 180);
          const fade = facing > 0
            ? this.options.depthFade * Math.pow((1 - facing), 1.2)
            : this.options.depthFade * 0.85;
          const d = Math.min(1, Math.max(0, fade)).toFixed(2);
          if (card._d !== d) { card.style.setProperty("--cc-depth", d); card._d = d; }
        }
      });

      // Front-most card tracking
      const rawIdx = (Math.round(-this.angle / this.step) % this.count + this.count) % this.count;
      if (rawIdx !== this.activeIndex) {
        this.activeIndex = rawIdx;
        this.updateCaptions();
        this.cards.forEach((c, idx) => c.classList.toggle("is-active", idx === rawIdx));
      }
    }

    updateCaptions() {
      const item = this.items[this.activeIndex];
      if (!item) return;

      const realIndex = (this.rawItems.findIndex(e => e.slug === item.slug) + 1) || 1;
      const totalReal = this.rawItems.length;

      this.captionTitle.textContent = item.name;
      this.captionSub.textContent = `${item.venue} · ${item.date}`;
      this.captionCount.innerHTML = `
        <span class="circular-carousel__digit">0${realIndex}</span>
        <span class="circular-carousel__slash">/</span>
        <span>0${totalReal}</span>
      `;

      const dockBtn = $("#rc-open");
      if (dockBtn) {
        dockBtn.dataset.slug = item.slug;
      }
    }
  }

  /* ==========================================================================
     4. REACT BITS: <Stepper /> COMPONENT FOR CONTACT
     ========================================================================== */
  class ContactStepper {
    constructor(element) {
      this.container = element;
      this.currentStep = 0;
      this.stepsCount = 4;
      this.data = {
        scope: "Concert Touring & Promotion",
        name: "",
        organization: "",
        email: "",
        phone: "",
        country: "Indonesia",
        date: "",
        venueTier: "Arena / Stadium",
        budget: "$50,000 - $150,000",
        message: ""
      };

      this.buildDOM();
      this.bindEvents();
      this.updateStep(0);
    }

    buildDOM() {
      this.container.className = "stepper stepper--framed stepper--withus";
      this.container.innerHTML = `
        <div class="stepper__rim"></div>
        <div class="stepper__header stepper__header--dots">
          <div class="stepper__track">
            <div class="stepper__glider"></div>
            <button class="stepper__segment" data-step="0">
              <span class="stepper__badge">1</span>
              <span class="stepper__title">${bi("Scope", "Lingkup")}</span>
            </button>
            <button class="stepper__segment" data-step="1">
              <span class="stepper__badge">2</span>
              <span class="stepper__title">${bi("Contact", "Kontak")}</span>
            </button>
            <button class="stepper__segment" data-step="2">
              <span class="stepper__badge">3</span>
              <span class="stepper__title">${bi("Details", "Detail")}</span>
            </button>
            <button class="stepper__segment" data-step="3">
              <span class="stepper__badge">4</span>
              <span class="stepper__title">${bi("Review", "Kirim")}</span>
            </button>
          </div>
        </div>

        <div class="stepper__body" style="padding:24px 16px 8px">
          <!-- Step 1: Scope -->
          <div class="stepper__step" data-step-panel="0">
            <div class="step-content">
              <div>
                <h3 style="font-size:1.4rem;margin-bottom:6px">${bi("Select Project Scope", "Pilih Lingkup Proyek")}</h3>
                <p style="color:var(--muted);font-size:0.95rem">${bi("Tell us how WithUs Indonesia can support your vision.", "Ceritakan bagaimana WithUs Indonesia dapat mendukung rencana Anda.")}</p>
              </div>
              <div class="scope-grid" role="radiogroup" aria-label="Project scope">
                <div class="scope-card is-selected" data-scope="Concert Touring & Promotion" role="radio" tabindex="0" aria-checked="true">
                  <h4>${bi("Concert Touring & Promotion", "Promotor & Tur Konser")}</h4>
                  <p>${bi("Full-scale live concert, fan-con or tour management across Jakarta arenas.", "Pengelolaan konser langsung, fan-con, atau tur di arena Jakarta.")}</p>
                </div>
                <div class="scope-card" data-scope="Artist Booking & Representation" role="radio" tabindex="0" aria-checked="false">
                  <h4>${bi("Artist Booking & Management", "Booking & Manajemen Artis")}</h4>
                  <p>${bi("Securing global Korean/international talent for domestic appearances.", "Menghadirkan artis global/Korea untuk kegiatan dan kampanye di Indonesia.")}</p>
                </div>
                <div class="scope-card" data-scope="IP Licensing & Exhibitions" role="radio" tabindex="0" aria-checked="false">
                  <h4>${bi("IP Licensing & Exhibitions", "Lisensi IP & Pameran")}</h4>
                  <p>${bi("D'FESTA style pop-ups, entertainment showcases, and brand activations.", "Pameran eksklusif bergaya D'FESTA, aktivasi brand, dan lisensi IP hiburan.")}</p>
                </div>
                <div class="scope-card" data-scope="Production & Consultancy" role="radio" tabindex="0" aria-checked="false">
                  <h4>${bi("Technical Production Management", "Manajemen Produksi Teknis")}</h4>
                  <p>${bi("CAD technical plots, sound, lighting, rigging, and stage engineering.", "Perencanaan teknis CAD, tata suara, tata cahaya, rigging, dan panggung.")}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Contact Info -->
          <div class="stepper__step" data-step-panel="1" style="display:none">
            <div class="step-content">
              <div>
                <h3 style="font-size:1.4rem;margin-bottom:6px">${bi("Client & Partner Details", "Data Klien & Mitra")}</h3>
                <p style="color:var(--muted);font-size:0.95rem">${bi("Who should our executive leadership reply to?", "Siapa yang dapat kami hubungi untuk diskusi lebih lanjut?")}</p>
              </div>
              <div class="input-grid">
                <div class="field-group">
                  <label for="step-name">${bi("Full Name *", "Nama Lengkap *")}</label>
                  <input type="text" id="step-name" autocomplete="name" aria-describedby="step-name-err" placeholder="e.g. Min-woo Kim / Sarah Pratama" required><p class="field-err" id="step-name-err" role="alert" hidden></p>
                </div>
                <div class="field-group">
                  <label for="step-org">${bi("Organization / Agency (optional)", "Organisasi / Agensi (opsional)")}</label>
                  <input type="text" id="step-org" autocomplete="organization" aria-describedby="step-org-err" placeholder="e.g. Entertainment Agency / Brand">
                </div>
                <div class="field-group">
                  <label for="step-email">${bi("Email Address *", "Alamat Email *")}</label>
                  <input type="email" id="step-email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" aria-describedby="step-email-err" placeholder="name@company.com" required><p class="field-err" id="step-email-err" role="alert" hidden></p>
                </div>
                <div class="field-group">
                  <label for="step-phone">${bi("WhatsApp / Phone (with Country Code) *", "WhatsApp / Nomor Telepon *")}</label>
                  <input type="tel" id="step-phone" autocomplete="tel" inputmode="tel" aria-describedby="step-phone-err" placeholder="+62 / +82 ..." required><p class="field-err" id="step-phone-err" role="alert" hidden></p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Details & Budget -->
          <div class="stepper__step" data-step-panel="2" style="display:none">
            <div class="step-content">
              <div>
                <h3 style="font-size:1.4rem;margin-bottom:6px">${bi("Project Specifications", "Spesifikasi Proyek")}</h3>
                <p style="color:var(--muted);font-size:0.95rem">${bi("Timeline, venue preferences, and preliminary budget.", "Waktu pelaksanaan, pilihan venue, dan estimasi anggaran.")}</p>
              </div>
              <div class="input-grid">
                <div class="field-group">
                  <label for="step-date">${bi("Target Timeline / Quarter", "Target Waktu / Kuartal")}</label>
                  <input type="text" id="step-date" placeholder="e.g. Q3 2026 / November 2026">
                </div>
                <div class="field-group">
                  <label for="step-venue">${bi("Preferred Venue Tier", "Pilihan Kapasitas Venue")}</label>
                  <select id="step-venue">
                    <option value="Arena / Stadium (5,000 - 15,000+ pax)">Arena / Stadium (Istora, Indonesia Arena, etc.)</option>
                    <option value="Mid-tier Dome / Hall (2,000 - 5,000 pax)">Mid-tier Dome / Hall (SPIKE Air Dome PIK 2, etc.)</option>
                    <option value="Intimate Ballroom / Theater (500 - 1,500 pax)">Intimate Ballroom / Theater (Bengkel SCBD, Kempinski)</option>
                    <option value="Brand Exhibition / Pop-up Space">Brand Exhibition / Pop-up Space</option>
                  </select>
                </div>
              </div>
              <div class="field-group">
                <label for="step-budget">${bi("Estimated Budget Range", "Estimasi Kisaran Anggaran")}</label>
                <select id="step-budget">
                  <option value="Under $50,000 (< IDR 800 Juta)">Under $50,000 (< IDR 800 Juta)</option>
                  <option value="$50,000 - $150,000 (IDR 800 Jt - 2.4 Miliar)" selected>$50,000 - $150,000 (IDR 800 Jt - 2.4 Miliar)</option>
                  <option value="$150,000 - $500,000 (IDR 2.4 - 8 Miliar)">$150,000 - $500,000 (IDR 2.4 - 8 Miliar)</option>
                  <option value="$500,000+ (> IDR 8 Miliar)">$500,000+ (> IDR 8 Miliar)</option>
                </select>
              </div>
              <div class="field-group">
                <label for="step-message">${bi("Project Brief / Message *", "Ringkasan Proyek / Pesan *")}</label>
                <textarea id="step-message" aria-describedby="step-message-err" placeholder="${lang() === 'id' ? 'Ceritakan mengenai artis, konsep pertunjukan, dan kebutuhan Anda...' : 'Tell us about the artist, concept, and required deliverables...'}" required></textarea><p class="field-err" id="step-message-err" role="alert" hidden></p>
              </div>
            </div>
          </div>

          <!-- Step 4: Summary & Dispatch -->
          <div class="stepper__step" data-step-panel="3" style="display:none">
            <div class="step-content">
              <div>
                <h3 style="font-size:1.4rem;margin-bottom:6px">${bi("Review and send on WhatsApp", "Tinjau dan kirim lewat WhatsApp")}</h3>
                <p style="color:var(--muted);font-size:0.95rem">${bi("Check your details below, then send them to Admin WithUs on WhatsApp.", "Periksa data Anda di bawah, lalu kirim ke Admin WithUs lewat WhatsApp.")}</p>
              </div>
              <div class="summary-box" id="step-summary">
                <!-- Dynamically populated -->
              </div>
              <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px">
                <a class="wa-vip-cta wa-send" id="btn-wa-vip" href="#" target="_blank" rel="noopener">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
                  <span>${bi("Send inquiry via WhatsApp", "Kirim permintaan lewat WhatsApp")}</span>
                </a>
                <p class="wa-help">${bi("Opens WhatsApp with your details already written. Press send there to reach Admin WithUs (+62 817-0288-258). We reply within 1-2 business days.", "Membuka WhatsApp dengan data Anda yang sudah tertulis. Tekan kirim di sana untuk menghubungi Admin WithUs (+62 817-0288-258). Kami membalas dalam 1-2 hari kerja.")}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="stepper__footer stepper-nav">
          <button class="btn ghost" id="stepper-btn-back" style="visibility:hidden">
            ← ${bi("Back", "Kembali")}
          </button>
          <div style="display:flex;align-items:center;gap:12px">
            <span id="stepper-step-indicator" style="font-size:0.85rem;color:var(--muted)">Step 1 of 4</span>
            <button class="btn primary" id="stepper-btn-next">
              ${bi("Continue", "Lanjutkan")} →
            </button>
          </div>
        </div>
      `;

      this.glider = $(".stepper__glider", this.container);
      this.segments = $$(".stepper__segment", this.container);
      this.stepPanels = $$(".stepper__step", this.container);
      this.btnBack = $("#stepper-btn-back", this.container);
      this.btnNext = $("#stepper-btn-next", this.container);
      this.stepIndicator = $("#stepper-step-indicator", this.container);
    }

    bindEvents() {
      // Scope card selection
      const scopeCards = $$(".scope-card", this.container);
      scopeCards.forEach(card => {
        const pick = () => {
          scopeCards.forEach(c => { c.classList.remove("is-selected"); c.setAttribute("aria-checked", "false"); });
          card.classList.add("is-selected");
          card.setAttribute("aria-checked", "true");
          this.data.scope = card.dataset.scope;
        };
        card.addEventListener("click", pick);
        card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
      });

      ["step-name", "step-email", "step-phone", "step-message"].forEach(id => {
        const el = $("#" + id, this.container);
        if (el) el.addEventListener("input", () => { if (el.getAttribute("aria-invalid")) this.fieldError(id, ""); });
      });

      // Navigation buttons
      this.btnNext.addEventListener("click", () => {
        if (this.validateStep(this.currentStep)) {
          this.updateStep(this.currentStep + 1);
        }
      });

      this.btnBack.addEventListener("click", () => {
        if (this.currentStep > 0) {
          this.updateStep(this.currentStep - 1);
        }
      });

      this.segments.forEach((seg, idx) => {
        seg.addEventListener("click", () => {
          if (idx <= this.currentStep || this.validateStep(this.currentStep)) {
            this.updateStep(idx);
          }
        });
      });

    }

    fieldError(id, msg) {
      const input = $("#" + id, this.container), err = $("#" + id + "-err", this.container);
      if (!input || !err) return;
      if (msg) { err.textContent = msg; err.hidden = false; input.setAttribute("aria-invalid", "true"); }
      else { err.textContent = ""; err.hidden = true; input.removeAttribute("aria-invalid"); }
    }

    // Postel's law: accept loose input, store a clean version
    normalizePhone(v) {
      let p = v.replace(/[^\d+]/g, "");
      if (/^0\d{8,}$/.test(p)) p = "+62" + p.slice(1);
      else if (/^62\d{8,}$/.test(p)) p = "+" + p;
      return p;
    }

    validateStep(step) {
      let firstBad = null;
      const check = (id, ok, msg) => { this.fieldError(id, ok ? "" : msg); if (!ok && !firstBad) firstBad = id; };
      if (step === 1) {
        const name = $("#step-name", this.container).value.trim().replace(/\s+/g, " ");
        const email = $("#step-email", this.container).value.trim().toLowerCase();
        const phoneRaw = $("#step-phone", this.container).value.trim();
        const phone = this.normalizePhone(phoneRaw);
        check("step-name", name.length > 1, tr({ en: "Please enter your name.", id: "Mohon isi nama Anda." }));
        check("step-email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), tr({ en: "Check the email address, e.g. name@company.com.", id: "Periksa alamat email, contoh: nama@perusahaan.com." }));
        check("step-phone", phone.replace(/\D/g, "").length >= 8, tr({ en: "Enter a WhatsApp or phone number with at least 8 digits.", id: "Isi nomor WhatsApp atau telepon minimal 8 digit." }));
        if (firstBad) { $("#" + firstBad, this.container).focus(); return false; }
        this.data.name = name;
        this.data.organization = $("#step-org", this.container).value.trim();
        this.data.email = email;
        this.data.phone = phone;
      } else if (step === 2) {
        const msg = $("#step-message", this.container).value.trim();
        check("step-message", msg.length > 0, tr({ en: "Add a short brief: artist, date, or what you need.", id: "Tambahkan ringkasan singkat: artis, tanggal, atau kebutuhan Anda." }));
        if (firstBad) { $("#" + firstBad, this.container).focus(); return false; }
        this.data.date = $("#step-date", this.container).value.trim();
        this.data.venueTier = $("#step-venue", this.container).value;
        this.data.budget = $("#step-budget", this.container).value;
        this.data.message = msg;
      }
      return true;
    }

    updateStep(targetIndex) {
      this.currentStep = Math.max(0, Math.min(this.stepsCount - 1, targetIndex));

      // Update segment badges and glider
      this.segments.forEach((seg, i) => {
        const badge = $(".stepper__badge", seg);
        if (i < this.currentStep) {
          seg.classList.add("is-complete");
          seg.classList.remove("is-active");
          badge.textContent = "✓";
        } else if (i === this.currentStep) {
          seg.classList.add("is-active");
          seg.classList.remove("is-complete");
          badge.textContent = String(i + 1);
        } else {
          seg.classList.remove("is-active", "is-complete");
          badge.textContent = String(i + 1);
        }
      });

      // Show/hide step panels
      this.stepPanels.forEach((panel, i) => {
        panel.style.display = i === this.currentStep ? "block" : "none";
      });

      // Controls visibility
      this.btnBack.style.visibility = this.currentStep > 0 ? "visible" : "hidden";
      this.btnNext.style.display = this.currentStep < this.stepsCount - 1 ? "inline-flex" : "none";
      this.stepIndicator.textContent = tr({ en: `Step ${this.currentStep + 1} of ${this.stepsCount}`, id: `Langkah ${this.currentStep + 1} dari ${this.stepsCount}` });

      // Populate review summary on step 4
      if (this.currentStep === 3) {
        this.renderSummary();
      }
    }

    renderSummary() {
      const summaryEl = $("#step-summary", this.container);
      if (!summaryEl) return;

      summaryEl.innerHTML = `
        <div class="summary-row"><dt>${bi("Project Scope", "Lingkup Proyek")}</dt><dd>${esc(this.data.scope)}</dd></div>
        <div class="summary-row"><dt>${bi("Contact Person", "Nama Kontak")}</dt><dd>${esc(this.data.name)} (${esc(this.data.organization || "Independent")})</dd></div>
        <div class="summary-row"><dt>${bi("Email & Phone", "Email & Telepon")}</dt><dd>${esc(this.data.email)} · ${esc(this.data.phone)}</dd></div>
        <div class="summary-row"><dt>${bi("Target Timeline", "Target Waktu")}</dt><dd>${esc(this.data.date || "Flexible / TBD")}</dd></div>
        <div class="summary-row"><dt>${bi("Venue Preference", "Pilihan Venue")}</dt><dd>${esc(this.data.venueTier)}</dd></div>
        <div class="summary-row"><dt>${bi("Budget Range", "Kisaran Anggaran")}</dt><dd style="color:var(--brand)">${esc(this.data.budget)}</dd></div>
        <div style="margin-top:6px;font-size:0.88rem;color:var(--muted)">
          <span style="font-weight:600;color:#fff">${bi("Brief:", "Catatan:")}</span> "${esc(this.data.message)}"
        </div>
      `;

      // Pre-fill WhatsApp link to Admin WithUs (+62 817-0288-258)
      const waBtn = $("#btn-wa-vip", this.container);
      if (waBtn) {
        const d = this.data;
        const lines = [
          "*WITHUS INDONESIA INQUIRY*",
          "• Scope: " + d.scope,
          "• Name: " + d.name + (d.organization ? " (" + d.organization + ")" : ""),
          "• Email: " + d.email,
          "• Phone: " + d.phone,
          d.date ? "• Timeline: " + d.date : "",
          "• Venue: " + d.venueTier,
          "• Budget: " + d.budget,
          "• Brief: " + d.message
        ].filter(Boolean);
        const text = encodeURIComponent(lines.join("\n"));
        waBtn.href = `https://wa.me/628170288258?text=${text}`;
      }
    }
  }

  /* ==========================================================================
     5. EVENT MODAL WITH GALLERY
     ========================================================================== */
  /* ==========================================================================
     5. EVENT MODAL WITH GALLERY & FULL-SCALE IMAGE LIGHTBOX
     ========================================================================== */
  let openModalSlug = null;
  let closeTimeout = null;
  const modal = $("#ev-modal");

  /* --- Image Lightbox (Full-Scale Photo Popup) --- */
  let lightboxEl = null;
  let lightboxGallery = [];
  let lightboxIndex = 0;

  function initImageLightbox() {
    if (lightboxEl) return;
    lightboxEl = doc.createElement("div");
    lightboxEl.id = "image-lightbox";
    lightboxEl.className = "image-lightbox";
    lightboxEl.hidden = true;
    lightboxEl.setAttribute("aria-hidden", "true");
    lightboxEl.setAttribute("role", "dialog");
    lightboxEl.setAttribute("aria-modal", "true");
    lightboxEl.setAttribute("aria-label", "High Resolution Photo View");

    lightboxEl.innerHTML = `
      <div class="lightbox-backdrop" id="lightbox-backdrop"></div>
      <button class="lightbox-close" id="lightbox-close-btn" aria-label="Close photo view">✕</button>
      <button class="lightbox-nav lightbox-nav--prev" id="lightbox-prev-btn" aria-label="Previous photo">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <div class="lightbox-content">
        <img id="lightbox-img" class="lightbox-img" src="" alt="">
        <div id="lightbox-caption" class="lightbox-caption"></div>
      </div>
      <button class="lightbox-nav lightbox-nav--next" id="lightbox-next-btn" aria-label="Next photo">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg>
      </button>
    `;
    doc.body.appendChild(lightboxEl);

    $("#lightbox-close-btn", lightboxEl).addEventListener("click", closeImageLightbox);
    $("#lightbox-backdrop", lightboxEl).addEventListener("click", closeImageLightbox);
    $("#lightbox-prev-btn", lightboxEl).addEventListener("click", () => stepImageLightbox(-1));
    $("#lightbox-next-btn", lightboxEl).addEventListener("click", () => stepImageLightbox(1));
  }

  function openImageLightbox(images, startIndex = 0) {
    initImageLightbox();
    if (!images || !images.length) return;
    lightboxGallery = images;
    lightboxIndex = (startIndex + images.length) % images.length;

    updateLightboxView();
    lightboxEl.hidden = false;
    lightboxEl.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => lightboxEl.classList.add("show"));
  }

  function updateLightboxView() {
    if (!lightboxGallery.length || !lightboxEl) return;
    const item = lightboxGallery[lightboxIndex];
    const img = $("#lightbox-img", lightboxEl);
    const cap = $("#lightbox-caption", lightboxEl);
    const prevBtn = $("#lightbox-prev-btn", lightboxEl);
    const nextBtn = $("#lightbox-next-btn", lightboxEl);

    if (img) {
      img.src = item.src;
      img.alt = item.alt || "Event production photo";
    }
    if (cap) {
      const counter = lightboxGallery.length > 1 ? ` (${lightboxIndex + 1}/${lightboxGallery.length})` : "";
      cap.textContent = (item.alt || "Official Production Gallery") + counter;
    }
    if (prevBtn && nextBtn) {
      prevBtn.style.display = lightboxGallery.length > 1 ? "grid" : "none";
      nextBtn.style.display = lightboxGallery.length > 1 ? "grid" : "none";
    }
  }

  function stepImageLightbox(delta) {
    if (lightboxGallery.length <= 1) return;
    lightboxIndex = (lightboxIndex + delta + lightboxGallery.length) % lightboxGallery.length;
    updateLightboxView();
  }

  function closeImageLightbox() {
    if (!lightboxEl || lightboxEl.hidden) return;
    lightboxEl.classList.remove("show");
    setTimeout(() => {
      lightboxEl.hidden = true;
      lightboxEl.setAttribute("aria-hidden", "true");
    }, 280);
  }

  window.openImageLightbox = openImageLightbox;
  window.closeImageLightbox = closeImageLightbox;

  /* --- Event Modal Handling --- */
  function openEventModal(slug) {
    const event = (window.EVENTS || []).find(e => e.slug === slug);
    if (!event || !modal) return;
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    openModalSlug = slug;
    renderModalContent(event);
    modal.hidden = false;
    doc.body.style.overflow = "hidden";
    requestAnimationFrame(() => modal.classList.add("show"));
  }
  window.openEventModal = openEventModal;

  function closeEventModal() {
    if (!modal) return;
    modal.classList.remove("show");
    if (closeTimeout) clearTimeout(closeTimeout);
    closeTimeout = setTimeout(() => {
      modal.hidden = true;
      doc.body.style.overflow = "";
      openModalSlug = null;
      closeTimeout = null;
    }, 350);
  }

  function renderModalContent(event) {
    const card = $(".modal-card", modal);
    if (!card) return;

    const statsHtml = (event.stats || []).map(s => `
      <div style="flex:1;min-width:110px">
        <dt style="font-size:0.75rem;color:var(--brand);text-transform:uppercase;font-weight:700">${tr(s.label)}</dt>
        <dd style="font-size:1.8rem;font-weight:800;font-family:var(--f-head);color:#fff">${s.value}</dd>
      </div>
    `).join("");

    const partnersHtml = (event.partners || []).map(p => `<span>${p}</span>`).join(" · ");

    const galleryHtml = (event.gallery || []).map(g => `
      <img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" class="zoomable-event-photo" title="Click to view full size">
    `).join("");

    card.innerHTML = `
      <button class="modal-x" id="modal-close-btn" aria-label="Close modal">✕</button>
      <div class="m-grid">
        <div class="m-poster">
          <img src="${event.poster}" alt="${esc(event.name)}" class="zoomable-event-photo" title="Click to view full size">
        </div>
        <div class="m-info">
          <div class="badge" style="margin-bottom:12px">${tr(event.format)}</div>
          <h2>${event.name}</h2>
          <p style="color:var(--brand);font-weight:600;font-size:1.05rem;margin-top:6px">${event.subtitle}</p>
          <div class="ev-facts" style="margin:20px 0;padding:16px 0;border-block:1px solid var(--line)">
            <div><dt>${bi("Date", "Tanggal")}</dt><dd>${event.date}</dd></div>
            <div><dt>${bi("Venue", "Lokasi")}</dt><dd>${event.venue}</dd></div>
            <div><dt>${bi("City", "Kota")}</dt><dd>${event.city}</dd></div>
          </div>
          <div style="display:flex;gap:20px;margin-bottom:20px">${statsHtml}</div>
          <p class="m-sum">${tr(event.summary)}</p>
          <h3 class="m-h">${bi("Execution & Impact", "Pelaksanaan & Dampak")}</h3>
          <p style="color:var(--muted);line-height:1.7">${tr(event.howItHappened)}</p>
          <h3 class="m-h">${bi("Official Production Gallery", "Galeri Produksi Resmi")}</h3>
          <div class="m-gallery">${galleryHtml}</div>
          <div class="m-partners" style="margin-top:24px;padding-top:16px;border-top:1px solid var(--line)">
            <b>${bi("Official Partners:", "Mitra Resmi:")}</b> ${partnersHtml}
          </div>
        </div>
      </div>
    `;

    const allEventImages = [
      { src: event.poster, alt: `${event.name} Official Poster` },
      ...(event.gallery || [])
    ];

    const posterImg = $(".m-poster img", card);
    if (posterImg) {
      posterImg.addEventListener("click", () => openImageLightbox(allEventImages, 0));
    }

    const galleryImgs = $$(".m-gallery img", card);
    galleryImgs.forEach((img, idx) => {
      img.addEventListener("click", () => openImageLightbox(allEventImages, idx + 1));
    });

    const closeBtn = $("#modal-close-btn", card);
    if (closeBtn) closeBtn.addEventListener("click", closeEventModal);
  }

  window.renderDynamicModal = function () {
    if (openModalSlug && modal && !modal.hidden) {
      const event = (window.EVENTS || []).find(e => e.slug === openModalSlug);
      if (event) renderModalContent(event);
    }
  };

  if (modal) {
    $(".modal-bg", modal)?.addEventListener("click", closeEventModal);
  }

  doc.addEventListener("keydown", e => {
    if (lightboxEl && !lightboxEl.hidden) {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeImageLightbox();
      } else if (e.key === "ArrowLeft") {
        stepImageLightbox(-1);
      } else if (e.key === "ArrowRight") {
        stepImageLightbox(1);
      }
      return;
    }
    if (e.key === "Escape" && modal && !modal.hidden) {
      closeEventModal();
    }
  });

  /* ==========================================================================
     6. GSAP SCROLL & REVEAL INITIALIZATION
     ========================================================================== */
  function initGSAPAnimations() {
    // Promoter 101 falls back to a vertical list unless the horizontal pin can run
    if ($(".h-pin") && (!window.gsap || !window.ScrollTrigger || reduce || window.innerWidth <= 860)) root.classList.add("no-pin");
    if (!window.gsap || reduce) return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    root.classList.add("js-anim");

    // Word reveal on hero
    $$("[data-split]").forEach(el => {
      $$("[lang]", el).forEach(l => {
        const words = l.textContent.trim().split(/\s+/);
        l.innerHTML = words.map(w => `<span class="word"><span>${w}</span></span>`).join(" ");
      });
      const activeLang = el.querySelector(`[lang="${lang()}"]`);
      if (activeLang) {
        gsap.fromTo($$(".word > span", activeLang), {
          y: "115%",
          rotate: 3
        }, {
          y: "0%",
          rotate: 0,
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.15
        });
      }
    });

    // Reveal elements on scroll
    $$("[data-reveal]").forEach(el => {
      gsap.fromTo(el, {
        opacity: 0,
        y: 32
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none"
        }
      });
    });

    // Stat counters
    $$(".stat b[data-count]").forEach(b => {
      const target = parseFloat(b.dataset.count);
      const suffix = b.dataset.suffix || "";
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: b,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.0,
            ease: "power2.out",
            onUpdate: () => {
              b.textContent = Math.round(obj.val) + suffix;
            },
            onComplete: () => {
              b.textContent = target + suffix;
            }
          });
        }
      });
    });

    // Horizontal promoter 101 pin
    const hPin = $(".h-pin");
    const hTrack = $(".h-track");
    if (hPin && hTrack && window.innerWidth > 860 && window.ScrollTrigger) {
      const getScrollDist = () => hTrack.scrollWidth - window.innerWidth;
      gsap.to(hTrack, {
        x: () => -getScrollDist(),
        ease: "none",
        scrollTrigger: {
          trigger: hPin,
          pin: true,
          scrub: 1,
          end: () => "+=" + getScrollDist(),
          invalidateOnRefresh: true
        }
      });
    }
  }

  /* ==========================================================================
     8. UNIFIED GLOBAL SITE FOOTER INJECTION
     ========================================================================== */
  function initFooter() {
    const footerEl = $("#site-footer");
    if (!footerEl) return;

    footerEl.className = "site-footer";
    footerEl.setAttribute("role", "contentinfo");
    footerEl.innerHTML = `
      <div class="wrap">
        <div class="foot-main-grid">
          <div class="foot-col foot-brand">
            <a class="brand" href="${base}index.html" aria-label="WithUs Indonesia">
              <img src="${base}assets/img/logo.png" width="145" height="57" alt="WithUs Indonesia" loading="lazy">
            </a>
            <p class="foot-tagline">
              ${bi("Bridging Global Creative Vision with Indonesian Entertainment", "Menjembatani Visi Kreatif Global dengan Industri Hiburan Indonesia")}
            </p>
            <div class="foot-entity">
              <strong>PT Harpa Ananta Sora · WithUs Indonesia</strong><br>
              <span>Jakarta, Indonesia</span>
            </div>
            <div class="foot-direct">
              <a href="https://wa.me/628170288258?text=Hello%20Admin%20WithUs" class="foot-contact-link" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
                <span>Admin WithUs: +62 817-0288-258</span>
              </a>
              <a href="mailto:admin@withusindonesia.com" class="foot-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>admin@withusindonesia.com</span>
              </a>
            </div>
          </div>

          <div class="foot-col foot-nav">
            <h4 class="foot-heading">${bi("Navigation", "Navigasi")}</h4>
            <ul class="foot-links">
              <li><a href="${base}index.html">${bi("Home", "Beranda")}</a></li>
              <li><a href="${base}index.html#events">${bi("Live Events", "Portofolio Event")}</a></li>
              <li><a href="${base}about.html">${bi("About WithUs", "Tentang Kami")}</a></li>
              <li><a href="${base}services.html">${bi("Capabilities & Services", "Layanan & Kapabilitas")}</a></li>
              <li><a href="${base}promoter-101.html">${bi("Promoter 101 Knowledge", "Panduan Promoter 101")}</a></li>
              <li><a href="${base}contact.html">${bi("Work WithUs", "Bekerja dengan WithUs")}</a></li>
            </ul>
          </div>

          <div class="foot-col foot-services">
            <h4 class="foot-heading">${bi("Capabilities", "Kapabilitas")}</h4>
            <ul class="foot-links">
              <li><a href="${base}services.html#artist-management">${bi("Artist Management", "Manajemen Artis")}</a></li>
              <li><a href="${base}services.html#ip-development">${bi("IP Development & Localisation", "Pengembangan & Lokalisasi IP")}</a></li>
              <li><a href="${base}services.html#event-production">${bi("Event Production & Arena Touring", "Produksi Event & Tur Konser")}</a></li>
              <li><a href="${base}contact.html">${bi("Partnership Inquiries", "Permintaan Kemitraan")}</a></li>
            </ul>
          </div>

          <div class="foot-col foot-social">
            <h4 class="foot-heading">${bi("Official Channels", "Kanal Resmi")}</h4>
            <p class="foot-desc">${bi("Connect directly with our Jakarta executive team.", "Terhubung langsung dengan tim eksekutif kami di Jakarta.")}</p>
            <div class="socials">
              <a href="https://www.instagram.com/withusind/" target="_blank" rel="noopener" aria-label="WithUs on Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8" fill="currentColor"/></svg>
              </a>
              <a href="https://x.com/withusind" target="_blank" rel="noopener" aria-label="WithUs on X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"/></svg>
              </a>
              <a href="https://www.threads.com/@withusind" target="_blank" rel="noopener" aria-label="WithUs on Threads">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16.5 11.2c-.4-2.7-2.1-4.2-4.6-4.2-3 0-4.9 2.2-4.9 5.1s1.9 5 5 5c2.4 0 4.2-1.3 4.2-3.3 0-1.8-1.4-2.9-3.6-2.9-1.9 0-3 .9-3 2.1 0 1.1 1 1.9 2.3 1.9 2.4 0 3.4-2 3.4-5.1"/><path d="M12 21c-5 0-9-3.6-9-9s4-9 9-9c4.2 0 7.4 2.4 8.5 6"/></svg>
              </a>
              <a href="https://www.tiktok.com/@withusindonesia" target="_blank" rel="noopener" aria-label="WithUs on TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.3 2.6 2.1 4.3 4.5 4.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/withusind/" target="_blank" rel="noopener" aria-label="WithUs on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.2c0-1.7 1-2.7 2.3-2.7S16.5 11.4 16.5 13v4"/></svg>
              </a>
              <a href="https://www.youtube.com/@withusind" target="_blank" rel="noopener" aria-label="WithUs on YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.2 9.4v5.2l4.4-2.6z" fill="currentColor"/></svg>
              </a>
              <a href="https://wa.me/628170288258?text=Hello%20Admin%20WithUs" target="_blank" rel="noopener" aria-label="Admin WithUs WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
              </a>
              <a href="mailto:admin@withusindonesia.com" aria-label="Email WithUs">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div class="foot-bottom">
          <div class="foot-copy">
            &copy; 2026 PT Harpa Ananta Sora · WithUs Indonesia. ${bi("All rights reserved.", "Hak cipta dilindungi undang-undang.")}
          </div>
          <div class="foot-legal">
            <a href="${base}privacy-policy.html">${bi("Privacy Policy", "Kebijakan Privasi")}</a>
            <span class="foot-dot">·</span>
            <a href="${base}terms.html">${bi("Terms of Use", "Syarat &amp; Ketentuan")}</a>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     9. INITIALIZATION
     ========================================================================== */
  function initPrefetch() {
    const done = new Set();
    const go = e => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.origin !== location.origin || !/\.html$/.test(a.pathname) || a.pathname === location.pathname || done.has(a.pathname)) return;
      done.add(a.pathname);
      const l = doc.createElement("link"); l.rel = "prefetch"; l.href = a.pathname; doc.head.appendChild(l);
    };
    doc.addEventListener("pointerover", go, { passive: true });
    doc.addEventListener("touchstart", go, { passive: true });
    doc.addEventListener("focusin", go);
  }

  function initReadingProgress() {
    if (!doc.querySelector(".h-pin")) return; // long-form education page only
    const bar = doc.createElement("div");
    bar.className = "read-progress"; bar.setAttribute("aria-hidden", "true");
    doc.body.appendChild(bar);
    let t = 0;
    const upd = () => { t = 0; const max = doc.documentElement.scrollHeight - innerHeight; bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, scrollY / max) : 0).toFixed(3) + ")"; };
    addEventListener("scroll", () => { if (!t) t = requestAnimationFrame(upd); }, { passive: true });
    upd();
  }

  function start() {
    initHeaderAndMenu();
    initPrefetch();
    initReadingProgress();
    initFooter();

    // Initialize Circular Carousel if on page with #ring-carousel
    const carouselEl = $("#ring-carousel");
    if (carouselEl) {
      window.CIRCULAR_CAROUSEL = new CircularCarousel(carouselEl, {
        preset: "cylinder",
        intro: "rise",
        cardWidth: window.innerWidth >= 1100 ? 300 : 260,
        aspectRatio: 0.78,
        speed: 14,
        captions: true,
        tilt: -5,
        perspective: 2500,
        gap: 25,
        parallax: 0.3,
        curve: 1,
        momentum: 0.6,
        snap: true,
        focusOnClick: true
      });

      const prevBtn = $("#carousel-btn-prev");
      const nextBtn = $("#carousel-btn-next");
      if (prevBtn) prevBtn.addEventListener("click", () => window.CIRCULAR_CAROUSEL.stepBy(-1));
      if (nextBtn) nextBtn.addEventListener("click", () => window.CIRCULAR_CAROUSEL.stepBy(1));

      const dockBtn = $("#rc-open");
      if (dockBtn) {
        dockBtn.addEventListener("click", () => {
          const activeSlug = dockBtn.dataset.slug || (window.CIRCULAR_CAROUSEL && window.CIRCULAR_CAROUSEL.items[window.CIRCULAR_CAROUSEL.activeIndex]?.slug);
          if (activeSlug && window.openEventModal) openEventModal(activeSlug);
        });
      }
    }

    // Initialize Stepper if on contact page
    const stepperEl = $("#contact-stepper");
    if (stepperEl) {
      window.CONTACT_STEPPER = new ContactStepper(stepperEl);
    }

    initGSAPAnimations();
    applyMeta();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
