/**
 * Data proyek unggulan.
 *
 * Bentuk field:
 * - `description` & `details.*` : objek bilingual { id, en } (dimuat lewat `t()`),
 *   atau `null` = belum terkonfirmasi → tampil placeholder jujur di modal.
 * - `technologies`              : array string (jadi chip). Kosong = placeholder.
 * - `github` / `demo`           : URL http(s) absolut, atau `null`.
 *                                 Null / URL tidak valid = tombol TIDAK dirender.
 *
 * Kejujuran data:
 * - Seluruh proyek di bawah sudah terisi data asli (teknologi, detail,
 *   tautan GitHub). Field yang BELUM dikonfirmasi biarkan `null` agar tampil
 *   sebagai placeholder — bukan klaim palsu.
 */

export const projects = [
  {
    id: 'computer-based-test',
    name: 'Computer Based Test',
    category: 'web-app',
    // ⚠️ PLACEHOLDER: gambar proyek — ganti dengan screenshot asli bila tersedia
    image: '/images/welcome-cbt.png',
    // Deskripsi faktual minimal dari jenis proyek:
    description: {
      id: 'Sistem ujian berbasis komputer dengan fitur penilaian esai otomatis.',
      en: 'A computer based test system featuring automatic essay scoring.',
    },
    // ⚠️ DRAFT: konfirmasi dengan stack asli proyek ini
    technologies: ['Laravel', 'PHP', 'MySQL', 'Javascript'],
    github: 'https://github.com/Anggit16/cbt-ai-skripsi', // isi 'https://github.com/...' bila repo-nya publik
    demo: null,
    details: {
      challenge: {
        id: 'Ujian masih dijalankan manual, sehingga penilaian esai memakan waktu dan rekap nilai sulit diarsipkan.',
        en: 'Exams were still run manually, so grading essays took time and score records were hard to archive.',
      },
      solution: {
        id: 'Membangun aplikasi ujian berbasis komputer: bank soal, pelaksanaan ujian terjadwal, dan penilaian esai otomatis.',
        en: 'Built a computer based test application: question bank, scheduled exam sessions, and automatic essay scoring.',
      },
      role: {
        id: 'Developer — merancang skema basis data serta mengembangkan modul ujian dan penilaiannya.',
        en: 'Developer — designed the database schema and built the exam and grading modules.',
      },
      result: {
        id: 'Penilaian esai berjalan otomatis sehingga rekap nilai lebih cepat dan arsip ujian terpusat.',
        en: 'Essay scoring became automated, making grade recap faster and exam archives centralized.',
      },
    },
  },
  {
    id: 'point-of-sale',
    name: 'Point of Sale',
    category: 'web-app',
    image: '/images/pointofsale.png',
    description: {
      id: 'Aplikasi Point of Sale untuk pengelolaan transaksi penjualan.',
      en: 'A Point of Sale application for managing sales transactions.',
    },
    technologies: ['Next.Js','JavaScript', 'MySQL', 'Laravel'],
    github: 'https://github.com/Anggit16/point-of-sale',
    demo: null,
    details: {
      challenge: {
        id: 'Sistem Kasir pada umumnya masih melakukan pencatatan stok dan transaksi secara manual. Dan rata-rata transaksi menggunakan metode pembayaran hanya dalam bentuk tunai.',
        en: 'Cashier systems generally still rely on manual stock and transaction recording, with most transactions limited to cash payments.',
      },
      solution: {
        id: 'Membangun sistem berbasis web dengan fitur pembayaran qris (payment gateway) dan riwayat stok serta transaksi secara real-time.',
        en: 'Developing a web-based system with QRIS payment gateway integration and real-time inventory and transaction history tracking.',
      },
      role: {
        id: 'Developer — merancang skema basis data serta mengembangkan metode pembayaran dengan payment gateway.',
        en: 'Developer — Designing database schemas and developing payment methods through payment gateway integration.',
      },
      result: {
        id: 'Transaksi antara pembeli dan penjual menjadi lebih praktis setelah adanya payment gateway',
        en: 'Transactions between buyers and sellers become more convenient with the integration of a payment gateway.',
      },
    },
  },
  {
    id: 'sudutjalan-kopi',
    name: 'Website SudutJalan Kopi',
    category: 'website',
    image: '/images/sudutjalankopi.png',
    description: {
      id: 'Website profil untuk kedai kopi SudutJalan Kopi.',
      en: 'A profile website for the SudutJalan Kopi coffee shop.',
    },
    technologies: ['JavaScript', 'HTML', 'Tailwind CSS', 'React.Js'],
    github: 'https://github.com/Anggit16/profile-sudutjlnkopi',
    demo: null,
    details: {
      challenge: {
        id: 'Mempromosikan product usaha merupakan hal yang penting dalam dunia usaha agar bisa dikenal oleh masyarakat luas.',
        en: 'Promoting business products is essential for increasing brand awareness and reaching a wider audience.',
      },
      solution: {
        id: 'Membangun Website company profile bertujuan agar product usaha bisa dikenal oleh masyarakat luas melalui dunia digital.',
        en: 'Developing a company profile website to promote business products and reach a wider audience through digital platforms.',
      },
      role: {
        id: 'Developer — merancang website dengan tampilan responsive dan menarik agar calon pembeli dapat memahami product usaha dan dapat dipercaya',
        en: 'Developer — Designing a responsive and visually appealing website to help potential customers understand the business products and build trust in the brand.',
      },
      result: {
        id: 'Website company profile SudutJalan Kopi memiliki tampilan responsive dan menarik sehingga calon pembeli dapat memahami product usaha dan dapat dipercaya',
        en: 'The SudutJalan Kopi company profile website features a responsive and attractive design that helps potential customers understand the business products and builds trust in the brand.',
      },
    },
  },
  {
    id: 'ekatalog-daging',
    name: 'Website Ekatalog Daging',
    category: 'website',
    image: '/images/welcome-ekatalogdaging.png',
    description: {
      id: 'Website untuk memudahkan transaksi antara pembeli dan penjual melaluai chat commerce.',
      en: 'A website that facilitates transactions between buyers and sellers through chat commerce.',
    },
    technologies: ['Laravel', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Anggit16/ekatalog_tkdaging',
    demo: null,
    details: {
      challenge: {
        id: 'Melakukan transaksi antara pembeli dan penjual melaluai chat commerce merupakan hal yang penting dalam dunia usaha terutama pada dunia digital.',
        en: 'Facilitating transactions between buyers and sellers through chat commerce is essential for businesses, especially in the digital marketplace.',
      },
      solution: {
        id: 'Membangun sistem berbasis web dengan fitur chat commerce memudahkan untuk customer dan merchant dalam melakukan transaksi.',
        en: 'Developing a web-based system with chat commerce features to facilitate transactions between customers and merchants.',
      },
      role: {
        id: 'Developer — merancang sistem dengan penjualan dengan fitur transaksi yang terintegrasi dengan whatsapp.',
        en: 'Developer — Designing a sales system with transaction features integrated with WhatsApp.',
      },
      result: {
        id: 'Sistem ekatalog berhasil dijalankan dengan transaksi antara pembeli dan penjual melalui chat commerce.',
        en: 'The e-catalog system was successfully implemented, enabling transactions between buyers and sellers through chat commerce.',
      },
    },
  },
  {
    id: 'absensi',
    name: 'Absensi',
    category: 'web-app',
    image: '/images/absensi2.png',
    description: {
      id: 'Website absensi karyawan berdasarkan foto dan titik koordinat lokasi.',
      en: 'A web-based employee attendance system using photo verification and GPS location coordinates.',
    },
    technologies: ['PHP Native', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Anggit16/absen-pm-main',
    demo: null,
    details: {
      challenge: {
        id: 'Absensi karyawan masih dilakukan secara manual atau jika di era sekarang bisa melalui finger print tetapi masih belum optimal.',
        en: 'Employee attendance is still recorded manually or through fingerprint systems, which may not be optimal for modern workplace needs.',
      },
      solution: {
        id: 'Membangun sistem berbasis aplikasi web dengan fitur absensi karyawan berdasarkan foto dan titik koordinat lokasi.',
        en: 'Developing a web-based employee attendance system with photo verification and GPS location tracking.',
      },
      role: {
        id: 'Developer — merancang skema basis data serta mengembangkan fitur absensi karyawan berdasarkan foto dan titik koordinat lokasi.',
        en: 'Developer — Designing database schemas and developing employee attendance features using photo verification and GPS location tracking.',
      },
      result: {
        id: 'Absensi berjalan dengan lancar dan bisa memudahkan karyawan absen dan juga membuat izin',
        en: 'The attendance system runs smoothly, making it easier for employees to record their attendance and submit leave requests.',
      },
    },
  },
  {
    id: 'ekatalog-jamu',
    name: 'Website Ekatalog Toko Jamu',
    category: 'website',
    image: '/images/welcome-ekatalogjamu.png',
    description: {
      id: 'Website untuk memudahkan transaksi antara pembeli dan penjual melaluai chat commerce.',
      en: 'A website that facilitates transactions between buyers and sellers through chat commerce.',
    },
    technologies: ['Laravel', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Anggit16/katalog-jamu',
    demo: null,
    details: {
      challenge: {
        id: 'Melakukan transaksi antara pembeli dan penjual melaluai chat commerce merupakan hal yang penting dalam dunia usaha terutama pada dunia digital.',
        en: 'Facilitating transactions between buyers and sellers through chat commerce is essential for businesses, especially in the digital marketplace.',
      },
      solution: {
        id: 'Membangun sistem berbasis web dengan fitur chat commerce memudahkan untuk customer dan merchant dalam melakukan transaksi.',
        en: 'Developing a web-based system with chat commerce features to facilitate transactions between customers and merchants.',
      },
      role: {
        id: 'Developer — merancang sistem dengan penjualan dengan fitur transaksi yang terintegrasi dengan whatsapp.',
        en: 'Developer — Designing a sales system with transaction features integrated with WhatsApp.',
      },
      result: {
        id: 'Sistem ekatalog berhasil dijalankan dengan transaksi antara pembeli dan penjual melalui chat commerce.',
        en: 'The e-catalog system was successfully implemented, enabling transactions between buyers and sellers through chat commerce.',
      },
    },
  },
]

/** Daftar kategori untuk filter (label diterjemahkan via i18n). */
export const projectCategories = ['web-app', 'desktop', 'website']
