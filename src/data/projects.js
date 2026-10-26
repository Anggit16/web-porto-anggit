/**
 * Data proyek unggulan.
 *
 * ⚠️ PLACEHOLDER: deskripsi, kategori teknologi, tantangan/solusi/hasil
 * disusun dari informasi minimum yang tersedia (nama & jenis proyek).
 * Field `details` yang bernilai null akan tampil sebagai placeholder
 * "akan dikonfirmasi" di modal — bukan klaim palsu.
 *
 * `github` / `demo` null = tombol TIDAK dirender (tanpa tautan dummy).
 */

export const projects = [
  {
    id: 'computer-based-test',
    name: 'Computer Based Test',
    category: 'web-app',
    // ⚠️ PLACEHOLDER: gambar proyek — ganti dengan screenshot asli bila tersedia
    image: null,
    // Deskripsi faktual minimal dari jenis proyek:
    description: {
      id: 'Sistem ujian berbasis komputer dengan fitur penilaian esai otomatis.',
      en: 'A computer based test system featuring automatic essay scoring.',
    },
    // ⚠️ PLACEHOLDER: asosiasi teknologi per proyek belum dikonfirmasi
    technologies: [],
    github: null,
    demo: null,
    details: {
      challenge: null,
      solution: null,
      role: null,
      result: null,
    },
  },
  {
    id: 'point-of-sale',
    name: 'Point of Sale',
    category: 'web-app',
    image: null,
    description: {
      id: 'Aplikasi Point of Sale untuk pengelolaan transaksi penjualan.',
      en: 'A Point of Sale application for managing sales transactions.',
    },
    technologies: [],
    github: null,
    demo: null,
    details: {
      challenge: null,
      solution: null,
      role: null,
      result: null,
    },
  },
  {
    id: 'sudutjalan-kopi',
    name: 'Website SudutJalan Kopi',
    category: 'website',
    image: null,
    description: {
      id: 'Website profil untuk kedai kopi SudutJalan Kopi.',
      en: 'A profile website for the SudutJalan Kopi coffee shop.',
    },
    technologies: [],
    github: null,
    demo: null,
    details: {
      challenge: null,
      solution: null,
      role: null,
      result: null,
    },
  },
]

/** Daftar kategori untuk filter (label diterjemahkan via i18n). */
export const projectCategories = ['web-app', 'desktop', 'website']
