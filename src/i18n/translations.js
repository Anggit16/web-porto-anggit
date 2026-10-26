/**
 * Terjemahan terpusat untuk seluruh UI.
 * - `id` = Bahasa Indonesia (default)
 * - `en` = English
 *
 * Catatan: nama proyek resmi, nama teknologi, dan URL TIDAK diterjemahkan
 * (nilai non-teks ditangani langsung oleh komponen / file data).
 */
export const translations = {
  id: {
    a11y: {
      skipToContent: 'Langsung ke konten utama',
      openMenu: 'Buka menu navigasi',
      closeMenu: 'Tutup menu navigasi',
      language: 'Pilih bahasa situs',
      backToTop: 'Kembali ke ke atas halaman',
      mainNav: 'Navigasi utama',
      footerNav: 'Navigasi footer',
      themeToLight: 'Aktifkan mode terang',
      themeToDark: 'Aktifkan mode gelap',
    },
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      skills: 'Keahlian',
      projects: 'Proyek',
      experience: 'Pendidikan & Pengalaman',
      contact: 'Kontak',
    },
    hero: {
      greeting: 'Halo, saya',
      role: 'Software Developer',
      description:
        'Lulusan Teknik Informatika yang berfokus pada pengembangan perangkat lunak — mulai dari antarmuka pengguna hingga logika di sisi server.',
      ctaProjects: 'Lihat Proyek',
      ctaContact: 'Hubungi Saya',
      techTitle: 'Teknologi utama',
      monogramAlt: 'Monogram Anggit Hardiyanto',
      available: 'Terbuka untuk peluang kerja',
      photoAlt: 'Foto profil {{name}}',
    },
    about: {
      label: 'Tentang Saya',
      title: 'Mengenal Saya Lebih Dekat',
      subtitle:
        'Latar belakang pendidikan, minat, dan cara saya bekerja dalam pengembangan perangkat lunak.',
      paragraphs: [
        'Saya lulusan Teknik Informatika dengan fondasi pendidikan di bidang pemrograman dan pengembangan perangkat lunak.',
        'Saya tertarik membangun aplikasi yang memecahkan masalah nyata — mulai dari sistem ujian berbasis komputer, aplikasi Point of Sale, hingga website bisnis.',
        'Dalam memecahkan masalah, saya memulai dari pemahaman kebutuhan, memecah masalah menjadi bagian yang lebih kecil, lalu memilih pendekatan yang sederhana dan mudah dipelihara.',
        'Tujuan profesional saya adalah terus berkembang sebagai software developer dengan membangun perangkat lunak yang berguna dan tertulis dengan rapi.',
      ],
      interestsTitle: 'Bidang yang diminati',
      interests: [
        'Pengembangan aplikasi web',
        'Sistem informasi & bisnis',
        'Otomasi penilaian dan evaluasi',
      ],
      cvTitle: 'Curriculum Vitae',
      cvButton: 'Unduh CV',
      cvUnavailable: 'File CV belum tersedia. Tombol unduh akan aktif setelah file ditambahkan ke folder public/cv.',
      cvChecking: 'Memeriksa ketersediaan berkas CV…',
      cvError:
        'Berkas CV tidak dapat ditemukan di server. Silakan hubungi saya melalui kanal kontak agar dokumen dapat dikirimkan langsung.',
    },
    skills: {
      label: 'Keahlian',
      title: 'Keterampilan & Teknologi',
      subtitle:
        'Bahasa pemrograman, framework, dan perkembangan teknologi yang saya gunakan.',
      groups: {
        languages: 'Bahasa Pemrograman',
        frontend: 'Frontend Development',
        backend: 'Backend Development',
        mobile: 'Mobile Development',
        tools: 'Tools & Workflow',
      },
      toolsNote:
        'Daftar tools akan dilengkapi setelah dikonfirmasi. Silakan perbarui src/data/skills.js.',
    },
    projects: {
      label: 'Karya',
      title: 'Proyek Unggulan',
      subtitle:
        'Beberapa proyek yang mewakili fokus pengembangan perangkat lunak saya.',
      filterLabel: 'Filter kategori proyek',
      filters: {
        all: 'Semua',
        'web-app': 'Aplikasi Web',
        desktop: 'Aplikasi Desktop',
        website: 'Website',
      },
      viewDetail: 'Lihat Detail',
      imageAlt: 'Ilustrasi proyek {{name}}',
      empty:
        'Tidak ada proyek pada kategori ini. Silakan pilih kategori lain.',
      showAll: 'Tampilkan semua proyek',
      modal: {
        title: 'Detail Proyek',
        description: 'Deskripsi',
        role: 'Peran',
        challenge: 'Tantangan',
        solution: 'Solusi',
        result: 'Hasil',
        technologies: 'Teknologi',
        links: 'Tautan',
        github: 'GitHub',
        liveDemo: 'Live Demo',
        close: 'Tutup detail proyek',
        placeholder:
          'Bagian ini akan dilengkapi setelah datanya dikonfirmasi.',
        noLinks: 'Tautan repository atau demo belum tersedia.',
        statusPlaceholder: 'Detail proyek masih berupa placeholder dan perlu dikonfirmasi.',
      },
    },
    experience: {
      label: 'Perjalanan',
      title: 'Pendidikan & Pengalaman',
      subtitle: 'Ringkasan latar belakang akademik dan profesional.',
      educationTitle: 'Pendidikan',
      experienceTitle: 'Pengalaman Kerja & Magang',
      certificationTitle: 'Sertifikasi & Pelatihan',
      placeholderInstitution: 'Nama institusi belum diisi',
      placeholderPeriod: 'Periode belum diisi',
      emptyEducation:
        'Belum ada data pendidikan yang dapat ditampilkan. Informasi akan ditambahkan setelah dikonfirmasi.',
      emptyExperience:
        'Belum ada pengalaman kerja atau magang yang dapat ditampilkan. Informasi akan ditambahkan setelah dikonfirmasi.',
      emptyCertification:
        'Belum ada sertifikasi atau pelatihan yang dapat ditampilkan. Informasi akan ditambahkan setelah dikonfirmasi.',
    },
    contact: {
      label: 'Kontak',
      title: 'Mari Terhubung',
      subtitle:
        'Terbuka untuk peluang pekerjaan sebagai Junior Software Developer / Frontend / Backend Developer, serta proyek freelance pengembangan website dan aplikasi.',
      ctaTitle: 'Punya Proyek atau Peluang?',
      ctaText:
        'Saya menerima diskusi mengenai lowongan pekerjaan maupun proyek pengembangan website dan aplikasi. Silakan hubungi melalui kanal di bawah ini.',
      channelsTitle: 'Kanal Kontak',
      channels: {
        email: 'Email',
        github: 'GitHub',
        linkedin: 'LinkedIn',
      },
      unavailable: 'Belum tersedia',
      setupNote:
        'Kanal kontak akan diaktifkan setelah URL/email diisi di src/data/site.js.',
      formNote:
        'Situs ini belum memiliki formulir kontak terkonfigurasi. Tanpa backend pada tahap ini, silakan gunakan tautan email yang tersedia.',
    },
    footer: {
      menu: 'Menu',
      rights: 'Hak cipta dilindungi.',
      builtWith: 'Dibangun dengan React & Tailwind CSS.',
    },
  },

  en: {
    a11y: {
      skipToContent: 'Skip to main content',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      language: 'Select site language',
      backToTop: 'Back to top of page',
      mainNav: 'Main navigation',
      footerNav: 'Footer navigation',
      themeToLight: 'Switch to light mode',
      themeToDark: 'Switch to dark mode',
    },
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Education & Experience',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hello, I am',
      role: 'Software Developer',
      description:
        'Informatics graduate focused on software development — from user interfaces to server-side logic.',
      ctaProjects: 'View Projects',
      ctaContact: 'Contact Me',
      techTitle: 'Core technologies',
      monogramAlt: 'Anggit Hardiyanto monogram',
      available: 'Open to opportunities',
      photoAlt: 'Profile photo of {{name}}',
    },
    about: {
      label: 'About Me',
      title: 'Get to Know Me',
      subtitle:
        'My educational background, interests, and how I approach software development.',
      paragraphs: [
        'I am an Informatics graduate with an academic foundation in programming and software development.',
        'I am interested in building applications that solve real problems — from computer based test systems and Point of Sale applications to business websites.',
        'When solving problems, I start by understanding the requirements, break the problem into smaller parts, then choose a simple and maintainable approach.',
        'My professional goal is to keep growing as a software developer while building useful, well-structured software.',
      ],
      interestsTitle: 'Areas of interest',
      interests: [
        'Web application development',
        'Information & business systems',
        'Assessment and evaluation automation',
      ],
      cvTitle: 'Curriculum Vitae',
      cvButton: 'Download CV',
      cvUnavailable:
        'The CV file is not available yet. The download button will activate once the file is added to the public/cv folder.',
      cvChecking: 'Checking CV file availability…',
      cvError:
        'The CV file could not be found on the server. Please reach out through the contact channels so the document can be shared directly.',
    },
    skills: {
      label: 'Skills',
      title: 'Skills & Technologies',
      subtitle:
        'Programming languages, frameworks, and technologies I work with.',
      groups: {
        languages: 'Programming Languages',
        frontend: 'Frontend Development',
        backend: 'Backend Development',
        mobile: 'Mobile Development',
        tools: 'Tools & Workflow',
      },
      toolsNote:
        'The tools list will be added once confirmed. Update src/data/skills.js to show it.',
    },
    projects: {
      label: 'Work',
      title: 'Featured Projects',
      subtitle:
        'A selection of projects that reflect my focus on software development.',
      filterLabel: 'Filter project categories',
      filters: {
        all: 'All',
        'web-app': 'Web Application',
        desktop: 'Desktop Application',
        website: 'Website',
      },
      viewDetail: 'View Details',
      imageAlt: 'Illustration for the {{name}} project',
      empty:
        'No projects in this category. Please choose another category.',
      showAll: 'Show all projects',
      modal: {
        title: 'Project Details',
        description: 'Description',
        role: 'Role',
        challenge: 'Challenge',
        solution: 'Solution',
        result: 'Result',
        technologies: 'Technologies',
        links: 'Links',
        github: 'GitHub',
        liveDemo: 'Live Demo',
        close: 'Close project details',
        placeholder:
          'This section will be completed once the data is confirmed.',
        noLinks: 'Repository or demo links are not available yet.',
        statusPlaceholder:
          'Project details are placeholders and need confirmation.',
      },
    },
    experience: {
      label: 'Journey',
      title: 'Education & Experience',
      subtitle: 'A summary of my academic and professional background.',
      educationTitle: 'Education',
      experienceTitle: 'Work & Internship Experience',
      certificationTitle: 'Certifications & Training',
      placeholderInstitution: 'Institution name not filled in yet',
      placeholderPeriod: 'Period not filled in yet',
      emptyEducation:
        'No education information to show yet. Information will be added once confirmed.',
      emptyExperience:
        'No work or internship experience to show yet. Information will be added once confirmed.',
      emptyCertification:
        'No certifications or training to show yet. Information will be added once confirmed.',
    },
    contact: {
      label: 'Contact',
      title: "Let's Connect",
      subtitle:
        'Open to junior software developer, frontend, or backend positions, as well as freelance website and application development projects.',
      ctaTitle: 'Have a Project or Opportunity?',
      ctaText:
        'I am happy to discuss job openings as well as website and application development projects. Please reach out through the channels below.',
      channelsTitle: 'Contact Channels',
      channels: {
        email: 'Email',
        github: 'GitHub',
        linkedin: 'LinkedIn',
      },
      unavailable: 'Not available yet',
      setupNote:
        'Contact channels will be enabled once the URL/email is filled in at src/data/site.js.',
      formNote:
        'This site does not have a configured contact form yet. Without a backend at this stage, please use the available email link.',
    },
    footer: {
      menu: 'Menu',
      rights: 'All rights reserved.',
      builtWith: 'Built with React & Tailwind CSS.',
    },
  },
}
