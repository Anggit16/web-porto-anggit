# Portofolio Anggit Hardiyanto

Website portofolio profesional untuk **Anggit Hardiyanto** — lulusan Teknik Informatika yang berfokus pada pengembangan perangkat lunak. Dibangun sebagai aplikasi React statis (tanpa backend) untuk melamar pekerjaan sebagai Junior/Frontend/Backend Developer serta menerima proyek freelance.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · Lucide React · Fontsource (font variable self-hosted) · JavaScript (ES Modules) · Vitest (pengujian)

---

## Instalasi & Pengembangan

Prasyarat: **Node.js ≥ 20** dan **npm ≥ 10** (dikembangkan & diuji dengan Node 24.18.0, npm 11.16.0).

```bash
# 1. Install dependency
npm install

# 2. Jalankan dev server (http://localhost:5173)
npm run dev

# 3. Production build (output ke dist/)
npm run build

# 4. Pratinjau hasil build secara lokal
npm run preview

# 5. Lint (oxlint)
npm run lint

# 6. Jalankan test (Vitest + React Testing Library)
npm test
```

> **Catatan Windows:** jika `npm` diblokir Execution Policy PowerShell (`npm.ps1 cannot be loaded`), gunakan `npm.cmd` atau set `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

---

## Struktur Proyek

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, About, Skills, Projects, Experience, Contact
│   └── ui/              # Button, SectionHeading, ProjectCard, SocialLinks, BrandIcons
├── data/                # ★ SEMUA KONTEN — site, projects, skills, experience
├── i18n/                # translations.js (ID/EN) + LanguageContext.jsx
├── hooks/               # useActiveSection (scroll spy), useRemoteFileStatus (cek berkas CV)
├── utils/               # cn (class helper), url (validasi tautan), scroll (navigasi section)
├── test/                # setup.js (stub browser untuk Vitest)
├── App.jsx
└── main.jsx
public/
├── cv/                  # letakkan file CV di sini (mis. anggit-hardiyanto-cv.pdf)
├── icons/               # favicon.svg
└── images/              # foto profil & screenshot proyek
```

---

## Konten yang Perlu Diganti (Placeholder)

Semua data konten terpusat di folder `src/data/`. **Jangan mengisi informasi yang belum dikonfirmasi.** Field yang masih `null` otomatis menampilkan placeholder yang jelas di UI.

| File | Field | Status |
|---|---|---|
| `src/data/site.js` | `socialLinks.github` | ⚠️ URL GitHub belum diisi — isi untuk menampilkan tautan |
| `src/data/site.js` | `socialLinks.linkedin` | ⚠️ URL LinkedIn belum diisi |
| `src/data/site.js` | `contactInfo.email` | ⚠️ Alamat email kerja belum diisi |
| `src/data/site.js` | `profile.photo` | ✅ **Sudah terisi** — `/images/profile.jpeg` (512×682, dioptimasi dari 84 kB → 33 kB). File asli 952×1269 disimpan di `assets/original/profile.jpeg` (di luar `public/`, tidak ikut ter-deploy) |
| `src/data/site.js` | `cvFile` | ⚠️ CV — letakkan PDF di `public/cv/`, lalu isi path-nya |
| `src/data/projects.js` | `projects[].technologies` | ⚠️ Asosiasi teknologi per proyek belum dikonfirmasi |
| `src/data/projects.js` | `projects[].github` / `demo` | ⚠️ Tautan repo/demo — tombol hanya muncul jika diisi |
| `src/data/projects.js` | `projects[].details` | ⚠️ Tantangan/solusi/peran/hasil — tampil placeholder sampai diisi |
| `src/data/experience.js` | `education[].institution` / `period` | ⚠️ Institusi & tahun belum dikonfirmasi |
| `src/data/experience.js` | `experiences` / `certifications` | ⚠️ Kosong = empty state jujur tampil di UI |
| `src/data/skills.js` | `tools.items` | ⚠️ Daftar tools/workflow belum dikonfirmasi |
| `index.html` | SEO produksi | Tambahkan `og:url`, `canonical`, `og:image`/`twitter:image`, dan `sitemap.xml` setelah domain & aset nyata tersedia |

Setelah mengubah file `src/data/`, cukup simpan — dev server hot-reload, dan `npm run build` untuk produksi.

---

## Sistem Bilingual (ID/EN)

- Bahasa **default: Bahasa Indonesia**. Preferensi disimpan di `localStorage` (key: `portfolio-language`) dengan fallback aman bila penyimpanan gagal (private mode dsb.).
- Toggle ID/EN di navbar memperbarui seluruh teks UI tanpa reload dan tanpa kehilangan state (filter proyek, modal, menu mobile tetap utuh).
- Teks terjemahan: `src/i18n/translations.js`. Nama proyek resmi & teknologi tidak diterjemahkan.
- Atribut `<html lang>` otomatis mengikuti bahasa aktif.

---

## Tema Terang/Gelap

- **Toggle di navbar** (ikon matahari/bulan) untuk berpindah mode terang ↔ gelap tanpa reload; bila belum ada preferensi, ikut tema sistem (`prefers-color-scheme`).
- Preferensi disimpan di `localStorage` (key: `portfolio-theme`). Skrip inline di `index.html` menerapkan tema **sebelum paint** agar tidak ada kedipan ("flash") tema yang salah saat aplikasi dimuat.
- Seluruh warna UI memakai **token semantik** yang terpusat di `src/index.css`: `page`, `surface`, `raised`, `border`, `fg`, `accent-text`, dst. Nilai mode terang dioverride pada `html.light` — jadi menambah/menyesuaikan tema tidak perlu menyentuh komponen satu pun.
- Tema gelap tetap default; kontras mode terang tetap mengikuti standar WCAG AA (teks sekunder `fg-subtle` ≈ >4.5:1 di atas latar putih).
- `prefers-reduced-motion` menonaktifkan animasi reveal & dekoraatif.

## Pengujian

Tooling: **Vitest 5** + **@testing-library/react** + **jsdom** (kompatibel dengan Vite 8 & React 19).

```bash
npm test          # jalankan semua test sekali (CI-friendly)
npm run test:watch  # mode watch saat pengembangan
```

Cakupan test (51 test, 11 file):

- **`src/i18n/translations.test.js`** — paritas struktur kunci ID/EN, tidak ada nilai kosong, placeholder `{{...}}` konsisten di kedua bahasa.
- **`src/i18n/LanguageContext.test.jsx`** — bahasa default ID, toggle ID↔EN memperbarui seluruh section, tanpa kebocoran teks bahasa lawan, persistensi ke `localStorage`, `<html lang>` sinkron, serta **state filter proyek tetap terjaga saat bahasa diganti**.
- **`src/components/sections/Projects.test.jsx`** — filter per kategori, `aria-pressed`, **empty state** + aksi pulih "tampilkan semua", buka/tutup **modal** (tombol, Escape), label modal terterjemah, dan modal tetap terbuka saat bahasa berganti.
- **`src/components/sections/ProjectsLinks.test.jsx`** — URL tidak valid disembunyikan, hanya tautan valid yang dirender di modal.
- **`src/components/layout/Navbar.test.jsx`** — tautan navigasi, smooth-scroll, menu mobile (buka/tutup/nav/Escape), label nav ikut berganti bahasa, dan tahun footer dinamis.
- **`src/components/sections/About.test.jsx`** — status unduh CV: `available` (tombol), `idle` (belum tersedia), `checking` (memeriksa), `missing` (error jujur).
- **`src/components/sections/Contact.test.jsx`** — email/GitHub valid menjadi tautan, kanal kosong → "Belum tersedia", penjelasan tanpa formulir.
- **`src/components/ui/SocialLinks.test.jsx`** — hanya tautan valid dirender; nilai kosong/invalid → tidak ada tautan dummy.
- **`src/utils/url.test.js`** — validasi URL http(s) & email.
- **`src/utils/scroll.test.js`** — navigasi mengembalikan `true`/`false` eksplisit (bukan gagal diam-diam).
- **`src/hooks/useRemoteFileStatus.test.js`** — status berkas: 200 non-HTML → available; 404 / HTML SPA-fallback / network error → missing.

Stub browser (`IntersectionObserver`, `scrollIntoView`, `matchMedia`) disediakan di `src/test/setup.js` agar test berjalan tanpa browser sungguhan.

> Catatan: pengujian ini berfokus pada perilaku & teks, **bukan** verifikasi visual. QA tampilan responsif (320–1920px) sebaiknya tetap dilakukan di browser.

---

## Perilaku Kontrol UI (Sukses / Kosong / Error)

Setiap kontrol interaktif punya jalur yang jelas — tidak ada tautan dummy atau simulasi pengiriman.

| Kontrol | Sukses | Kosong | Error |
|---|---|---|---|
| Navigasi (Navbar/Footer/Hero) | menggulir ke section + indikator aktif | — | section tak ditemukan → `scrollToSection()` kembalikan `false` + peringatan dev |
| Mobile menu | buka/tutup, pilih nav, Escape, body lock | — | — |
| Filter proyek | daftar terfilter | pesan kosong + tombol **Tampilkan semua** | — |
| Detail proyek (modal) | modal + detail | placeholder "akan dikonfirmasi" | tautan invalid/tanpa tautan → pesan jujur |
| Tautan eksternal | `target="_blank"` + `rel="noopener noreferrer"` | nilai kosong → tidak dirender | URL malformed → diperlakukan "belum tersedia" |
| Unduh CV | tombol muncul setelah HEAD 200 non-HTML | `cvFile` null → "belum tersedia" | berkas hilang/404 → pesan error, tombol tidak dirender |
| Kontak | `mailto:`/tautan valid | kanal kosong → "Belum tersedia" + catatan setup | email/URL invalid → "Belum tersedia" |
| Back to top | gulir ke atas | — | — |
| Skip link | lompat ke konten utama | — | — |

> **Tanpa formulir kontak** (tidak ada backend) sehingga tidak ada "pesan sukses" palsu. Kanal kontak hanya aktif bila URL/email valid diisi di `src/data/site.js`.

---

## Catatan Desain & Kejujuran Konten

- **Tanpa klaim palsu:** tidak ada persentase keahlian, angka pengguna, sertifikat, URL dummy, atau "pesan sukses" formulir palsu.
- **Tanpa formulir kontak** pada tahap ini (tanpa backend) — CTA kontak menggunakan penjelasan + tautan email bila tersedia.
- **Tautan eksternal** divalidasi (`src/utils/url.js`): hanya URL http(s)/email yang sah yang dirender, dan selalu memakai `target="_blank"` + `rel="noopener noreferrer"`. Nilai kosong/invalid disembunyikan atau ditandai "belum tersedia".
- Tombol **Unduh CV** muncul hanya setelah berkas terverifikasi ada (HEAD request + cek `Content-Type`), sehingga tidak pernah mengarah ke tautan 404.
- Ikon brand GitHub/LinkedIn memakai SVG sendiri (`src/components/ui/BrandIcons.jsx`) karena lucide-react v1 tidak lagi menyertakan ikon merek.

---

## Aksesibilitas & SEO

- Heading hierarkis (`h1` → `h2` → `h3`), skip-link (fokus pindah ke `<main id="main-content" tabindex="-1">`), focus-visible, label ARIA, `aria-current` untuk section aktif.
- Kontras teks sekunder memenuhi WCAG AA: minimal `text-slate-400` (≈7:1) di atas latar gelap; `text-slate-500` tidak dipakai untuk teks informasi.
- Hormati `prefers-reduced-motion` — animasi/transisi dan smooth-scroll dinonaktifkan.
- Modal: `role="dialog"`, `aria-modal`, focus trap, tutup dengan Escape/klik backdrop, fokus kembali ke pemicu. Tombol hamburger memakai `aria-expanded` + `aria-controls` yang selalu valid.
- Meta di `index.html`: title, description, author, robots, Open Graph, Twitter card, `color-scheme: dark`, theme-color, favicon SVG.
- `public/robots.txt` disertakan (sitemap menunggu domain produksi).

> **Belum diisi (menunggu domain/aset nyata):** `canonical`, `og:url`, `og:image`/`twitter:image`, dan `sitemap.xml`. Nilai sengaja dikosongkan agar tidak ada URL/aset dummy.

---

## Performa

- **Font self-hosted (variable):** satu berkas per family mencakup semua bobot (100–900) — Inter Variable + JetBrains Mono Variable. Browser hanya mengunduh subset Latin (≈47 kB + ≈40 kB woff2) untuk **semua** bobot, bukan satu berkas per bobot. Tidak ada request ke font pihak ketiga.
- **Vendor split:** React/ReactDOM dipisahkan (`react--*.js`) agar cache jangka panjang tidak batal saat kode aplikasi berubah (`vite.config.js` → `manualChunks`).
- **Build produksi:** total ≈ **14,5 kB + 68,2 kB gzip JS**, **8,5 kB gzip CSS**, **≈87 kB woff2** (subset Latin). Tanpa gambar berat, tanpa library UI tambahan.
- Aset di `/assets/*` memakai `Cache-Control: immutable` di Netlify & Vercel.

---

## Deployment

Build produksi: `npm run build` → folder `dist/`.

### Netlify
1. Hubungkan repository ke Netlify.
2. Build command: `npm run build` · Publish directory: `dist`.
3. `netlify.toml` sudah disediakan (SPA fallback + header keamanan + cache asset).

### Vercel
1. Import repository ke Vercel (framework preset: **Vite**).
2. `vercel.json` sudah disediakan (SPA rewrite + header keamanan + cache asset/HTML).

Setelah deploy, isi `canonical`, `og:url`, gambar OG, dan `sitemap.xml` di `index.html`/`public/`, lalu pastikan file CV/foto sudah diunggah.

---

## Lisensi

Hak cipta dilindungi © Anggit Hardiyanto.
