/* WithUs Indonesia: cookie and storage consent.
   Rules this file enforces:
   - Essential storage (language choice, this consent record) is always on.
   - Analytics (Google Analytics 4) never loads unless the visitor allows it AND GA4_ID below is set.
   - Accept and Reject are equally easy; the choice can be changed anytime from the footer ("Cookie settings").
   To enable analytics: put the Measurement ID below (format G-XXXXXXXXXX). Nothing else needs to change. */
(function () {
  "use strict";
  var GA4_ID = "";                 // [ISI] e.g. "G-ABC123XYZ9"; empty = analytics stays off for everyone
  var KEY = "wu-consent", VERSION = 1, MAX_AGE = 180 * 864e5; // ask again after about 6 months
  var doc = document, root = doc.documentElement;
  var lastFocus = null, gaLoaded = false;

  function bi(en, id) { return '<span lang="en">' + en + '</span><span lang="id">' + id + "</span>"; }
  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || "null");
      if (c && c.v === VERSION && typeof c.analytics === "boolean" && Date.now() - c.ts < MAX_AGE) return c;
    } catch (e) {}
    return null;
  }
  function write(analytics) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: analytics, ts: Date.now() })); } catch (e) {}
  }

  function loadGA() {
    if (gaLoaded || !/^G-[A-Z0-9]{6,}$/.test(GA4_ID)) return;
    gaLoaded = true;
    window["ga-disable-" + GA4_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    gtag("js", new Date());
    gtag("config", GA4_ID, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
    var s = doc.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID);
    doc.head.appendChild(s);
  }
  function stopGA() {
    if (GA4_ID) window["ga-disable-" + GA4_ID] = true;
    // remove first-party GA cookies left from an earlier opt-in
    doc.cookie.split(";").forEach(function (c) {
      var n = c.split("=")[0].trim();
      if (/^_ga(_|$)|^_gid$|^_gat/.test(n)) {
        ["", "." + location.hostname, "." + location.hostname.replace(/^www\./, "")].forEach(function (d) {
          doc.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (d ? "; domain=" + d : "") + "; SameSite=Lax";
        });
      }
    });
  }
  function apply(c) { if (c && c.analytics) loadGA(); else stopGA(); }

  /* ---------- UI ---------- */
  var box = null;
  function build() {
    box = doc.createElement("section");
    box.className = "consent"; box.hidden = true;
    box.setAttribute("role", "dialog"); box.setAttribute("aria-labelledby", "consent-title"); box.setAttribute("aria-describedby", "consent-desc");
    box.innerHTML =
      '<div class="consent__main">' +
        '<h2 id="consent-title" class="consent__title">' + bi("Your privacy choices", "Pilihan privasi Anda") + "</h2>" +
        '<p id="consent-desc" class="consent__text">' + bi(
          'We always store your language choice so the site stays in your language. With your permission we also measure visits with anonymous analytics. Nothing else is stored. <a href="privacy-policy.html#cookies">Read the Privacy Policy</a>.',
          'Kami selalu menyimpan pilihan bahasa Anda agar situs tetap dalam bahasa Anda. Dengan izin Anda, kami juga mengukur kunjungan dengan analytics anonim. Tidak ada data lain yang disimpan. <a href="privacy-policy.html#cookies">Baca Kebijakan Privasi</a>.') + "</p>" +
        '<div class="consent__prefs" hidden>' +
          '<div class="consent__row"><div><strong>' + bi("Essential", "Esensial") + '</strong><span>' + bi("Language choice and this consent record. Needed for the site to work.", "Pilihan bahasa dan catatan persetujuan ini. Diperlukan agar situs berfungsi.") + '</span></div>' +
            '<span class="consent__always">' + bi("Always on", "Selalu aktif") + "</span></div>" +
          '<div class="consent__row"><div><strong id="consent-an-label">' + bi("Analytics", "Analytics") + '</strong><span>' + bi("Anonymous visit statistics (Google Analytics 4) to improve the site. Off by default.", "Statistik kunjungan anonim (Google Analytics 4) untuk memperbaiki situs. Nonaktif secara bawaan.") + "</span></div>" +
            '<label class="consent__switch"><input type="checkbox" id="consent-analytics" aria-labelledby="consent-an-label"><span aria-hidden="true"></span></label></div>' +
        "</div>" +
      "</div>" +
      '<div class="consent__actions">' +
        '<button type="button" class="consent__btn" data-c="reject">' + bi("Reject non-essential", "Tolak non-esensial") + "</button>" +
        '<button type="button" class="consent__btn" data-c="accept">' + bi("Accept all", "Terima semua") + "</button>" +
        '<button type="button" class="consent__link" data-c="customize" aria-expanded="false">' + bi("Customize", "Atur pilihan") + "</button>" +
        '<button type="button" class="consent__btn consent__save" data-c="save" hidden>' + bi("Save my choices", "Simpan pilihan saya") + "</button>" +
      "</div>";
    doc.body.appendChild(box);
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-c]"); if (!b) return;
      var a = b.dataset.c;
      if (a === "accept") decide(true);
      else if (a === "reject") decide(false);
      else if (a === "save") decide($("#consent-analytics").checked);
      else if (a === "customize") togglePrefs(box.querySelector(".consent__prefs").hidden);
    });
    box.addEventListener("keydown", function (e) { if (e.key === "Escape") decide(false); });
  }
  function $(s) { return box.querySelector(s); }
  function togglePrefs(open) {
    box.querySelector(".consent__prefs").hidden = !open;
    $("[data-c=customize]").setAttribute("aria-expanded", String(open));
    $("[data-c=save]").hidden = !open;
  }
  function show(focus) {
    if (!box) build();
    var c = read();
    $("#consent-analytics").checked = !!(c && c.analytics);
    togglePrefs(false);
    box.hidden = false;
    requestAnimationFrame(function () { box.classList.add("is-on"); });
    if (focus) { lastFocus = doc.activeElement; $("[data-c=reject]").focus(); }
  }
  function decide(analytics) {
    write(analytics); apply({ analytics: analytics });
    box.classList.remove("is-on"); box.hidden = true;
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); lastFocus = null; }
  }

  window.WU_openConsent = function () { show(true); };
  doc.addEventListener("click", function (e) { if (e.target.closest("[data-open-consent]")) { e.preventDefault(); show(true); } });

  var saved = read();
  apply(saved);
  if (!saved) setTimeout(function () { show(false); }, 700);   // appears after first paint, never blocks the page
})();
