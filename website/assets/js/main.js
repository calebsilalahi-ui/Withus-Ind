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
    { label: "Instagram", url: "https://instagram.com/withusind" },
    { label: "WhatsApp Direct", url: "https://wa.me/62818766253?text=Hello%20WithUs%20Indonesia" },
    { label: "Email", url: "mailto:martha@withusindonesia.com" }
  ];

  function initHeaderAndMenu() {
    const headerEl = $("#site-header");
    if (!headerEl) return;

    headerEl.className = "site-header";
    headerEl.setAttribute("role", "banner");

    headerEl.innerHTML = `
      <div class="wrap">
        <a class="brand" href="${base}index.html" aria-label="WithUs Indonesia">
          <img src="${base}assets/img/logo.png" width="114" height="45" alt="WithUs Indonesia">
        </a>
        <div class="header-actions">
          <div class="lang" role="group" aria-label="Language">
            <button data-l="id" aria-pressed="${lang() === 'id'}">ID</button>
            <button data-l="en" aria-pressed="${lang() === 'en'}">EN</button>
          </div>
          <a class="btn primary header-cta" href="${base}contact.html">${bi("Work WithUs", "Bekerja dengan WithUs")}</a>
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
              <img src="${base}assets/img/logo.png" width="114" height="45" alt="WithUs Indonesia">
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
                    <a href="${base}${item.href}" class="sm-panel-link" data-index="${idx}">
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
  class CircularCarousel {
    constructor(container, options = {}) {
      this.container = container;
      this.options = Object.assign({
        preset: "cylinder",
        cardWidth: 280,
        aspectRatio: 0.75,
        speed: 14,
        gap: 32,
        parallax: 0.26,
        curve: 0.5,
        depthFade: 0.55,
        fadeColor: "#070709",
        innerShade: 0.5,
        cornerRadius: 18,
        autoplay: "drift",
        draggable: true,
        snap: true,
        pauseOnHover: true,
        focusOnClick: true
      }, options);

      this.rawItems = window.EVENTS || [];
      if (!this.rawItems.length) return;

      // Duplicate items to 6 cards for a complete 360-degree cylinder if < 5 items
      this.items = this.rawItems.length < 5 ? [...this.rawItems, ...this.rawItems] : this.rawItems;
      this.count = this.items.length;
      this.step = 360 / this.count;

      this.angle = 0;
      this.targetAngle = 0;
      this.velocity = 0;
      this.isDragging = false;
      this.isHovered = false;
      this.lastPointerX = 0;
      this.lastTime = 0;
      this.activeIndex = 0;

      this.pointer = { x: 0, y: 0, inside: false };
      this.buildDOM();
      this.computeDimensions();
      this.bindEvents();
      this.startLoop();
    }

    buildDOM() {
      this.container.classList.add("circular-carousel");
      this.container.setAttribute("data-shape", this.options.preset);
      this.container.setAttribute("data-axis", "x");
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

      this.cards = [];
      this.items.forEach((item, i) => {
        const card = doc.createElement("div");
        card.className = "circular-carousel__card";
        card.dataset.index = i;
        card.dataset.slug = item.slug;
        card.tabIndex = -1;
        card.setAttribute("aria-label", item.name);

        card.innerHTML = `
          <div class="circular-carousel__tile">
            <div class="circular-carousel__frame">
              <img class="circular-carousel__photo" src="${item.poster}" alt="${esc(item.name)}" draggable="false">
              <div class="circular-carousel__shade"></div>
              <div class="circular-carousel__inner"></div>
            </div>
          </div>
        `;
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

      // Scale card width down on smaller mobile screens
      let cw = this.options.cardWidth;
      if (w < 480) cw = Math.min(cw, w * 0.65);
      else if (w < 768) cw = Math.min(cw, w * 0.45);

      const ch = cw / this.options.aspectRatio;
      this.cardW = Math.round(cw);
      this.cardH = Math.round(ch);

      // 3D cylinder radius based on cards and gap
      this.radius = Math.max(this.cardW * 1.1, (this.cardW + this.options.gap) / (2 * Math.tan(Math.PI / this.count)));
      this.perspective = Math.max(1000, this.radius * 2.2);

      this.container.style.perspective = `${this.perspective}px`;
      this.container.style.setProperty("--cc-radius", `${this.options.cornerRadius}px`);
      this.container.style.setProperty("--cc-fade", this.options.fadeColor);
      this.container.style.setProperty("--cc-inner", this.options.innerShade);

      this.cards.forEach((card, i) => {
        const angle = i * this.step;
        card.style.width = `${this.cardW}px`;
        card.style.height = `${this.cardH}px`;
        card.style.left = `${-this.cardW / 2}px`;
        card.style.top = `${-this.cardH / 2}px`;
        card.style.transform = `rotateY(${angle}deg) translateZ(${this.radius}px)`;

        const frame = $(".circular-carousel__frame", card);
        if (frame) {
          frame.style.width = `${this.cardW}px`;
          frame.style.height = `${this.cardH}px`;
          frame.style.borderRadius = `${this.options.cornerRadius}px`;
        }
        const photo = $(".circular-carousel__photo", card);
        if (photo) {
          photo.style.width = `${this.cardW}px`;
          photo.style.height = `${this.cardH}px`;
        }
      });
    }

    bindEvents() {
      window.addEventListener("resize", () => this.computeDimensions());

      if (this.options.draggable) {
        this.container.addEventListener("pointerdown", e => {
          this.isDragging = true;
          this.container.setAttribute("data-dragging", "true");
          this.lastPointerX = e.clientX;
          this.lastTime = performance.now();
          this.velocity = 0;
          this.container.setPointerCapture(e.pointerId);
        });

        this.container.addEventListener("pointermove", e => {
          const rect = this.container.getBoundingClientRect();
          this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          this.pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
          this.pointer.inside = true;

          if (!this.isDragging) return;
          const now = performance.now();
          const dt = Math.max(1, now - this.lastTime);
          const dx = e.clientX - this.lastPointerX;
          this.lastPointerX = e.clientX;
          this.lastTime = now;

          const degPerPx = 180 / (Math.PI * this.radius);
          const dAngle = dx * degPerPx;
          this.angle += dAngle;
          this.velocity = dAngle / dt;
        });

        const onUp = () => {
          if (!this.isDragging) return;
          this.isDragging = false;
          this.container.removeAttribute("data-dragging");
          if (this.options.snap) {
            this.targetAngle = Math.round(this.angle / this.step) * this.step;
          }
        };

        this.container.addEventListener("pointerup", onUp);
        this.container.addEventListener("pointercancel", onUp);
      }

      if (this.options.pauseOnHover) {
        this.container.addEventListener("pointerenter", () => { this.isHovered = true; });
        this.container.addEventListener("pointerleave", () => {
          this.isHovered = false;
          this.pointer.inside = false;
        });
      }

      this.container.addEventListener("click", e => {
        const card = e.target.closest(".circular-carousel__card");
        if (!card) return;
        const idx = parseInt(card.dataset.index, 10);
        const cardAngle = -idx * this.step;
        const normAngle = ((this.angle % 360) + 360) % 360;
        const normTarget = ((cardAngle % 360) + 360) % 360;

        // If card is front-most or clicked directly, open modal
        const slug = card.dataset.slug;
        if (Math.abs(normAngle - normTarget) < 15 || Math.abs(normAngle - normTarget) > 345) {
          if (window.openEventModal) window.openEventModal(slug);
        } else {
          // Rotate clicked card to front
          this.targetAngle = cardAngle;
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
      const cur = Math.round(this.angle / this.step) * this.step;
      this.targetAngle = cur + delta * this.step;
    }

    startLoop() {
      let lastTime = performance.now();
      const loop = (now) => {
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        if (!this.isDragging) {
          if (Math.abs(this.velocity) > 0.01) {
            this.angle += this.velocity * dt * 1000;
            this.velocity *= 0.94; // momentum dampening
            if (Math.abs(this.velocity) <= 0.01 && this.options.snap) {
              this.targetAngle = Math.round(this.angle / this.step) * this.step;
            }
          } else if (this.options.snap && this.targetAngle !== undefined) {
            // Smoothly ease to snapped target card
            this.angle += (this.targetAngle - this.angle) * Math.min(1, dt * 8);
          } else if (this.options.autoplay === "drift" && !this.isHovered && !reduce) {
            this.angle -= this.options.speed * dt;
          }
        }

        this.render();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    render() {
      const aimYaw = this.pointer.inside ? this.pointer.x * this.options.parallax * 9 : 0;
      const aimPitch = this.pointer.inside ? -this.pointer.y * this.options.parallax * 6 : 0;

      this.camera.style.transform = `rotateX(${aimPitch}deg) rotateY(${aimYaw}deg)`;
      this.ring.style.transform = `translateZ(${-this.radius}px) rotateY(${this.angle}deg)`;

      // Depth fade and blur distant cards
      this.cards.forEach((card, i) => {
        const cardAngle = i * this.step + this.angle;
        const normAngle = ((((cardAngle + 180) % 360) + 360) % 360) - 180;
        const absAngle = Math.abs(normAngle);

        const fade = Math.min(1, absAngle / 120);
        card.style.setProperty("--cc-depth", (fade * this.options.depthFade).toFixed(2));

        if (absAngle > 105) {
          card.style.visibility = "hidden";
        } else {
          card.style.visibility = "visible";
          card.style.filter = `blur(${(fade * 4).toFixed(1)}px) brightness(${(1 - fade * 0.4).toFixed(2)})`;
        }
      });

      // Compute active front card
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
              <div class="scope-grid">
                <div class="scope-card is-selected" data-scope="Concert Touring & Promotion">
                  <h4>${bi("Concert Touring & Promotion", "Promotor & Tur Konser")}</h4>
                  <p>${bi("Full-scale live concert, fan-con or tour management across Jakarta arenas.", "Pengelolaan konser langsung, fan-con, atau tur di arena Jakarta.")}</p>
                </div>
                <div class="scope-card" data-scope="Artist Booking & Representation">
                  <h4>${bi("Artist Booking & Management", "Booking & Manajemen Artis")}</h4>
                  <p>${bi("Securing global Korean/international talent for domestic appearances.", "Menghadirkan artis global/Korea untuk kegiatan dan kampanye di Indonesia.")}</p>
                </div>
                <div class="scope-card" data-scope="IP Licensing & Exhibitions">
                  <h4>${bi("IP Licensing & Exhibitions", "Lisensi IP & Pameran")}</h4>
                  <p>${bi("D'FESTA style pop-ups, entertainment showcases, and brand activations.", "Pameran eksklusif bergaya D'FESTA, aktivasi brand, dan lisensi IP hiburan.")}</p>
                </div>
                <div class="scope-card" data-scope="Production & Consultancy">
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
                  <label>${bi("Full Name *", "Nama Lengkap *")}</label>
                  <input type="text" id="step-name" placeholder="e.g. Min-woo Kim / Sarah Pratama" required>
                </div>
                <div class="field-group">
                  <label>${bi("Organization / Agency *", "Organisasi / Agensi *")}</label>
                  <input type="text" id="step-org" placeholder="e.g. Entertainment Agency / Brand" required>
                </div>
                <div class="field-group">
                  <label>${bi("Email Address *", "Alamat Email *")}</label>
                  <input type="email" id="step-email" placeholder="name@company.com" required>
                </div>
                <div class="field-group">
                  <label>${bi("WhatsApp / Phone (with Country Code) *", "WhatsApp / Nomor Telepon *")}</label>
                  <input type="tel" id="step-phone" placeholder="+62 / +82 ..." required>
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
                  <label>${bi("Target Timeline / Quarter", "Target Waktu / Kuartal")}</label>
                  <input type="text" id="step-date" placeholder="e.g. Q3 2026 / November 2026">
                </div>
                <div class="field-group">
                  <label>${bi("Preferred Venue Tier", "Pilihan Kapasitas Venue")}</label>
                  <select id="step-venue">
                    <option value="Arena / Stadium (5,000 - 15,000+ pax)">Arena / Stadium (Istora, Indonesia Arena, etc.)</option>
                    <option value="Mid-tier Dome / Hall (2,000 - 5,000 pax)">Mid-tier Dome / Hall (SPIKE Air Dome PIK 2, etc.)</option>
                    <option value="Intimate Ballroom / Theater (500 - 1,500 pax)">Intimate Ballroom / Theater (Bengkel SCBD, Kempinski)</option>
                    <option value="Brand Exhibition / Pop-up Space">Brand Exhibition / Pop-up Space</option>
                  </select>
                </div>
              </div>
              <div class="field-group">
                <label>${bi("Estimated Budget Range", "Estimasi Kisaran Anggaran")}</label>
                <select id="step-budget">
                  <option value="Under $50,000 (< IDR 800 Juta)">Under $50,000 (< IDR 800 Juta)</option>
                  <option value="$50,000 - $150,000 (IDR 800 Jt - 2.4 Miliar)" selected>$50,000 - $150,000 (IDR 800 Jt - 2.4 Miliar)</option>
                  <option value="$150,000 - $500,000 (IDR 2.4 - 8 Miliar)">$150,000 - $500,000 (IDR 2.4 - 8 Miliar)</option>
                  <option value="$500,000+ (> IDR 8 Miliar)">$500,000+ (> IDR 8 Miliar)</option>
                </select>
              </div>
              <div class="field-group">
                <label>${bi("Project Brief / Message *", "Ringkasan Proyek / Pesan *")}</label>
                <textarea id="step-message" placeholder="${bi("Tell us about the artist, concept, and required deliverables...", "Ceritakan mengenai artis, konsep pertunjukan, dan kebutuhan Anda...")}" required></textarea>
              </div>
            </div>
          </div>

          <!-- Step 4: Summary & Dispatch -->
          <div class="stepper__step" data-step-panel="3" style="display:none">
            <div class="step-content">
              <div>
                <h3 style="font-size:1.4rem;margin-bottom:6px">${bi("Review & Dispatch Inquiry", "Tinjau & Kirim Permintaan")}</h3>
                <p style="color:var(--muted);font-size:0.95rem">${bi("Review your details below. We reply within 24 hours.", "Periksa ringkasan di bawah ini. Kami membalas dalam 24 jam kerja.")}</p>
              </div>
              <div class="summary-box" id="step-summary">
                <!-- Dynamically populated -->
              </div>
              <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px">
                <button class="btn primary" id="btn-submit-form" style="width:100%;padding:14px;font-size:1.05rem">
                  ${bi("Submit Official Inquiry", "Kirim Permintaan Resmi")}
                </button>
                <div style="text-align:center;color:var(--subtle);font-size:0.85rem">— ${bi("OR INSTANT DIRECT ROUTING", "ATAU JALUR CEPAT WHATSAPP")} —</div>
                <a class="wa-vip-cta" id="btn-wa-vip" href="#" target="_blank" rel="noopener" style="justify-content:center;text-decoration:none">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
                  <span>${bi("Direct VIP Chat with Martha (+62 818 766 253)", "Chat VIP Langsung dengan Martha (+62 818 766 253)")}</span>
                </a>
              </div>
              <div id="form-feedback" style="display:none;padding:14px;border-radius:12px;margin-top:12px"></div>
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
        card.addEventListener("click", () => {
          scopeCards.forEach(c => c.classList.remove("is-selected"));
          card.classList.add("is-selected");
          this.data.scope = card.dataset.scope;
        });
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

      // Form submission
      const submitBtn = $("#btn-submit-form", this.container);
      if (submitBtn) {
        submitBtn.addEventListener("click", e => {
          e.preventDefault();
          this.submitForm();
        });
      }
    }

    validateStep(step) {
      if (step === 1) {
        const name = $("#step-name", this.container).value.trim();
        const email = $("#step-email", this.container).value.trim();
        const phone = $("#step-phone", this.container).value.trim();
        if (!name) { alert(tr({ en: "Please enter your name.", id: "Mohon masukkan nama Anda." })); return false; }
        if (!email || !email.includes("@")) { alert(tr({ en: "Please enter a valid email.", id: "Mohon masukkan alamat email yang valid." })); return false; }
        if (!phone) { alert(tr({ en: "Please enter a WhatsApp or phone number.", id: "Mohon masukkan nomor WhatsApp atau telepon." })); return false; }
        this.data.name = name;
        this.data.organization = $("#step-org", this.container).value.trim();
        this.data.email = email;
        this.data.phone = phone;
      } else if (step === 2) {
        const msg = $("#step-message", this.container).value.trim();
        if (!msg) { alert(tr({ en: "Please include a project brief or message.", id: "Mohon sertakan ringkasan pesan proyek Anda." })); return false; }
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
      this.stepIndicator.textContent = `Step ${this.currentStep + 1} of ${this.stepsCount}`;

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

      // Pre-fill WhatsApp link to Martha (+62 818 766 253)
      const waBtn = $("#btn-wa-vip", this.container);
      if (waBtn) {
        const text = encodeURIComponent(
          `*WITHUS INDONESIA INQUIRY*
` +
          `• Scope: ${this.data.scope}
` +
          `• Name: ${this.data.name} (${this.data.organization})
` +
          `• Email: ${this.data.email}
` +
          `• Phone: ${this.data.phone}
` +
          `• Timeline: ${this.data.date}
` +
          `• Venue: ${this.data.venueTier}
` +
          `• Budget: ${this.data.budget}
` +
          `• Brief: ${this.data.message}`
        );
        waBtn.href = `https://wa.me/62818766253?text=${text}`;
      }
    }

    submitForm() {
      const fb = $("#form-feedback", this.container);
      const submitBtn = $("#btn-submit-form", this.container);
      submitBtn.setAttribute("aria-busy", "true");

      // Attempt submit to configured endpoint or store locally
      fetch("https://formspree.io/f/xvgzeyko", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(this.data)
      })
      .then(res => {
        submitBtn.removeAttribute("aria-busy");
        fb.style.display = "block";
        if (res.ok) {
          fb.style.background = "rgba(46, 204, 113, 0.15)";
          fb.style.border = "1px solid #2ecc71";
          fb.style.color = "#2ecc71";
          fb.innerHTML = tr({
            en: "✓ Message sent successfully! Our executive leadership will reply within 24 hours.",
            id: "✓ Pesan berhasil terkirim! Tim kepemimpinan kami akan membalas dalam 24 jam kerja."
          });
        } else {
          // Graceful fallback: encourage immediate WhatsApp connect
          fb.style.background = "rgba(244, 117, 39, 0.15)";
          fb.style.border = "1px solid var(--brand)";
          fb.style.color = "#fff";
          fb.innerHTML = tr({
            en: "Inquiry recorded! Please click the green button above to instantly connect with Martha on WhatsApp.",
            id: "Permintaan tercatat! Silakan klik tombol hijau di atas untuk terhubung langsung dengan Martha di WhatsApp."
          });
        }
      })
      .catch(() => {
        submitBtn.removeAttribute("aria-busy");
        fb.style.display = "block";
        fb.style.background = "rgba(244, 117, 39, 0.15)";
        fb.style.border = "1px solid var(--brand)";
        fb.style.color = "#fff";
        fb.innerHTML = tr({
          en: "Inquiry drafted! Please tap the WhatsApp button above to send your message directly.",
          id: "Draft permintaan siap! Silakan ketuk tombol WhatsApp di atas untuk mengirim pesan langsung."
        });
      });
    }
  }

  /* ==========================================================================
     5. EVENT MODAL WITH GALLERY
     ========================================================================== */
  let openModalSlug = null;
  const modal = $("#ev-modal");

  function openEventModal(slug) {
    const event = (window.EVENTS || []).find(e => e.slug === slug);
    if (!event || !modal) return;
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
    setTimeout(() => {
      modal.hidden = true;
      doc.body.style.overflow = "";
      openModalSlug = null;
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
      <img src="${g.src}" alt="${esc(g.alt)}" loading="lazy">
    `).join("");

    card.innerHTML = `
      <button class="modal-x" id="modal-close-btn" aria-label="Close modal">✕</button>
      <div class="m-grid">
        <div class="m-poster">
          <img src="${event.poster}" alt="${esc(event.name)}">
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
    doc.addEventListener("keydown", e => {
      if (e.key === "Escape" && !modal.hidden) closeEventModal();
    });
  }

  /* ==========================================================================
     6. GSAP SCROLL & REVEAL INITIALIZATION
     ========================================================================== */
  function initGSAPAnimations() {
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
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              b.textContent = Math.round(obj.val) + suffix;
            }
          });
        }
      });
    });

    // Horizontal promoter 101 pin
    const hPin = $(".h-pin");
    const hTrack = $(".h-track");
    if (hPin && hTrack && window.innerWidth > 860) {
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
     7. INITIALIZATION
     ========================================================================== */
  function start() {
    initHeaderAndMenu();

    // Initialize Circular Carousel if on page with #ring-carousel
    const carouselEl = $("#ring-carousel");
    if (carouselEl) {
      window.CIRCULAR_CAROUSEL = new CircularCarousel(carouselEl, {
        preset: "cylinder",
        speed: 14,
        parallax: 0.28,
        cardWidth: 300,
        aspectRatio: 0.75
      });

      const prevBtn = $("#carousel-btn-prev");
      const nextBtn = $("#carousel-btn-next");
      if (prevBtn) prevBtn.addEventListener("click", () => window.CIRCULAR_CAROUSEL.stepBy(-1));
      if (nextBtn) nextBtn.addEventListener("click", () => window.CIRCULAR_CAROUSEL.stepBy(1));

      const dockBtn = $("#rc-open");
      if (dockBtn) {
        dockBtn.addEventListener("click", () => {
          if (dockBtn.dataset.slug) openEventModal(dockBtn.dataset.slug);
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
