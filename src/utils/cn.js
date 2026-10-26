/**
 * Gabungkan string class Tailwind dengan aman.
 * Contoh: cn('btn', isActive && 'active', 'px-4')
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
