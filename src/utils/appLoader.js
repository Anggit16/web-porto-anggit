/**
 * Splash / loading screen awal.
 *
 * Markup splash ditulis statis di `index.html` (bukan komponen React) supaya
 * sudah tampil sebelum bundel JS dieksekusi — menghindari layar kosong.
 * Modul ini hanya menangani kapan splash boleh menghilang.
 *
 * Aturan durasi:
 * - Splash baru boleh hilang SETELAH React merender frame pertama.
 * - Diberi batas minimum (`MIN_LOADER_MS`) agar tidak cuma "berkedip" ketika
 *   bundel sudah tersimpan di cache — animasi tetap sempat terlihat.
 */

/** Durasi tampil minimum splash (ms). 3 detik. */
export const MIN_LOADER_MS = 3000

/** Durasi animasi fade-out; harus selaras dengan `transition` di index.html. */
export const LOADER_FADE_MS = 520

/**
 * Sembunyikan splash bila ada.
 *
 * @param {{ minVisibleMs?: number }} [options]
 * @returns {boolean} true bila splash ditemukan dan proses sembunyi dijadwalkan.
 */
export function hideAppLoader({ minVisibleMs = MIN_LOADER_MS } = {}) {
  if (typeof document === 'undefined') return false

  const loader = document.getElementById('app-loader')
  if (!loader) return false

  // Catatan: nilai 0 tetap valid (splash baru saja dibuat), jadi bedakan
  // "tidak diketahui" (NaN) dari 0 dengan Number.isFinite.
  const shownAt = Number(window.__appLoaderShownAt)
  const elapsed = Number.isFinite(shownAt) ? performance.now() - shownAt : minVisibleMs
  const remaining = Math.max(0, minVisibleMs - elapsed)

  const finish = () => {
    loader.classList.add('is-done')
    // Lepas kunci scroll segera agar pengguna bisa langsung menggulir.
    document.documentElement.classList.remove('app-loading')
    window.setTimeout(() => loader.remove(), LOADER_FADE_MS)
  }

  if (remaining > 0) window.setTimeout(finish, remaining)
  else finish()

  return true
}
