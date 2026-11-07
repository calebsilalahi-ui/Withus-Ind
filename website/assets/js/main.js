/* WithUs Indonesia — main.js. Tanpa build step. GSAP/ScrollTrigger opsional (fallback tanpa animasi). */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var inEvents = /\/events\//.test(location.pathname);
  var base = inEvents ? "../" : "";
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
    h.innerHTML = '<div class="wrap"><a class="brand" href="' + base + 'index.html" aria-label="WithUs Indonesia"><img src="' + base + 'assets/img/logo.svg" width="150" height="33" alt="WithUs Indonesia"></a>' +
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
    f.innerHTML = '<div class="wrap"><div class="foot-grid"><div><img src="' + base + 'assets/img/logo.svg" width="150" height="33" alt="WithUs Indonesia">' +
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
    $$("[data-count]").forEach(function (el) {
      var to = parseFloat(el.dataset.count), o = { v: 0 };
      gsap.to(o, { v: to, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true }, onUpdate: function () { el.textContent = Math.round(o.v) + (el.dataset.suffix || ""); } });
    });
  }

  /* ---------- carousel ---------- */
  var track = $("#event-track");
  function cardHTML(e) {
    return '<a class="ecard" href="events/' + e.slug + '.html" data-slug="' + e.slug + '" style="--accent:' + e.accent + '"><span class="glass"></span>' +
      '<img src="' + e.poster + '" alt="' + esc(e.name) + ' poster" loading="lazy" width="600" height="800">' +
      '<div class="meta"><span class="tag">' + (e.status === "upcoming" ? bi("Upcoming", "Mendatang") : bi("Past event", "Event lalu")) + "</span>" +
      "<h3>" + mark(e.name) + '</h3><p class="sub">' + mark(e.date) + " · " + mark(e.venue) + ", " + esc(e.city) + "</p></div></a>";
  }
  function initCarousel() {
    var cards = $$(".ecard", track);
    function update() {
      var c = track.getBoundingClientRect(), mid = c.left + c.width / 2;
      cards.forEach(function (el) {
        var r = el.getBoundingClientRect(), d = Math.min(1, Math.abs(r.left + r.width / 2 - mid) / (c.width / 2));
        el.style.transform = "scale(" + (1 - d * .12).toFixed(3) + ")"; el.style.opacity = (1 - d * .45).toFixed(2);
        el.dataset.d = d;
      });
    }
    var tick; track.addEventListener("scroll", function () { cancelAnimationFrame(tick); tick = requestAnimationFrame(update); }, { passive: true });
    update(); window.addEventListener("resize", update);
    function step(dir) { var w = cards[0].getBoundingClientRect().width + 28; track.scrollBy({ left: dir * w, behavior: reduce ? "auto" : "smooth" }); }
    $("#car-prev").addEventListener("click", function () { step(-1); });
    $("#car-next").addEventListener("click", function () { step(1); });
    track.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") { e.preventDefault(); step(1); } if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); } });
    // drag mouse
    var down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
    window.addEventListener("pointermove", function (e) { if (!down) return; var dx = e.clientX - sx; if (Math.abs(dx) > 5) { moved = true; track.classList.add("drag"); } if (moved) track.scrollLeft = sl - dx; });
    window.addEventListener("pointerup", function () { if (!down) return; down = false; track.classList.remove("drag"); });
    track.addEventListener("click", function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
    // glare + tilt, nama view-transition untuk transisi kartu -> hero
    cards.forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", x * 100 + "%"); el.style.setProperty("--my", y * 100 + "%");
        if (!reduce) { var s = el.style.transform.replace(/ ?rotate[XY]\([^)]*\)/g, ""); el.style.transform = s + " rotateY(" + ((x - .5) * 10).toFixed(1) + "deg) rotateX(" + ((.5 - y) * 8).toFixed(1) + "deg)"; }
      });
      el.addEventListener("pointerleave", function () { update(); });
      el.addEventListener("click", function () { var img = $("img", el); if (img) img.style.viewTransitionName = "ev-hero"; });
    });
  }
  function renderDynamic() { if (track && window.EVENTS) { track.innerHTML = EVENTS.map(cardHTML).join(""); initCarousel(); } renderEventPage(); }

  /* ---------- halaman event ---------- */
  function renderEventPage() {
    var host = $("[data-event]"); if (!host || !window.EVENTS) return;
    var i = EVENTS.findIndex(function (e) { return e.slug === host.dataset.event; }); if (i < 0) return;
    var e = EVENTS[i], prev = EVENTS[(i + EVENTS.length - 1) % EVENTS.length], next = EVENTS[(i + 1) % EVENTS.length];
    host.style.setProperty("--accent", e.accent);
    var A = "../";
    host.innerHTML =
      '<section class="ev-hero"><div class="bg"><img src="' + A + e.heroImage + '" alt="" ></div><div class="wrap"><div>' +
      '<p class="eyebrow">' + (e.status === "upcoming" ? bi("Upcoming event", "Event mendatang") : bi("Past event", "Event lalu")) + "</p><h1>" + mark(e.name) + "</h1>" +
      '<div class="ev-facts"><div><b>' + bi("Date", "Tanggal") + "</b>" + mark(e.date) + "</div><div><b>Venue</b>" + mark(e.venue) + "</div><div><b>" + bi("City", "Kota") + "</b>" + esc(e.city) + "</div></div>" +
      (e.ticketUrl ? '<div class="btns"><a class="btn primary" href="' + esc(e.ticketUrl) + '" rel="noopener" target="_blank">' + bi("Get Tickets (official)", "Beli Tiket (resmi)") + "</a></div>" : "") +
      '</div><img class="poster" style="view-transition-name:ev-hero" src="' + A + e.poster + '" alt="' + esc(e.name) + ' poster" width="600" height="800"></div></section>' +
      '<section><div class="wrap"><p class="eyebrow">' + bi("Overview", "Ringkasan") + '</p><p class="lead" data-reveal>' + mark(tr(e.summary)) + "</p></div></section>" +
      '<section class="story"><div class="wrap"><p class="eyebrow">' + bi("How it happened", "Bagaimana ini terjadi") + '</p><h2>' + bi("From announcement to aftermath", "Dari pengumuman hingga pasca-event") + '</h2></div>' +
      '<div class="wrap story-grid"><div class="story-sticky"><div class="story-img">' + e.story.map(function (s, k) { return '<img class="' + (k ? "" : "on") + '" src="' + A + s.image + '" alt="' + esc(s.phase) + ' — ' + esc(e.name) + '" loading="lazy">'; }).join("") + '</div></div>' +
      '<div class="story-steps">' + e.story.map(function (s, k) { return '<article class="step' + (k ? "" : " on") + '"><p class="ph">0' + (k + 1) + " · " + esc(s.phase) + "</p><h3>" + mark(tr(s.title)) + "</h3><p class=\"muted\">" + mark(tr(s.body)) + "</p></article>"; }).join("") + "</div></div></section>" +
      '<section><div class="wrap"><p class="eyebrow">' + bi("By the numbers", "Dalam angka") + '</p><div class="stats">' + e.stats.map(function (s) {
        var n = /^\d+$/.test(s.value); return '<div class="stat glass" data-reveal><b' + (n ? ' data-count="' + s.value + '"' : "") + ">" + mark(s.value) + "</b><span>" + esc(tr(s.label)) + "</span></div>"; }).join("") + "</div></div></section>" +
      '<section><div class="wrap"><p class="eyebrow">Posters</p><div class="strip">' + e.posters.map(function (p) { return '<img src="' + A + p + '" alt="' + esc(e.name) + ' poster" loading="lazy" width="450" height="600">'; }).join("") + "</div></div></section>" +
      '<section><div class="wrap"><p class="eyebrow">' + bi("Gallery", "Galeri") + '</p><div class="filters" role="group" aria-label="Filter"><button data-f="all" aria-pressed="true">' + bi("All", "Semua") + '</button><button data-f="artist" aria-pressed="false">Artist</button><button data-f="crowd" aria-pressed="false">Crowd</button></div>' +
      '<div class="masonry">' + e.gallery.map(function (g, k) { return '<button data-type="' + g.type + '" data-k="' + k + '" aria-label="' + esc(g.alt) + '"><img src="' + A + g.src + '" alt="' + esc(g.alt) + '" loading="lazy"></button>'; }).join("") + "</div></div></section>" +
      (e.partners.length ? '<section><div class="wrap"><p class="eyebrow">' + bi("Partners", "Mitra") + "</p><p>" + e.partners.map(esc).join(" · ") + "</p></div></section>" : "") +
      '<section><div class="wrap ev-nav"><a class="glass" href="' + prev.slug + '.html"><small>' + bi("Previous", "Sebelumnya") + "</small><strong>" + mark(prev.name) + '</strong></a><a class="glass" href="' + next.slug + '.html"><small>' + bi("Next", "Berikutnya") + "</small><strong>" + mark(next.name) + "</strong></a></div>" +
      '<div class="wrap btns" style="justify-content:center"><a class="btn primary" href="../contact.html">' + bi("Work With Us", "Bekerja Sama") + "</a></div></section>" +
      '<div class="lightbox" role="dialog" aria-modal="true" aria-label="Gallery"><button class="lb-x" aria-label="Close">✕</button><button class="lb-p" aria-label="Previous">‹</button><img alt=""><button class="lb-n" aria-label="Next">›</button></div>';
    doc.title = doc.title; // judul statis; lihat README untuk SEO per event
    initStory(host); initGallery(host, e); initScroll();
  }
  function initStory(host) {
    var steps = $$(".step", host), imgs = $$(".story-img img", host);
    function on(k) { steps.forEach(function (s, j) { s.classList.toggle("on", j === k); }); imgs.forEach(function (im, j) { im.classList.toggle("on", j === k); }); }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) on(steps.indexOf(x.target)); }); }, { rootMargin: "-45% 0px -45% 0px" });
      steps.forEach(function (s) { io.observe(s); });
    }
  }
  function initGallery(host, e) {
    var btns = $$(".masonry button", host), lb = $(".lightbox", host), li = $("img", lb), cur = 0, vis = [];
    $$(".filters button", host).forEach(function (b) {
      b.addEventListener("click", function () {
        $$(".filters button", host).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        btns.forEach(function (g) { g.style.display = b.dataset.f === "all" || g.dataset.type === b.dataset.f ? "" : "none"; });
      });
    });
    function show(k) { vis = btns.filter(function (g) { return g.style.display !== "none"; }); cur = (k + vis.length) % vis.length; var g = e.gallery[+vis[cur].dataset.k]; li.src = "../" + g.src; li.alt = g.alt; }
    var opener;
    btns.forEach(function (g) { g.addEventListener("click", function () { opener = g; vis = btns.filter(function (x) { return x.style.display !== "none"; }); show(vis.indexOf(g)); lb.classList.add("open"); $(".lb-x", lb).focus(); }); });
    function close() { lb.classList.remove("open"); if (opener) opener.focus(); }
    $(".lb-x", lb).onclick = close; $(".lb-p", lb).onclick = function () { show(cur - 1); }; $(".lb-n", lb).onclick = function () { show(cur + 1); };
    lb.addEventListener("click", function (ev) { if (ev.target === lb) close(); });
    doc.addEventListener("keydown", function (ev) { if (!lb.classList.contains("open")) return; if (ev.key === "Escape") close(); if (ev.key === "ArrowLeft") show(cur - 1); if (ev.key === "ArrowRight") show(cur + 1); });
    var tx = 0; lb.addEventListener("touchstart", function (ev) { tx = ev.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (ev) { var d = ev.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) show(cur + (d < 0 ? 1 : -1)); });
  }

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

  renderDynamic(); initScroll();
  window.addEventListener("load", function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); });
})();
