import { Code2 } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Mark identitas abstrak (bukan inisial) untuk navbar, footer, dan fallback
 * Hero bila foto profil tidak ada.
 *
 * Kontras dengan monogram "AH" sebelumnya: mark ini berbentuk glyph kode pada
 * latar gradien yang bergerak halus (`animate-gradient-pan`), sehingga terasa
 * sebagai identitas logo, bukan huruf inisial.
 *
 * Aksesibilitas:
 * - `label` diisi HANYA bila mark menjadi satu-satunya representasi visual
 *   (fallback Hero) → elemen menjadi `role="img"` bernama.
 * - Selain itu mark bersifat dekoratif (`aria-hidden`), nama aksesibel tetap
 *   ditanggung elemen induk (mis. tombol logo di navbar).
 */
const VARIANTS = {
  sm: { box: 'h-8 w-8 rounded-lg', icon: 15 },
  md: { box: 'h-9 w-9 rounded-xl', icon: 18 },
  hero: {
    box: 'h-20 w-20 rounded-2xl border border-border-strong sm:h-24 sm:w-24',
    icon: 38,
  },
}

export default function LogoMark({ size = 'md', label, className }) {
  const { box, icon } = VARIANTS[size] ?? VARIANTS.md

  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
      className={cn(
        'flex shrink-0 items-center justify-center text-white',
        'bg-linear-to-br from-accent-600 via-accent-500 to-accent-400',
        'animate-gradient-pan shadow-sm shadow-accent-600/40 ring-1 ring-white/15',
        'transition-transform duration-300 group-hover:scale-110',
        box,
        className,
      )}
    >
      <Code2 size={icon} strokeWidth={2.4} aria-hidden="true" />
    </span>
  )
}
