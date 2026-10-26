/**
 * Data keterampilan, dikelompokkan sesuai kategori yang diminta.
 * Hanya teknologi yang dikonfirmasi pemilik yang dicantumkan.
 * TANPA persentase / progress bar kemampuan.
 */

export const skillGroups = [
  {
    id: 'languages',
    items: ['JavaScript', 'PHP', 'Python'],
  },
  {
    id: 'frontend',
    items: ['React.js'],
  },
  {
    id: 'backend',
    items: ['Laravel', 'Node.js'],
  },
  {
    id: 'mobile',
    items: ['Kivy'],
  },
  {
    // ⚠️ PLACEHOLDER: daftar tools/workflow belum dikonfirmasi.
    // Tambahkan item (mis. 'Git') agar grup ini tampil terisi.
    id: 'tools',
    items: [],
  },
]
