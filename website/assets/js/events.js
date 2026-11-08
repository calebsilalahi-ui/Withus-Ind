/* SATU-SATUNYA sumber data event (carousel + jendela detail). Jangan mengarang data.
   "[ISI]" = belum diisi, "[VERIFIKASI]" = harus dicek. Tambah event: salin satu objek di bawah. */
(function () {
  var P = "assets/img/placeholder-poster.svg", H = "assets/img/placeholder-photo.svg";
  var ISI = { en: "[ISI]", id: "[ISI]" };
  function story(img) {
    return ["Announcement", "Ticketing", "Production", "Show Day", "Aftermath"].map(function (ph) {
      return { phase: ph, title: ISI, body: ISI, image: img || H };
    });
  }
  function stats() {
    return [
      { label: { en: "Attendance", id: "Jumlah penonton" }, value: "[VERIFIKASI]" },
      { label: { en: "Show days", id: "Hari pertunjukan" }, value: "[VERIFIKASI]" },
      { label: { en: "Partners", id: "Mitra" }, value: "[VERIFIKASI]" }
    ];
  }
  window.EVENTS = [
    { slug: "kim-bum", name: "Kim Bum Fanmeeting: PAGE", subtitle: "Debut 20th Anniversary Tour Jakarta", artist: "Kim Bum", status: "past",
      date: "24 Oct 2026 (Sat), 18:30", venue: "Bengkel Hall SCBD", city: "Jakarta", poster: "assets/img/events/kim-bum.webp", heroImage: "assets/img/events/kim-bum.webp",
      accent: "#F47527",
      summary: { en: "Kim Bum Fanmeeting PAGE, the Debut 20th Anniversary Tour, stopped in Jakarta at Bengkel Hall SCBD. [ISI: ringkasan]", id: "Kim Bum Fanmeeting PAGE, Debut 20th Anniversary Tour, singgah di Jakarta di Bengkel Hall SCBD. [ISI: ringkasan]" },
      story: story("assets/img/events/kim-bum.webp"), stats: stats(),
      gallery: [{ src: "assets/img/events/kim-bum.webp", alt: "Kim Bum Fanmeeting PAGE official poster" }],
      posters: ["assets/img/events/kim-bum.webp"], partners: ["Kingkong by Starship", "VICSHOT", "WithUs Indonesia"], ticketUrl: null },
    { slug: "ikon", name: "iKON", subtitle: "[ISI: nama event]", artist: "iKON", status: "past",
      date: "21 Aug 2026 (Fri)", venue: "Istora Senayan", city: "Jakarta", poster: "assets/img/events/ikon.svg", heroImage: H,
      accent: "#F47527", summary: ISI, story: story(), stats: stats(),
      gallery: [{ src: H, alt: "[ISI] foto iKON" }, { src: H, alt: "[ISI] foto penonton" }], posters: ["assets/img/events/ikon.svg"], partners: [], ticketUrl: null },
    { slug: "park-ji-hoon", name: "Park Ji Hoon", subtitle: "[ISI: nama event]", artist: "Park Ji Hoon", status: "past",
      date: "[ISI]", venue: "[ISI]", city: "Jakarta", poster: P, heroImage: H,
      accent: "#F47527", summary: ISI, story: story(), stats: stats(),
      gallery: [{ src: H, alt: "[ISI] foto Park Ji Hoon" }, { src: H, alt: "[ISI] foto penonton" }], posters: [P], partners: [], ticketUrl: null }
  ];
})();
