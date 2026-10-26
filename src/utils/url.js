/**
 * Validasi tautan & kontak.
 *
 * Tujuan: memastikan situs HANYA merender tautan yang benar-benar valid,
 * sehingga tidak ada tautan dummy yang "tampak nyata" namun rusak (404 /
 * mailto kosong). Nilai yang tidak valid diperlakukan sebagai "belum tersedia".
 */

/** True hanya untuk URL absolut http(s) yang well-formed. */
export function isValidHttpUrl(value) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (!/^https?:\/\/\S+$/i.test(trimmed)) return false
  try {
    const url = new URL(trimmed)
    return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname)
  } catch {
    return false
  }
}

/** True untuk alamat email yang wajar (tanpa spasi, ada @ dan domain). */
export function isValidEmail(value) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (trimmed === '' || /\s/.test(trimmed)) return false
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)
}

/** Bangun href `mailto:` yang aman, atau null bila email tidak valid. */
export function toMailto(value) {
  return isValidEmail(value) ? `mailto:${value.trim()}` : null
}
