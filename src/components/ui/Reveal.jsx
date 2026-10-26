import { useEffect, useRef, useState } from 'react'
import { cn } from '../../utils/cn'

/**
 * Pembungkus animasi "muncul saat masuk viewport".
 * - Hanya berjalan sekali per elemen (observer di-disconnect setelah terlihat).
 * - Bila IntersectionObserver tidak tersedia, konten langsung ditampilkan.
 * - Keadaan akhir tetap terlihat penuh; animasi dinonaktifkan oleh
 *   prefers-reduced-motion (lihat index.css).
 */
export default function Reveal({ as: Tag = 'div', className, children, ...props }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
