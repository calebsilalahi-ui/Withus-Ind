# Website WithUs Indonesia (Fase 1)

HTML/CSS/JS statis, tanpa build step. Salin folder `website/` ke situs yang ada (atau set sebagai root).
Uji lokal: `cd website && python3 -m http.server 8000`.

## Warna
Oranye `#F47527`, hitam, putih, plus percikan kecil biru royal `#4169E1` (`--royal`, token di `:root` pada `assets/css/style.css`). Latar semua halaman: gradien oranye beranimasi + percikan biru (pseudo-element `body::before/::after`; mati otomatis saat reduced-motion).

## Struktur
- `index.html`, `promoter-101.html`, `about.html`, `services.html`, `contact.html`, `privacy-policy.html`, `terms.html`
- Bagian event di Home pas satu layar desktop: kartu datar (satu elemen per poster, tanpa irisan), semua kartu bisa diklik, panah di sisi kiri/kanan, tombol "See event" menempel di bawah layar (fixed) selama bagian event terlihat
- Event tampil sebagai jendela (modal) di Home, tanpa halaman terpisah. Link langsung: `index.html#event-<slug>`; tombol Back/Esc menutup jendela
- `assets/js/events.js`: SATU-SATUNYA sumber data event (carousel + jendela event)
- `assets/js/main.js`: header/footer (satu sumber), animasi GSAP, carousel, lightbox, toggle bahasa
- Bilingual: pasangan elemen `lang="en"` / `lang="id"`, toggle ID|EN di header (disimpan di localStorage)
- GSAP 3.12.5 + ScrollTrigger dari cdnjs. Tanpa GSAP / dengan reduced-motion, situs tetap berfungsi tanpa animasi.

## Tambah event
Tambah satu objek di `events.js` (salin salah satu yang ada) dan taruh gambar di `assets/img/events/`. Tidak perlu file HTML baru.
Mengisi event: cukup prompt "Park Ji Hoon: tanggal, venue, cerita per fase, angka".

## Yang masih harus diisi sebelum tayang
Semua tanda **[ISI]** dan **[VERIFIKASI]** tampil oranye bergaris di halaman; cari di kode dengan `grep -rn "ISI\|VERIFIKASI" website`.
- Poster Kim Bum, iKON, dan Park Ji Hoon sudah dipasang (resolusi rendah, ±390px; kirim file resolusi tinggi). Foto event masih placeholder. Perlu izin tertulis agensi/principal
- Detail 3 event (tanggal, venue, cerita, angka, status past/upcoming)
- Formulir kontak kini hanya mengirim lewat WhatsApp (tidak ada Formspree); site key Turnstile tidak lagi diperlukan; ID GA4
- WhatsApp, URL sosial media resmi (X, FB, Threads, TikTok, LinkedIn, YouTube)
- `assets/img/og-image.jpg` sudah ada (1200x630, 44 KB); uji dengan Facebook Sharing Debugger setelah tayang
- Klaim FAQ (imigrasi, asuransi, GOERS), KBLI, Privacy/Terms ditinjau penasihat hukum
- Logo: `assets/img/logo.png` dari file yang dikirim
- Promoter 101: bagian "Aturan main di Indonesia" bersumber dari artikel publik (daftar di halaman). Verifikasi dengan instansi/penasihat hukum sebelum tayang
- Kim Bum: simbol ornamen di judul "PAGE" belum dipastikan; ringkasan, cerita, dan angka masih [ISI]
- Carousel Home adalah ring 3D: irisan vertikal membentuk kartu melengkung. Jika event kurang dari 6, event diulang agar ring penuh. Tambah event di `events.js` dan ring menyesuaikan
- Statistik Home hanya memuat angka yang terverifikasi (20+ tahun tim, 3 pertunjukan 2026); tambah angka lain setelah diverifikasi
- Salin email, ikon sosial, dan link Instagram memakai SVG bawaan (tanpa library). Komponen shadcn/skiper tidak dipakai karena situs ini statis tanpa build

## Deploy dan update (untuk klien dan tim web)
**Deploy hanya folder `website/`.** Folder lain di repo (`.claude`, `.agents`, `scripts`, `CLAUDE.md`) adalah alat internal dan tidak boleh ikut tayang.

Cara paling aman dan paling mudah diperbarui: hubungkan repo ke Cloudflare Pages atau Netlify, atur *root directory* = `website`, *build command* kosong. Setelah itu setiap `git push` ke branch utama otomatis tayang dalam sekitar satu menit; setiap branch mendapat link preview sendiri; versi lama bisa di-rollback dengan satu klik.
Tanpa Git: unggah ulang isi `website/` (Netlify Drop) atau ganti hanya file yang berubah lewat File Manager/FTP (cPanel). Selalu ganti angka `?v=` pada tag CSS/JS di semua halaman agar browser pengunjung memuat versi baru.

## Keamanan dan privasi (sudah dipasang)
- Semua skrip dan font disajikan dari situs sendiri (GSAP dan font ada di `assets/vendor`, `assets/fonts`). Tidak ada permintaan ke pihak ketiga saat halaman dibuka.
- `_headers` (Netlify/Cloudflare Pages) dan `.htaccess` (Apache/cPanel) memasang CSP, HSTS, anti-clickjacking, nosniff, Referrer-Policy, dan Permissions-Policy. Setiap halaman juga memuat CSP lewat `<meta>` sebagai cadangan (GitHub Pages tidak bisa mengatur header).
- Banner cookie (`assets/js/consent.js`): data esensial (pilihan bahasa dan catatan persetujuan) selalu aktif; analytics baru dimuat setelah pengunjung mengizinkan. Untuk mengaktifkan GA4 isi `GA4_ID` di `consent.js`. Pengunjung bisa mengubah pilihan lewat "Cookie settings" di footer.
- Form kontak meminta centang persetujuan sebelum data dipakai; tanggal persetujuan ikut tertulis di pesan WhatsApp.
- `.well-known/security.txt` memuat kontak untuk laporan celah keamanan. Perbarui tanggal `Expires` setiap tahun.
- Setelah tayang, uji di securityheaders.com dan observatory.mozilla.org.
