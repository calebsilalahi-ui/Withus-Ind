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
    { slug: "ikon", name: "iKON World Tour: FOUR EVER", subtitle: "Jakarta · Jay, Song, Bobby, Chan", artist: "iKON", status: "past",
      date: "21 Aug 2026 (Fri)", venue: "Istora Senayan", city: "Jakarta", poster: "assets/img/events/ikon.webp", heroImage: "assets/img/events/ikon.webp",
      accent: "#F47527", summary: ISI, story: story("assets/img/events/ikon.webp"), stats: stats(),
      gallery: [{ src: "assets/img/events/ikon.webp", alt: "iKON World Tour FOUR EVER Jakarta official poster" }, { src: H, alt: "[ISI] foto penonton" }], posters: ["assets/img/events/ikon.webp"], partners: [], ticketUrl: null },
    { slug: "park-ji-hoon", name: "Park Ji Hoon RE:FLECT Fanconcert", subtitle: "2026 Park Ji Hoon Asia Fancon in Jakarta", artist: "Park Ji Hoon", status: "past",
      date: "29 Aug 2026 (Sat)", venue: "Spike Air Dome, PIK 2", city: "Jakarta", poster: "assets/img/events/park-ji-hoon.webp", heroImage: "assets/img/events/park-ji-hoon.webp",
      accent: "#F47527", summary: ISI, story: story("assets/img/events/park-ji-hoon.webp"), stats: stats(),
      gallery: [{ src: "assets/img/events/park-ji-hoon.webp", alt: "Park Ji Hoon RE:FLECT Fanconcert Jakarta official poster" }, { src: H, alt: "[ISI] foto penonton" }], posters: ["assets/img/events/park-ji-hoon.webp"], partners: [], ticketUrl: null }
  ];
})();
