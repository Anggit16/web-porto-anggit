import { cn } from '../../utils/cn'

/**
 * Heading section konsisten: label kecil beraksen (dengan garis) + judul + subtitle.
 * Menghasilkan elemen <h2> agar hierarki heading tetap benar.
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  className,
  align = 'center',
}) {
  const isLeft = align === 'left'
  const alignment = isLeft ? 'text-left items-start' : 'text-center items-center'

  return (
    <div className={cn('mb-12 flex flex-col gap-4 md:mb-16', alignment, className)}>
      {/* flex-wrap: label panjang di layar 320px tidak memaksa overflow */}
      <span className="flex flex-wrap items-center gap-3">
        <span
          aria-hidden="true"
          className="h-px w-8 bg-linear-to-r from-transparent to-accent-text/70"
        />
        <span className="font-mono text-xs font-medium tracking-widest text-accent-text uppercase">
          {label}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'h-px w-8 bg-linear-to-l from-transparent to-accent-text/70',
            !isLeft && 'block',
          )}
        />
      </span>
      <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base leading-relaxed text-fg-subtle">
          {subtitle}
        </p>
      )}
    </div>
  )
}
