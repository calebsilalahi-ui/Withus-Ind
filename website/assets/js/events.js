/* SATU-SATUNYA sumber data event. Dipakai carousel (Home) dan halaman events/*.html.
   Tanda "[ISI]" = belum diisi, "[VERIFIKASI]" = angka/fakta harus dicek. Jangan mengarang data.
   Tambah event: tambah 1 objek di bawah + duplikat 1 file events/*.html (ganti data-event). */
(function () {
  var P = "assets/img/placeholder-poster.svg", H = "assets/img/placeholder-photo.svg";
  var ISI = { en: "[ISI]", id: "[ISI]" };
  function phases(slug) {
    return ["Announcement", "Ticketing", "Production", "Show Day", "Aftermath"].map(function (ph) {
      return { phase: ph, title: ISI, body: ISI, image: H };
    });
  }
  function base(slug, name, artist, accent) {
    return {
      slug: slug, name: name, artist: artist, status: "past", /* [VERIFIKASI] past | upcoming */
      date: "[ISI]", venue: "[ISI]", city: "Jakarta",
      poster: P, heroImage: H, accent: accent,
      summary: ISI,
      story: phases(slug),
      stats: [
        { label: { en: "Attendance", id: "Jumlah penonton" }, value: "[VERIFIKASI]" },
        { label: { en: "Show days", id: "Hari pertunjukan" }, value: "[VERIFIKASI]" },
        { label: { en: "Partners", id: "Mitra" }, value: "[VERIFIKASI]" }
      ],
      gallery: [
        { src: H, alt: "[ISI] artist", type: "artist" }, { src: P, alt: "[ISI] artist", type: "artist" },
        { src: H, alt: "[ISI] crowd", type: "crowd" }, { src: P, alt: "[ISI] crowd", type: "crowd" },
        { src: H, alt: "[ISI] crowd", type: "crowd" }, { src: P, alt: "[ISI] artist", type: "artist" }
      ],
      posters: [P], partners: [], ticketUrl: null /* hanya link platform tiket resmi */
    };
  }
  window.EVENTS = [
    base("ikon", "iKON", "iKON", "#F47527"),
    base("kim-bum", "Kim Bum", "Kim Bum", "#F47527"),
    base("park-ji-hoon", "Park Ji Hoon", "Park Ji Hoon", "#F47527")
  ];
})();
