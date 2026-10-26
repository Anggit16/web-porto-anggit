import { useEffect, useState } from 'react'

/**
 * Lacak section yang sedang aktif di viewport untuk indikator navigasi.
 * Menggunakan IntersectionObserver; section di atas 40% viewport dianggap aktif.
 */
const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'experience', 'contact']

export function useActiveSection() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observers = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id)
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return active
}
