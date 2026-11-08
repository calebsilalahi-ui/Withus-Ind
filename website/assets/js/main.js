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
  var IC = {
    Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/>',
    X: '<path d="M4 4l16 16M20 4L4 20"/>',
    Facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
    Threads: '<path d="M17 8.5C16 5.5 12 5 10 6.5S7.5 11 8 14s3 4.5 5.5 4 3.5-2.5 3-4.5-3-3-5-2-1.5 3 .5 3 3-2 3-4"/>',
    TikTok: '<path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c0 2.5 2 4 4.5 4"/>',
    LinkedIn: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v6M8 7.5v.01M12 17v-6m0 3c0-2 4-3 4 0v3"/>',
    YouTube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/>'
  };
  function icon(n) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + IC[n] + "</svg>"; }
  var SOC = [["Instagram", "https://instagram.com/withusind"], ["X", "#"], ["Facebook", "#"], ["Threads", "#"], ["TikTok", "#"], ["LinkedIn", "#"], ["YouTube", "#"]];
  var f = $("#site-footer");
  if (f) {
    f.className = "site-footer"; f.setAttribute("role", "contentinfo");
    f.innerHTML = '<div class="wrap"><div class="foot-grid"><div><img src="' + base + 'assets/img/logo.png" width="114" height="45" alt="WithUs Indonesia">' +
      '<p class="muted" style="margin-top:14px">' + bi("Bridging Global Creative Vision with Indonesian Entertainment.", "Menjembatani Visi Kreatif Global dengan Industri Hiburan Indonesia.") + "</p>" +
      '<div class="socials">' + SOC.map(function (s) {
        return s[1] === "#" ? '<span title="[ISI] URL ' + s[0] + '" aria-label="' + s[0] + ' [ISI]">' + icon(s[0]) + "</span>" : '<a href="' + s[1] + '" rel="noopener" target="_blank" aria-label="' + s[0] + '">' + icon(s[0]) + "</a>";
      }).join("") + "</div></div>" +
      '<div><h3>' + bi("Contact", "Kontak") + '</h3><ul><li><a href="mailto:admin@withusindonesia.com">admin@withusindonesia.com</a><button class="copy-btn" type="button" data-copy="admin@withusindonesia.com">Copy</button></li><li>WhatsApp: <span class="isi">[ISI]</span></li>' +
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

  /* ---------- ring 3D: kartu melengkung di silinder, drag berinersia, snap, klik untuk fokus ---------- */
  var ringWrap = $("#ring");
  function initRing() {
    var ev = EVENTS, slots = [], reps = Math.max(1, Math.ceil(6 / ev.length));
    for (var r = 0; r < reps; r++) ev.forEach(function (e) { slots.push(e); });
    var n = slots.length, step = 360 / n, K = 14, fill = .86, phi = step * fill;
    var ringEl = $(".ring", ringWrap), tilt = $(".ring-tilt", ringWrap);
    var imgs = {}, cards = [], cw, ch, R, theta = 0, vel = 0, target = null, dragging = false, active = -1, last = 0;

    function norm(a) { a = ((a + 180) % 360 + 360) % 360 - 180; return a; }
    function build() {
      var w = ringWrap.clientWidth;
      cw = Math.round(Math.min(w * (w < 600 ? .6 : .36), 440)); ch = Math.round(cw * 4 / 3);
      R = Math.round(cw / (phi * Math.PI / 180));
      ringWrap.style.height = Math.round(ch + 90) + "px";
      var sw = cw / K; ringEl.innerHTML = ""; cards = [];
      slots.forEach(function (e, i) {
        var im = imgs[e.poster], nw = im.naturalWidth || 600, nh = im.naturalHeight || 800, sc = Math.max(cw / nw, ch / nh), dw = nw * sc, dh = nh * sc;
        var card = doc.createElement("div"); card.className = "rc"; card.dataset.i = i; var sl = [];
        for (var j = 0; j < K; j++) {
          var a = i * step + (j / (K - 1) - .5) * phi, d = doc.createElement("div"); d.className = "sl";
          d.style.cssText = "width:" + (sw + 3) + "px;height:" + ch + "px;left:" + (-sw / 2) + "px;top:" + (-ch / 2) + "px;background-image:url(" + e.poster + ");background-size:" + dw + "px " + dh + "px;background-position:" + ((cw - dw) / 2 - j * sw) + "px " + ((ch - dh) / 2) + "px;transform:rotateY(" + a.toFixed(3) + "deg) translateZ(" + R + "px)";
          card.appendChild(d); sl.push(d);
        }
        ringEl.appendChild(card); cards.push({ el: card, sl: sl, f: "" });
      });
      render(true);
    }
    function render(force) {
      ringEl.style.transform = "translateZ(" + (-R) + "px) rotateY(" + theta.toFixed(3) + "deg)";
      cards.forEach(function (c, i) {
        var ang = Math.abs(norm(i * step + theta)), t = Math.min(1, ang / (step * 1.2));
        var f = ang > 105 ? "hide" : "blur(" + (t * 5).toFixed(1) + "px) brightness(" + (1 - t * .5).toFixed(2) + ")";
        if (f === c.f && !force) return; c.f = f;
        c.el.style.visibility = f === "hide" ? "hidden" : "visible";
        if (f !== "hide") c.sl.forEach(function (s) { s.style.filter = f; });
      });
      var idx = ((Math.round(-theta / step) % n) + n) % n;
      if (idx !== active) { active = idx; caption(); }
    }
    function caption() {
      var e = slots[active], k = ev.indexOf(e);
      $("#rc-title").innerHTML = mark(e.name); $("#rc-meta").innerHTML = mark(e.date) + " · " + mark(e.venue);
      $("#rc-count").textContent = (k + 1) + " / " + ev.length; ringWrap.setAttribute("aria-label", e.name);
    }
    function focusIndex(i) { var t = -i * step; t += Math.round((theta - t) / 360) * 360; go(t); }
    function go(t) { target = t; vel = 0; if (reduce) { theta = t; target = null; render(); } else if (!raf) raf = requestAnimationFrame(loop); }
    var raf = 0;
    function loop() {
      raf = 0;
      if (!dragging) {
        if (target === null && Math.abs(vel) > .05) { theta += vel; vel *= .95; if (Math.abs(vel) < .4) { target = Math.round((theta + Math.max(-step * 1.4, Math.min(step * 1.4, vel * 5))) / step) * step; vel = 0; } }
        else if (target !== null) { var d = target - theta; theta += d * .11; if (Math.abs(d) < .03) { theta = target; target = null; } }
      }
      render();
      if (dragging || target !== null || Math.abs(vel) > .05) raf = requestAnimationFrame(loop);
    }
    // pointer: drag + momentum + klik
    var sx = 0, st = 0, moved = false, lx = 0, down = false;
    ringWrap.addEventListener("pointerdown", function (e) { if (e.button > 0) return; down = true; moved = false; sx = lx = e.clientX; st = theta; vel = 0; target = null; });
    window.addEventListener("pointermove", function (e) {
      if (!down) return; var dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 6) { moved = true; dragging = true; ringWrap.classList.add("drag"); try { ringWrap.setPointerCapture(e.pointerId); } catch (x) {} }
      if (moved) { var dg = (e.clientX - lx) * (phi / cw) * 1.1; vel = dg; theta = st + (e.clientX - sx) * (phi / cw) * 1.1; lx = e.clientX; if (!raf) raf = requestAnimationFrame(loop); }
    });
    window.addEventListener("pointerup", function (e) {
      if (!down) return; down = false;
      if (moved) { dragging = false; ringWrap.classList.remove("drag"); if (reduce) { go(Math.round((theta + Math.max(-step * 1.4, Math.min(step * 1.4, vel * 5))) / step) * step); } else if (!raf) raf = requestAnimationFrame(loop); setTimeout(function () { moved = false; }, 50); }
      else { var c = e.target.closest && e.target.closest(".rc"); if (c) { var i = +c.dataset.i; if (i === active) openEvent(slots[i].slug, true); else focusIndex(i); } }
    });
    $("#rc-prev").onclick = function () { focusIndex(active - 1); }; $("#rc-next").onclick = function () { focusIndex(active + 1); };
    $("#rc-open").onclick = function () { openEvent(slots[active].slug, true); };
    ringWrap.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); focusIndex(active + 1); } else if (e.key === "ArrowLeft") { e.preventDefault(); focusIndex(active - 1); } else if (e.key === "Enter") { e.preventDefault(); openEvent(slots[active].slug, true); }
    });
    // parallax: ring condong mengikuti kursor
    if (!reduce) ringWrap.addEventListener("pointermove", function (e) { if (e.pointerType !== "mouse" || down) return; var r = ringWrap.getBoundingClientRect(); tilt.style.transform = "rotateX(" + (((e.clientY - r.top) / r.height - .5) * -8).toFixed(2) + "deg)"; });
    ringWrap.addEventListener("pointerleave", function () { tilt.style.transform = ""; });
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(build, 150); });
    // preload (loading state), lalu bangun
    var urls = []; ev.forEach(function (e) { if (urls.indexOf(e.poster) < 0) urls.push(e.poster); });
    var left = urls.length;
    urls.forEach(function (u) { var im = new Image(); im.onload = im.onerror = function () { if (!--left) { build(); ringWrap.classList.remove("loading"); } }; imgs[u] = im; im.src = u; });
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
      (e.status === "upcoming" ? '<p class="eyebrow keep">' + bi("Upcoming", "Mendatang") + "</p>" : "") + '<h2 id="m-title">' + mark(e.name) + "</h2>" +
      (e.subtitle ? '<p class="lead" style="margin-top:.6rem">' + mark(e.subtitle) + "</p>" : "") +
      '<dl class="ev-facts"><div><dt>' + bi("Date", "Tanggal") + "</dt><dd>" + mark(e.date) + "</dd></div><div><dt>Venue</dt><dd>" + mark(e.venue) + ", " + esc(e.city) + "</dd></div></dl>" +
      (e.ticketUrl ? '<div class="btns"><a class="btn primary" href="' + esc(e.ticketUrl) + '" rel="noopener" target="_blank">' + bi("Get Tickets (official)", "Beli Tiket (resmi)") + "</a></div>" : "") +
      '<p class="muted m-sum">' + mark(tr(e.summary)) + "</p>" +
      (e.partners.length ? '<p class="m-partners"><b>' + bi("Credits", "Kredit") + "</b> " + e.partners.map(esc).join(" · ") + "</p>" : "") + "</div></div>" +
      '<h3 class="m-h">' + bi("How it happened", "Bagaimana ini terjadi") + '</h3>' + (!e.story.some(function (s) { return tr(s.title) !== "[ISI]" || tr(s.body) !== "[ISI]"; }) ? '<p class="muted">' + mark("[ISI: cerita per fase: Announcement, Ticketing, Production, Show Day, Aftermath]") + "</p>" : '<ol class="m-story">' +
      e.story.map(function (s) { return '<li><span class="ph">' + esc(s.phase) + "</span><b>" + mark(tr(s.title)) + '</b><span class="muted">' + mark(tr(s.body)) + "</span></li>"; }).join("") + "</ol>") +
      '<h3 class="m-h">' + bi("By the numbers", "Dalam angka") + '</h3><div class="stats">' + e.stats.map(function (s) { return '<div class="stat glass"><b>' + mark(s.value) + "</b><span>" + esc(tr(s.label)) + "</span></div>"; }).join("") + "</div>" +
      '<h3 class="m-h">' + bi("Gallery", "Galeri") + '</h3><div class="strip">' + e.gallery.map(function (g) { return '<img src="' + g.src + '" alt="' + esc(g.alt) + '" loading="lazy" width="450" height="600" onload="this.classList.add(\'ld\')">'; }).join("") + "</div>" +
      '<div class="m-nav"><button class="btn" data-go="' + prev.slug + '"><svg class="ico" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>' + mark(prev.name) + '</button><button class="btn" data-go="' + next.slug + '">' + mark(next.name) + '<svg class="ico" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button></div>';
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

  /* ---------- salin email + toast ---------- */
  var toastEl = null;
  function toast(msg) { if (!toastEl) { toastEl = doc.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); doc.body.appendChild(toastEl); } toastEl.textContent = msg; toastEl.classList.add("on"); clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("on"); }, 1800); }
  doc.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]"); if (!b) return; var v = b.dataset.copy;
    function ok() { toast(lang() === "id" ? "Email disalin" : "Email copied"); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(v).then(ok, function () { toast(v); }); else toast(v);
  });
  /* ---------- parallax latar saat scroll ---------- */
  var depthEls = $$("[data-depth]");
  if (depthEls.length && !reduce) {
    var pt = 0; window.addEventListener("scroll", function () { if (pt) return; pt = requestAnimationFrame(function () { pt = 0; var y = window.scrollY; depthEls.forEach(function (el) { el.style.transform = "translate3d(0," + (y * el.dataset.depth).toFixed(1) + "px,0)"; }); }); }, { passive: true });
  }

  /* ---------- form contact ---------- */
  var form = $("#contact-form");
  if (form) form.addEventListener("submit", function (e) {
    var ep = form.getAttribute("action");
    if (/\[ISI/.test(ep)) { e.preventDefault(); show("err"); return; }   // endpoint Formspree belum diisi
    e.preventDefault();
    var btn = $('button[type="submit"]', form); btn.setAttribute("aria-busy", "true"); btn.disabled = true;
    function done() { btn.removeAttribute("aria-busy"); btn.disabled = false; }
    fetch(ep, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw 0; form.reset(); show("ok"); }).catch(function () { show("err"); }).then(done);
    function show(k) { $$(".form-msg", form).forEach(function (m) { m.className = "form-msg" + (m.dataset.k === k ? " " + k : ""); }); }
  });

  if (ringWrap && window.EVENTS) initRing();
  syncHash(); initScroll();
  window.addEventListener("load", function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); });
})();
