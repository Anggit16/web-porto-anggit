import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { cn } from '../../utils/cn'
import { isValidEmail, isValidHttpUrl, toMailto } from '../../utils/url'

/**
 * Deret ikon sosial untuk kanal kontak yang tersedia.
 * Kanal bernilai null — ATAU nilai yang tidak valid — TIDAK dirender,
 * sehingga tidak ada tautan dummy yang tampak nyata.
 */
const CHANNELS = [
  { key: 'github', Icon: GithubIcon, label: 'GitHub' },
  { key: 'linkedin', Icon: LinkedinIcon, label: 'LinkedIn' },
  { key: 'email', Icon: Mail, label: 'Email' },
]

export default function SocialLinks({ links, size = 'md', className }) {
  const dimension = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10'
  const iconSize = size === 'sm' ? 17 : 19

  const entries = CHANNELS.filter(({ key }) =>
    key === 'email' ? isValidEmail(links[key]) : isValidHttpUrl(links[key]),
  )
  if (entries.length === 0) return null

  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {entries.map(({ key, Icon, label }) => (
        <li key={key}>
          <a
            href={key === 'email' ? toMailto(links[key]) : links[key].trim()}
            target={key === 'email' ? undefined : '_blank'}
            rel={key === 'email' ? undefined : 'noopener noreferrer'}
            aria-label={label}
            className={cn(
              dimension,
              'flex items-center justify-center rounded-lg',
              'border border-border-strong text-fg-subtle',
              'transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text hover:text-accent-text',
            )}
          >
            <Icon size={iconSize} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
