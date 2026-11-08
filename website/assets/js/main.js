/* WithUs Indonesia — main.js. Tanpa build step. GSAP/ScrollTrigger opsional (fallback tanpa animasi). */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var base = "";
  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function lang() { return root.getAttribute("data-lang") || "en"; }
  function tr(o) { return typeof o === "string" ? o : (o && (o[lang()] || o.en)) || ""; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  // placeholder "[ISI]" / "[VERIFIKASI]" tampil mencolok
  function mark(s) { return esc(s).replace(/\[(ISI|VERIFIKASI)[^\]]*\]/g, '<span class="isi">$&</span>'); }

  /* ---------- bahasa ---------- */
  var saved; try { saved = localStorage.getItem("wu-lang"); } catch (e) {}
  root.setAttribute("data-lang", saved === "id" ? "id" : "en");
  root.lang = lang();
  function applyMeta() {
    var t = $("title");
    if (t && t.dataset["title" + lang()]) t.textContent = t.dataset["title" + lang()];
    var m = $('meta[name="description"]');
    if (m && m.dataset["desc" + lang()]) m.content = m.dataset["desc" + lang()];
  }
  function setLang(l) {
    root.setAttribute("data-lang", l); root.lang = l;
    try { localStorage.setItem("wu-lang", l); } catch (e) {}
    $$(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === l); });
    applyMeta(); renderDynamic();
  }

  /* ---------- header & footer (satu sumber) ---------- */
  var NAV = [["index.html", "Home", "Beranda"], ["index.html#events", "Events", "Event"], ["promoter-101.html", "Promoter 101", "Promoter 101"],
    ["about.html", "About", "Tentang"], ["services.html", "Services", "Layanan"], ["contact.html", "Contact", "Kontak"]];
  var path = location.pathname.split("/").pop() || "index.html";
  function bi(en, id) { return '<span lang="en">' + en + '</span><span lang="id">' + id + "</span>"; }
  var h = $("#site-header");
  if (h) {
    h.className = "site-header"; h.setAttribute("role", "banner");
    h.innerHTML = '<div class="wrap"><a class="brand" href="' + base + 'index.html" aria-label="WithUs Indonesia"><img src="' + base + 'assets/img/logo.png" width="114" height="45" alt="WithUs Indonesia"></a>' +
      '<button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span></button>' +
      '<nav class="nav" id="nav" aria-label="Main">' + NAV.map(function (n) {
        return '<a href="' + base + n[0] + '"' + (n[0] === path ? ' aria-current="page"' : "") + ">" + bi(n[1], n[2]) + "</a>";
      }).join("") +
      '<div class="lang" role="group" aria-label="Language"><button data-l="id" aria-pressed="false">ID</button><button data-l="en" aria-pressed="true">EN</button></div>' +
      '<a class="btn primary" href="' + base + 'contact.html">' + bi("Work With Us", "Bekerja Sama") + "</a></nav></div>";
    var burger = $(".burger", h), nav = $("#nav", h);
    burger.addEventListener("click", function () { var o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) nav.classList.remove("open"); });
    h.addEventListener("click", function (e) { var b = e.target.closest(".lang button"); if (b) setLang(b.dataset.l); });
  }
  var SOC = [["Instagram", "IG", "https://instagram.com/withusind"], ["X", "X", "#"], ["Facebook", "FB", "#"], ["Threads", "TH", "#"], ["TikTok", "TT", "#"], ["LinkedIn", "IN", "#"], ["YouTube", "YT", "#"]];
  var f = $("#site-footer");
  if (f) {
    f.className = "site-footer"; f.setAttribute("role", "contentinfo");
    f.innerHTML = '<div class="wrap"><div class="foot-grid"><div><img src="' + base + 'assets/img/logo.png" width="114" height="45" alt="WithUs Indonesia">' +
      '<p class="muted" style="margin-top:14px">' + bi("Bridging Global Creative Vision with Indonesian Entertainment.", "Menjembatani Visi Kreatif Global dengan Industri Hiburan Indonesia.") + "</p>" +
      '<div class="socials">' + SOC.map(function (s) {
        // "#": akun resmi belum diisi -> tidak dirender sebagai link kosong
        return s[2] === "#" ? '<span class="isi" title="[ISI] URL ' + s[0] + '" aria-label="' + s[0] + ' [ISI]">' + s[1] + "</span>" : '<a href="' + s[2] + '" rel="noopener" target="_blank" aria-label="' + s[0] + '">' + s[1] + "</a>";
      }).join("") + "</div></div>" +
      '<div><h3>' + bi("Contact", "Kontak") + '</h3><ul><li><a href="mailto:admin@withusindonesia.com">admin@withusindonesia.com</a></li><li>WhatsApp: <span class="isi">[ISI]</span></li>' +
      "<li>Treasury Tower Lt. 5 Unit J, District 8 SCBD, Jakarta Selatan</li><li>PT Harpa Ananta Sora</li></ul></div>" +
      '<div><h3>' + bi("Company", "Perusahaan") + '</h3><ul><li><a href="' + base + 'privacy-policy.html">Privacy Policy</a></li><li><a href="' + base + 'terms.html">Terms</a></li>' +
      '<li><a href="mailto:admin@withusindonesia.com?subject=Media%20Kit%20Request">Media Kit</a></li></ul></div></div>' +
      '<div class="copy"><span>© ' + new Date().getFullYear() + " PT Harpa Ananta Sora</span><span>WithUs Indonesia</span></div></div>";
  }
  var sk = doc.createElement("a"); sk.className = "skip"; sk.href = "#main"; sk.textContent = "Skip to content"; doc.body.prepend(sk);
  $$(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === lang()); });
  applyMeta();

  /* ---------- hero: teks reveal per kata ---------- */
  var hasGSAP = !!window.gsap;
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  var animate = hasGSAP && !reduce;
  if (animate) root.classList.add("js-anim");
  $$("[data-split]").forEach(function (el) {
    $$("[lang]", el).forEach(function (l) {
      var words = l.textContent.trim().split(/\s+/);
      l.setAttribute("aria-label", l.textContent.trim());
      l.innerHTML = words.map(function (w) { return '<span class="word" aria-hidden="true"><span>' + esc(w) + "</span></span>"; }).join(" ");
    });
    if (animate) gsap.from($$(".word>span", el), { yPercent: 110, duration: .9, ease: "power4.out", stagger: .06, delay: .15 });
  });

  /* ---------- reveal on scroll + counters ---------- */
  function initScroll() {
    if (!animate || !window.ScrollTrigger) return;
    $$("[data-reveal]").forEach(function (el) {
      if (el.dataset.done) return; el.dataset.done = 1;
      gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });
    $$(".scrub p").forEach(function (p) {
      if (p.dataset.done) return; p.dataset.done = 1;
      p.innerHTML = p.textContent.split(/\s+/).map(function (w) { return "<span>" + esc(w) + "</span>"; }).join(" ");
      gsap.fromTo($$("span", p), { opacity: .15 }, { opacity: 1, stagger: .1, ease: "none", scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 55%", scrub: true } });
    });
    $$("[data-count]").forEach(function (el) {
      var to = parseFloat(el.dataset.count), o = { v: 0 };
      gsap.to(o, { v: to, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true }, onUpdate: function () { el.textContent = Math.round(o.v) + (el.dataset.suffix || ""); } });
    });
  }

  /* ---------- carousel (geser: swipe, drag, trackpad, panah, keyboard, dots) ---------- */
  var track = $("#event-track");
  function cardHTML(e) {
    return '<a class="ecard" href="#event-' + e.slug + '" data-slug="' + e.slug + '" aria-label="' + esc(e.name) + '"><span class="glass"></span>' +
      '<img src="' + e.poster + '" alt="' + esc(e.name) + ' poster" loading="lazy" width="600" height="800" draggable="false">' +
      '<div class="meta"><span class="tag">' + (e.status === "upcoming" ? bi("Upcoming", "Mendatang") : bi("Past event", "Event lalu")) + "</span>" +
      "<h3>" + mark(e.name) + '</h3><p class="sub">' + mark(e.date) + " · " + mark(e.venue) + "</p></div></a>";
  }
  function initCarousel() {
    var cards = $$(".ecard", track), dotsBox = $("#car-dots"), idx = 0, dots = [];
    dotsBox.innerHTML = cards.map(function (c, i) { return '<button aria-label="Event ' + (i + 1) + '"></button>'; }).join("");
    dots = $$("button", dotsBox);
    function centerOf(el) { return el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2; }
    function goTo(i, instant) { i = Math.max(0, Math.min(cards.length - 1, i)); track.scrollTo({ left: centerOf(cards[i]), behavior: instant || reduce ? "auto" : "smooth" }); }
    function update() {
      var mid = track.scrollLeft + track.clientWidth / 2, best = 1e9;
      cards.forEach(function (el, i) {
        var off = el.offsetLeft + el.offsetWidth / 2 - mid, d = Math.abs(off), n = Math.min(1, d / (track.clientWidth / 2));
        el.style.transform = "scale(" + (1 - n * .14).toFixed(3) + ") rotateY(" + ((off / track.clientWidth) * -14).toFixed(1) + "deg)";
        el.style.opacity = (1 - n * .45).toFixed(2);
        el.style.filter = "blur(" + (n * 4).toFixed(1) + "px)";
        if (d < best) { best = d; idx = i; }
      });
      dots.forEach(function (d, i) { d.setAttribute("aria-current", i === idx); });
    }
    var tick; track.addEventListener("scroll", function () { cancelAnimationFrame(tick); tick = requestAnimationFrame(update); }, { passive: true });
    dots.forEach(function (d, i) { d.addEventListener("click", function () { goTo(i); }); });
    $("#car-prev").onclick = function () { goTo(idx - 1); }; $("#car-next").onclick = function () { goTo(idx + 1); };
    track.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") { e.preventDefault(); goTo(idx + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); goTo(idx - 1); } });
    // drag mouse dengan inersia ringan; sentuhan memakai scroll native
    var down = false, sx = 0, sl = 0, moved = false, lastX = 0, vx = 0;
    track.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = lastX = e.clientX; sl = track.scrollLeft; vx = 0; });
    window.addEventListener("pointermove", function (e) { if (!down) return; var dx = e.clientX - sx; vx = e.clientX - lastX; lastX = e.clientX; if (Math.abs(dx) > 6) { moved = true; track.classList.add("drag"); } if (moved) track.scrollLeft = sl - dx; });
    window.addEventListener("pointerup", function () {
      if (!down) return; down = false;
      if (moved) { var target = idx + (vx < -6 ? 1 : vx > 6 ? -1 : 0); track.classList.remove("drag"); goTo(target); setTimeout(function () { moved = false; }, 60); }
    });
    track.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    cards.forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse" || down) return;
        var r = el.getBoundingClientRect(); el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%"); el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
      });
      el.addEventListener("click", function (e) { e.preventDefault(); if (!moved) openEvent(el.dataset.slug, true); });
    });
    window.addEventListener("resize", update); goTo(0, true); update();
  }

  /* ---------- jendela event (modal): tanpa pindah halaman, tombol Back menutup ---------- */
  var modal = null, openSlug = null, lastFocus = null;
  function ensureModal() {
    if (modal) return modal;
    modal = doc.createElement("div"); modal.className = "modal"; modal.hidden = true; modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true");
    modal.innerHTML = '<div class="modal-bg"></div><div class="modal-card"><button class="modal-x" aria-label="Close">✕</button><div class="modal-body"></div></div>';
    doc.body.appendChild(modal);
    modal.addEventListener("click", function (e) {
      if (e.target.classList.contains("modal-bg") || e.target.closest(".modal-x")) closeEvent();
      var nav = e.target.closest("[data-go]"); if (nav) openEvent(nav.dataset.go, false, true);
    });
    doc.addEventListener("keydown", function (e) {
      if (modal.hidden) return;
      if (e.key === "Escape") closeEvent();
      if (e.key === "Tab") {
        var f = $$("button,a[href]", modal).filter(function (x) { return x.offsetParent; }); if (!f.length) return;
        var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && doc.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && doc.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
    return modal;
  }
  function eventHTML(e, i) {
    var prev = EVENTS[(i + EVENTS.length - 1) % EVENTS.length], next = EVENTS[(i + 1) % EVENTS.length];
    return '<div class="m-grid"><div class="m-poster"><img src="' + e.poster + '" alt="' + esc(e.name) + ' poster" width="600" height="800"></div><div class="m-info">' +
      '<p class="eyebrow">' + (e.status === "upcoming" ? bi("Upcoming event", "Event mendatang") : bi("Past event", "Event lalu")) + '</p><h2 id="m-title">' + mark(e.name) + "</h2>" +
      (e.subtitle ? '<p class="lead" style="margin-top:.6rem">' + mark(e.subtitle) + "</p>" : "") +
      '<dl class="ev-facts"><div><dt>' + bi("Date", "Tanggal") + "</dt><dd>" + mark(e.date) + "</dd></div><div><dt>Venue</dt><dd>" + mark(e.venue) + "</dd></div><div><dt>" + bi("City", "Kota") + "</dt><dd>" + esc(e.city) + "</dd></div></dl>" +
      (e.ticketUrl ? '<div class="btns"><a class="btn primary" href="' + esc(e.ticketUrl) + '" rel="noopener" target="_blank">' + bi("Get Tickets (official)", "Beli Tiket (resmi)") + "</a></div>" : "") +
      '<p class="muted m-sum">' + mark(tr(e.summary)) + "</p>" +
      (e.partners.length ? '<p class="m-partners"><b>' + bi("Credits", "Kredit") + "</b> " + e.partners.map(esc).join(" · ") + "</p>" : "") + "</div></div>" +
      '<h3 class="m-h">' + bi("How it happened", "Bagaimana ini terjadi") + '</h3>' + (!e.story.some(function (s) { return tr(s.title) !== "[ISI]" || tr(s.body) !== "[ISI]"; }) ? '<p class="muted">' + mark("[ISI: cerita per fase: Announcement, Ticketing, Production, Show Day, Aftermath]") + "</p>" : '<ol class="m-story">' +
      e.story.map(function (s) { return '<li><span class="ph">' + esc(s.phase) + "</span><b>" + mark(tr(s.title)) + '</b><span class="muted">' + mark(tr(s.body)) + "</span></li>"; }).join("") + "</ol>") +
      '<h3 class="m-h">' + bi("By the numbers", "Dalam angka") + '</h3><div class="stats">' + e.stats.map(function (s) { return '<div class="stat glass"><b>' + mark(s.value) + "</b><span>" + esc(tr(s.label)) + "</span></div>"; }).join("") + "</div>" +
      '<h3 class="m-h">' + bi("Gallery", "Galeri") + '</h3><div class="strip">' + e.gallery.map(function (g) { return '<img src="' + g.src + '" alt="' + esc(g.alt) + '" loading="lazy" width="450" height="600">'; }).join("") + "</div>" +
      '<div class="m-nav"><button class="btn" data-go="' + prev.slug + '">← ' + mark(prev.name) + '</button><button class="btn" data-go="' + next.slug + '">' + mark(next.name) + " →</button></div>";
  }
  function renderModal() {
    var i = EVENTS.findIndex(function (e) { return e.slug === openSlug; }); if (i < 0) return;
    $(".modal-body", modal).innerHTML = eventHTML(EVENTS[i], i); $(".modal-card", modal).scrollTop = 0;
    modal.setAttribute("aria-labelledby", "m-title");
  }
  function openEvent(slug, push, swap) {
    if (!window.EVENTS || !EVENTS.some(function (e) { return e.slug === slug; })) return;
    ensureModal(); var wasOpen = !modal.hidden; openSlug = slug;
    if (!wasOpen) lastFocus = doc.activeElement;
    renderModal(); modal.hidden = false; doc.body.style.overflow = "hidden";
    if (swap && wasOpen) history.replaceState({ ev: slug }, "", "#event-" + slug);
    else if (push) history.pushState({ ev: slug }, "", "#event-" + slug);
    if (!wasOpen) { requestAnimationFrame(function () { modal.classList.add("show"); }); $(".modal-x", modal).focus(); }
  }
  function hideModal() { if (!modal || modal.hidden) return; modal.classList.remove("show"); modal.hidden = true; doc.body.style.overflow = ""; openSlug = null; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function closeEvent() { if (history.state && history.state.ev) history.back(); else { hideModal(); if (/^#event-/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search); } }
  function syncHash() { var m = /^#event-(.+)$/.exec(location.hash); if (m) openEvent(m[1], false); else hideModal(); }
  window.addEventListener("popstate", syncHash); window.addEventListener("hashchange", syncHash);
  function renderDynamic() { if (openSlug && modal && !modal.hidden) renderModal(); }

  /* ---------- promoter 101: pin horizontal ---------- */
  var hp = $(".h-pin");
  if (hp) {
    var tk = $(".h-track", hp);
    if (animate && window.ScrollTrigger && window.matchMedia("(min-width:900px)").matches) {
      gsap.to(tk, { x: function () { return -(tk.scrollWidth - window.innerWidth); }, ease: "none",
        scrollTrigger: { trigger: hp, pin: true, scrub: .6, end: function () { return "+=" + (tk.scrollWidth - window.innerWidth); }, invalidateOnRefresh: true } });
    } else root.classList.add("no-pin");
  }

  /* ---------- form contact ---------- */
  var form = $("#contact-form");
  if (form) form.addEventListener("submit", function (e) {
    var ep = form.getAttribute("action");
    if (/\[ISI/.test(ep)) { e.preventDefault(); show("err"); return; }   // endpoint Formspree belum diisi
    e.preventDefault();
    fetch(ep, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw 0; form.reset(); show("ok"); }).catch(function () { show("err"); });
    function show(k) { $$(".form-msg", form).forEach(function (m) { m.className = "form-msg" + (m.dataset.k === k ? " " + k : ""); }); }
  });

  if (track && window.EVENTS) { track.innerHTML = EVENTS.map(cardHTML).join(""); initCarousel(); }
  syncHash(); initScroll();
  window.addEventListener("load", function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); });
})();
