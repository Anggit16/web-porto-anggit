/**
 * Data identitas & kontak — SEMUA field di sini adalah sumber kebenaran.
 *
 * ⚠️ PLACEHOLDER: URL GitHub, LinkedIn, email, dan foto belum dikonfirmasi
 * pemilik. Isi nilai di bawah (non-null) dan tautan akan otomatis muncul
 * di seluruh situs. Jangan isi URL yang belum diverifikasi.
 */

export const profile = {
  name: 'Anggit Hardiyanto',
  // Foto profil di public/ (Vite menyajikan isi public/ di root URL).
  // File sudah dioptimasi 512x682 agar ringan; jangan ditimpa dengan file besar.
  photo: '/images/profile.jpeg',
  education: {
    degree: 'Teknik Informatika', // program studi — dikonfirmasi
    // ⚠️ PLACEHOLDER: nama institusi belum dikonfirmasi
    institution: 'Universitas Duta Bangsa Surakarta',
  },
  // ⚠️ PLACEHOLDER: ringkasan singkat untuk tab/preview (bisa disesuaikan)
  tagline: 'Software Developer',
}

/** Tautan sosial — null = TIDAK ditampilkan (tanpa tautan dummy). */
export const socialLinks = {
  github: 'https://github.com/Anggit16', // ⚠️ PLACEHOLDER: isi URL GitHub yang valid
  linkedin: 'https://www.linkedin.com/in/anggit-hardiyanto-505035447?utm_source=share_via&utm_content=profile&utm_medium=member_android', // ⚠️ PLACEHOLDER: isi URL LinkedIn yang valid
}

export const contactInfo = {
  // ⚠️ PLACEHOLDER: alamat email kerja belum dikonfirmasi
  email: 'anggithardiyanto228@gmail.com',
  location: 'Sukoharjo, Jawa Tengah, Indonesia', // opsional — isi jika ingin ditampilkan
}

/**
 * File CV di public/cv/. Set null jika belum ada —
 * tombol unduh akan disembunyikan secara otomatis.
 */
export const cvFile = '/cv/cv-anggit-software-developer.pdf' // mis. '/cv/anggit-hardiyanto-cv.pdf'

/** Ringkasan teknologi untuk Hero (urutan tampil). */
export const techHighlights = [
  'JavaScript',
  'PHP',
  'Python',
  'React.js',
  'Next.js',
  'Laravel',
  'Node.js',
  'Kivy',
  'Flutter',
  'React Native'
]
