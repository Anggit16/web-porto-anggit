# Laporan Audit — Website Portofolio Anggit Hardiyanto

Tanggal audit: 9 Oktober 2026
Ruang lingkup: bug, layout responsif, aksesibilitas, SEO, performa, serta seluruh interaksi desktop & mobile — termasuk menjalankan production build dan memperbaiki error.

**Ket.** ✅ Lulus · 🛠️ Gagal ditemukan → diperbaiki · ⚠️ Belum diuji (butuh browser/perangkat/domain nyata)

Cara verifikasi yang dipakai (tersedia di lingkungan ini):

```bash
npm run lint     # oxlint
npm test         # Vitest + React Testing Library (jsdom)
npm run build    # production build (Vite 8 / Rolldown)
npm run preview  # pratinjau build
```

> **Keterbatasan:** lingkungan ini **tidak memiliki browser sungguhan / headless** (Chrome/Playwright tidak terpasang). Verifikasi visual, Lighthouse, dan pembacaan screen reader karena itu ditandai **belum diuji**. Yang dapat diverifikasi secara objektif (build, lint, unit/DOM test, analisis statis kode, ukuran bundle, validitas markup) dilakukan di sini.

---

## 1. Ringkasan Hasil

| Kategori | Status | Ringkas |
|---|---|---|
| Production build | ✅ Lulus | `dist/` terbentuk, 1931 modul, tanpa warning |
| Lint | ✅ Lulus | 0 warning/error |
| Unit + DOM test | ✅ Lulus | 51 test / 11 file |
| Bug fungsional | 🛠️ 4 diperbaiki | font tak dimuat, overflow navbar, `aria-controls`, skip-link |
| Layout responsif | 🛠️ 1 diperbaiki + ⚠️ verifikasi visual | overflow navbar `md` diperbaiki; sisanya analisis statis |
| Aksesibilitas | 🛠️ 2 diperbaiki + ⚠️ screen reader | kontras & skip-link diperbaiki |
| SEO | 🛠️ 1 diperbaiki + ⚠️ domain | robots.txt + meta ditambah; canonical/OG image menunggu domain |
| Performa | ✅/🛠️ | font 158→87 kB; vendor split; build ramping |
| Interaksi desktop & mobile | ✅ (53 skenario DOM) + ⚠️ perangkat nyata | tercakup test; perilaku sentuh nyata belum diuji |

---

## 2. Bug & Error (ditemukan → diperbaiki)

| # | Temuan | Dampak | Status | Perbaikan |
|---|---|---|---|---|
| B1 | Token `--font-sans`/`--font-mono` menyebut "Inter"/"JetBrains Mono", tetapi **font tidak pernah dimuat** (tidak ada @font-face / link) | Desain jatuh ke font sistem; token menyesatkan | 🛠️ | Self-host `@fontsource-variable/inter` + `jetbrains-mono` (`src/main.jsx`), token di `src/index.css` |
| B2 | Navigasi desktop muncul di `md` (768px) — 6 menu + nama + toggle melampaui lebar → berdesakan/wrap pada header tinggi tetap | Layout rusak di tablet | 🛠️ | Breakpoint navigasi desktop dinaikkan ke `lg` (hamburger `lg:hidden`) |
| B3 | `aria-controls="mobile-menu"` menunjuk elemen yang **tidak ada di DOM** saat menu tertutup | Hubungan ARIA invalid | 🛠️ | Menu selalu dirender + atribut `hidden={!menuOpen}` |
| B4 | Skip-link (`href="#home"`) tidak menuju konten utama; `<main>` tidak dapat difokus | Skip-link tidak berfungsi sesuai label | 🛠️ | `href="#main-content"` + `<main tabIndex={-1}>` |
| B5 | `Button` memakai `size="sm"` yang **tidak terdefinisi** (tombol tanpa padding) | Tombol detail proyek tanpa padding | 🛠️ | Tambah varian `sm` di `Button.jsx` |
| B6 | **Build gagal**: Vite 8 (Rolldown) menolak `manualChunks` sebagai objek | Tidak bisa build produksi | 🛠️ | Ubah ke bentuk fungsi |
| B7 | `vercel.json` tanpa SPA `rewrites` → deep-link 404 di Vercel | Rute dalam selain `/` gagal | 🛠️ | Tambah `rewrites` catch-all + header keamanan |
| B8 | Urutan impor/efek menyebabkan warning `react(set-state-in-effect)` di hook CV | Lint tidak bersih | 🛠️ | Status `checking` diturunkan saat render, `setState` hanya di callback async |

Tidak ditemukan error runtime pada render penuh aplikasi (App dirender di seluruh test tanpa error/console-error).

---

## 3. Layout Responsif (320px–desktop)

| Uji | Status | Catatan |
|---|---|---|
| Tanpa `width` tetap melebihi viewport | ✅ | Semua grid/kontainer `max-w-*` + `px-*`; tidak ada `w-[...px]` kaku |
| Navigasi tanpa overflow (≤1023px pakai hamburger) | 🛠️→✅ | Diperbaiki di B2 |
| Teks panjang (email/URL) tidak memecah layout | ✅ | `truncate` + `min-w-0` di kanal kontak |
| Modal pada 320px | ✅ | `w-full max-w-2xl`, padding `p-4`, konten `overflow-y-auto` |
| Chip teknologi & CTA membungkus | ✅ | `flex flex-wrap` |
| Hierarki tipografi berskala | ✅ | `text-3xl sm:text-4xl`, `text-4xl sm:text-5xl lg:text-6xl` |
| Pemeriksaan visual nyata 320/375/768/1024/1440/1920 | ⚠️ | Butuh browser — belum diuji |
| Tidak ada scroll horizontal nyata | ⚠️ | Analisis statis lulus, verifikasi piksel belum |

---

## 4. Aksesibilitas

| Uji | Status | Catatan |
|---|---|---|
| Kontras teks sekunder ≥ 4.5:1 | 🛠️→✅ | `text-slate-500` (≈3.6–4.1:1) diganti `text-slate-400` (≈7:1) di 7 komponen |
| Heading hierarkis | ✅ | satu `h1` (Hero); `h2` per section; `h3`/`h4` di kartu & modal |
| Skip-link | 🛠️→✅ | Diperbaiki di B4 |
| Nama aksesibel semua kontrol | ✅ | tombol teks atau `aria-label` (toggle bahasa, hamburger, tutup modal, kembali ke atas, sosial) |
| Ikon dekoratif `aria-hidden` | ✅ | Semua ikon Lucide/SVG brand ditandai `aria-hidden` |
| `aria-current` section aktif | ✅ | Navbar desktop & mobile |
| `aria-expanded` + `aria-controls` hamburger | 🛠️→✅ | Diperbaiki di B3 |
| Focus-visible | ✅ | Outline aksen global (`:focus-visible`) |
| Modal | ✅ | `role="dialog"`, `aria-modal`, focus trap, Escape, klik backdrop, fokus kembali ke pemicu |
| `prefers-reduced-motion` | ✅ | Animasi/transisi + smooth-scroll dinonaktifkan |
| Label `<html lang>` sinkron bahasa | ✅ | Diuji |
| Kontras border dekoratif (≥3:1) | ⚠️ | Border kartu bernuansa redup (<3:1); tidak esensial untuk identifikasi kontrol, ditandai untuk tinjauan desain |
| Uji screen reader (NVDA/VoiceOver) | ⚠️ | Belum diuji |
| Audit aksesibilitas otomatis (axe/Lighthouse) | ⚠️ | Butuh browser — belum diuji |

---

## 5. SEO

| Uji | Status | Catatan |
|---|---|---|
| `<title>` + meta description | ✅ | Unik & deskriptif |
| Open Graph + Twitter card | ✅ | type, site_name, title, description, locale |
| `robots.txt` | 🛠️→✅ | Ditambahkan di `public/robots.txt` |
| `meta robots`/`author`/`color-scheme` | 🛠️→✅ | Ditambahkan |
| `<html lang>` | ✅ | `id` default, sinkron saat ganti bahasa |
| Favicon | ✅ | SVG |
| Heading & konten semantik | ✅ | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` |
| `canonical`, `og:url`, `og:image`/`twitter:image` | ⚠️ | Butuh domain produksi & aset gambar nyata (sengaja tidak diisi agar tidak dummy) |
| `sitemap.xml` | ⚠️ | Butuh domain produksi |
| Structured data (JSON-LD) | ⚠️ | Opsional; belum ditambahkan |

---

## 6. Performa

| Uji | Status | Angka / Catatan |
|---|---|---|
| Production build | ✅ | 1931 modul, tanpa warning |
| JS gzip | ✅ | app ≈ **14,5 kB** + vendor React ≈ **68,2 kB** |
| CSS gzip | ✅ | ≈ **8,5 kB** |
| Font (subset Latin) | 🛠️→✅ | Variable font: **≈87 kB** untuk SEMUA bobot (turun dari ≈158 kB statis) |
| Request pihak ketiga (font) | ✅ | 0 — font self-hosted |
| Vendor caching | ✅ | React dipisah chunk agar cache tidak batal |
| Cache-Control aset | ✅ | `immutable` (Netlify & Vercel) |
| Gangguan layout (CLS) dari font | ✅/⚠️ | `font-display: swap`; gambar tak ada; CLS nyata belum diukur |
| Lazy-load gambar | ✅ | `loading="lazy"` + `width/height` pada gambar proyek |
| Code-splitting per section | ⚠️ | Belum diterapkan (single entry); tidak kritis untuk halaman 1 halaman |
| Core Web Vitals (Lab/Field) | ⚠️ | Butuh browser — belum diukur |

---

## 7. Interaksi (Desktop & Mobile)

Diuji via React Testing Library (jsdom) — 51 test mencakup:

| Interaksi | Desktop | Mobile | Status |
|---|---|---|---|
| Navigasi smooth-scroll ke section | ✅ | ✅ (menu) | ✅ |
| Indikator section aktif | ✅ | ✅ | ✅ |
| Menu mobile buka/tutup (hamburger) | — | ✅ | ✅ |
| Menu tutup saat memilih nav | — | ✅ | ✅ |
| Menu tutup dengan Escape + body lock | — | ✅ | ✅ |
| Toggle bahasa ID/EN (pertahankan state) | ✅ | ✅ | ✅ |
| Filter proyek + `aria-pressed` | ✅ | ✅ | ✅ |
| Empty state filter + aksi "tampilkan semua" | ✅ | ✅ | ✅ |
| Modal detail proyek (buka/tutup/Escape/fokus) | ✅ | ✅ | ✅ |
| Tautan eksternal valid/invalid | ✅ | ✅ | ✅ |
| Unduh CV (4 status: idle/checking/available/missing) | ✅ | ✅ | ✅ |
| Kanal kontak (email/URL valid vs kosong) | ✅ | ✅ | ✅ |
| Kembali ke atas | ✅ | ✅ | ✅ |
| Skip-link | ✅ | ✅ | ✅ (dipindah ke `#main-content`) |
| Interaksi sentuh nyata (tap/scroll di perangkat) | ⚠️ | ⚠️ | Belum diuji |

---

## 8. Perintah Verifikasi Akhir

```
npm run lint   → 0 warning
npm test       → 11 file lulus, 51 test lulus
npm run build  → sukses (dist/ + robots.txt + font Latin)
```

---

## 9. Rekomendasi Lanjutan (belum dikerjakan)

1. QA visual di browser pada 320/375/768/1024/1440/1920px (nyata).
2. Jalankan Lighthouse/axe untuk aksesibilitas & performa.
3. Uji screen reader (NVDA/VoiceOver) dan navigasi keyboard penuh.
4. Tinjau kontras border dekoratif bila ingin memenuhi 1.4.11 secara ketat.
5. Setelah domain diketahui: isi `canonical`, `og:url`, `og:image`, `sitemap.xml`, lalu submit ke Search Console.
6. Pertimbangkan `inert`/`aria-hidden` pada konten latar saat modal terbuka (penguatan aksesibilitas).
7. Isi seluruh placeholder di `src/data/*` dengan data yang sudah dikonfirmasi pemilik.
