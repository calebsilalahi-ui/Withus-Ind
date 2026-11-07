# Website WithUs Indonesia (Fase 1)

HTML/CSS/JS statis, tanpa build step. Salin folder `website/` ke situs yang ada (atau set sebagai root).
Uji lokal: `cd website && python3 -m http.server 8000`.

## Warna
Hanya oranye `#F47527`, hitam, putih (token di `:root` pada `assets/css/style.css`).

## Struktur
- `index.html`, `promoter-101.html`, `about.html`, `services.html`, `contact.html`, `privacy-policy.html`, `terms.html`
- `events/*.html`: satu file per event, semuanya sama kecuali `data-event`, `<title>`, meta, dan JSON-LD
- `assets/js/events.js`: SATU-SATUNYA sumber data event (carousel Home + halaman event)
- `assets/js/main.js`: header/footer (satu sumber), animasi GSAP, carousel, lightbox, toggle bahasa
- Bilingual: pasangan elemen `lang="en"` / `lang="id"`, toggle ID|EN di header (disimpan di localStorage)
- GSAP 3.12.5 + ScrollTrigger dari cdnjs. Tanpa GSAP / dengan reduced-motion, situs tetap berfungsi tanpa animasi.

## Tambah event
1. Tambah satu objek di `events.js` (salin `base(...)`).
2. Duplikat `events/ikon.html`, ganti `data-event="slug"`, title, meta, JSON-LD.
Mengisi event: cukup prompt "Park Ji Hoon: tanggal, venue, cerita per fase, angka", lalu field di `events.js` diisi.

## Yang masih harus diisi sebelum tayang
Semua tanda **[ISI]** dan **[VERIFIKASI]** tampil oranye bergaris di halaman; cari di kode dengan `grep -rn "ISI\|VERIFIKASI" website`.
- Foto & poster asli (sekarang placeholder SVG; perlu izin tertulis agensi/principal)
- Detail 3 event (tanggal, venue, cerita, angka, status past/upcoming)
- Endpoint Formspree (`contact.html`, `action`), site key Cloudflare Turnstile, ID GA4
- WhatsApp, URL sosial media resmi (X, FB, Threads, TikTok, LinkedIn, YouTube)
- `assets/img/og-image.jpg` 1200x630 (<300 KB); sementara ada `og-image.svg` sebagai acuan desain
- Klaim FAQ (imigrasi, asuransi, GOERS), KBLI, Privacy/Terms ditinjau penasihat hukum
- Logo asli (`assets/img/logo.svg` masih wordmark sementara)
