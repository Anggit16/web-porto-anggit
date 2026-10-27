/**
 * Data pendidikan, pengalaman kerja/magang, dan sertifikasi.
 *
 * ⚠️ PLACEHOLDER: tanggal, institusi, dan detail pengalaman BELUM dikonfirmasi.
 * Jangan mengisi tanggal/institusi fiktif. Cukup tambahkan entri dengan
 * nilai sebenarnya — UI akan menampilkannya otomatis.
 *
 * `experiences` dan `certifications` kosong = section menampilkan empty state.
 */

export const education = [
  {
    id: 'teknik-informatika',
    degree: 'Teknik Informatika',
    // ⚠️ PLACEHOLDER: institusi & tahun belum dikonfirmasi — JANGAN ditebak
    institution: 'Universitas Duta Bangsa Surakarta',
    period: '2022 - 2026',
    highlights: [],
  },
]

/** ⚠️ Kosong = belum ada pengalaman kerja/magang yang dapat dikonfirmasi. */
export const experiences = [
  {
    id: 'project-master',
    role: 'Software Developer',
    organization: 'Project Master ID',
    period: 'Ags 2025 - Jan 2026'
  }
]

/** ⚠️ Kosong = belum ada sertifikasi/pelatihan yang dapat dikonfirmasi. */
export const certifications = [
  {
    id: 'certificate',
    name: 'CERTIFICATE OF COMPETENCE (Junior Web Programmer)',
    issuer: 'Professional Certification Body Of Telematika Professional Indonesia',
    year: '2026 - 2029',
  }
]
