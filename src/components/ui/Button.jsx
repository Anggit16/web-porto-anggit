import { cn } from '../../utils/cn'

/**
 * Tombol reusable dengan dua varian:
 * - primary: gradasi aksen, untuk CTA utama
 * - outline: border halus, untuk CTA sekunder
 *
 * Mendukung dua mode:
 * - internal: <button> dengan onClick (navigasi section, buka modal)
 * - external: <a> dengan href (tautan keluar, unduhan)
 */
export default function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
    'transition-all duration-200 select-none active:translate-y-px ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text'

  const variants = {
    primary:
      'bg-linear-to-r from-accent-600 to-accent-500 text-white ' +
      'shadow-sm shadow-accent-600/30 ' +
      'hover:shadow-lg hover:shadow-accent-600/30 hover:brightness-110',
    outline:
      'border border-border-strong bg-transparent text-fg ' +
      'hover:border-accent-text hover:bg-accent-600/5 hover:text-accent-text',
  }

  const sizes = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  // Mode external: <a> — wajib rel untuk keamanan tautan keluar
  if (as === 'a') {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
