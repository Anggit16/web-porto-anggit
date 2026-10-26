/**
 * Helper navigasi antar-section.
 *
 * Menyediakan perilaku "error" yang eksplisit: bila section tujuan tidak
 * ditemukan, fungsi mengembalikan `false` dan memberi peringatan di console
 * (mode dev) alih-alih gagal diam-diam.
 */

/** Hormati preferensi pengguna untuk mengurangi animasi. */
function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Gulir ke section berdasarkan id.
 * @returns {boolean} true bila section ditemukan & digulir, false bila tidak.
 */
export function scrollToSection(id) {
  if (typeof document === 'undefined') return false
  const el = document.getElementById(id)
  if (!el) {
    if (import.meta.env?.DEV) {
      console.warn(`[navigasi] Section "${id}" tidak ditemukan — aksi navigasi diabaikan.`)
    }
    return false
  }
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
  return true
}

/** Gulir kembali ke atas halaman. */
export function scrollToTop() {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
