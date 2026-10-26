import { useEffect, useState } from 'react'

/**
 * Periksa ketersediaan berkas statis (mis. CV) lewat HEAD request sebelum
 * menampilkan tombol unduh — agar tombol TIDAK pernah mengarah ke berkas
 * yang tidak ada (yang akan menghasilkan 404 diam-diam).
 *
 * Status:
 * - `idle`      : URL kosong → tampilkan pesan "belum tersedia"
 * - `checking`  : sedang memeriksa ketersediaan
 * - `available` : berkas ada dan dapat diunduh
 * - `missing`   : berkas tidak ditemukan / pemeriksaan gagal → pesan error jujur
 *
 * Catatan: SPA fallback (mis. Netlify `/* → /index.html`) juga membalas 200
 * dengan `text/html`. Pemeriksaan `Content-Type` memastikan respons tersebut
 * TIDAK dianggap sebagai berkas nyata.
 */
export function useRemoteFileStatus(url) {
  // Hasil disimpan bersama URL-nya agar hasil URL lama tidak bocor ke URL baru.
  const [checked, setChecked] = useState({ url: null, status: 'idle' })

  useEffect(() => {
    if (!url) return undefined

    let cancelled = false
    const controller = new AbortController()

    fetch(url, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        if (cancelled) return
        const type = response.headers.get('content-type') || ''
        const isRealFile = response.ok && !type.includes('text/html')
        setChecked({ url, status: isRealFile ? 'available' : 'missing' })
      })
      .catch((error) => {
        if (cancelled || error?.name === 'AbortError') return
        setChecked({ url, status: 'missing' })
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [url])

  if (!url) return 'idle'
  // Selama URL ini belum selesai diperiksa, tampilkan status "checking".
  return checked.url === url ? checked.status : 'checking'
}
