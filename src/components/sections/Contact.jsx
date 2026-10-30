import { ExternalLink, Mail, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { useLanguage } from '../../i18n/LanguageContext'
import { contactInfo, socialLinks } from '../../data/site'
import { isValidHttpUrl, toMailto } from '../../utils/url'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'

// Nilai yang tidak valid (null / malformed) → href null → tampil "belum tersedia".
const EMAIL_HREF = toMailto(contactInfo.email)

const CHANNEL_META = [
  {
    key: 'email',
    icon: Mail,
    value: contactInfo.email,
    href: EMAIL_HREF,
  },
  {
    key: 'github',
    icon: GithubIcon,
    value: socialLinks.github,
    href: isValidHttpUrl(socialLinks.github) ? socialLinks.github.trim() : null,
    external: true,
  },
  {
    key: 'linkedin',
    icon: LinkedinIcon,
    value: socialLinks.linkedin,
    href: isValidHttpUrl(socialLinks.linkedin) ? socialLinks.linkedin.trim() : null,
    external: true,
  },
]

const ICON_BADGE =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-accent-600/20 to-accent-500/5 text-accent-text'

export default function Contact() {
  const { t } = useLanguage()

  // Subjek email dipakai bersama oleh kedua aksi (mailto & Gmail).
  const emailSubject = encodeURIComponent(t('contact.mailSubject'))
  // Alternatif untuk pengunjung yang memakai Gmail di browser (tanpa klien email).
  const gmailComposeHref = EMAIL_HREF
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactInfo.email.trim())}&su=${emailSubject}`
    : null

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label={t('contact.label')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* CTA kolaborasi */}
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <div className={ICON_BADGE}>
                <Send size={18} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-fg">
                {t('contact.ctaTitle')}
              </h3>
            </div>
            <p className="leading-relaxed text-fg-muted">{t('contact.ctaText')}</p>

            {/* Aksi langsung ke email — hanya dirender bila alamat di site.js valid */}
            {EMAIL_HREF && (
              <div className="flex flex-wrap gap-3">
                <Button as="a" href={`${EMAIL_HREF}?subject=${emailSubject}`}>
                  <Mail size={16} aria-hidden="true" />
                  {t('contact.ctaButton')}
                </Button>
                <Button
                  as="a"
                  variant="outline"
                  href={gmailComposeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  {t('contact.gmailButton')}
                </Button>
              </div>
            )}
          </div>

          {/* Kanal kontak */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs font-medium tracking-widest text-fg-subtle uppercase">
              {t('contact.channelsTitle')}
            </h3>

            {CHANNEL_META.map(({ key, icon: Icon, value, href, external }) => (
              <div
                key={key}
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-text/40 hover:shadow-lg hover:shadow-accent-600/5"
              >
                <div className={ICON_BADGE}>
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="font-mono text-xs tracking-wide text-fg-subtle uppercase">
                    {t(`contact.channels.${key}`)}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="truncate text-sm font-medium text-fg transition-colors duration-200 group-hover:text-accent-text hover:text-accent-text"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-fg-subtle italic">
                      {t('contact.unavailable')}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Catatan setup hanya tampil bila masih ada kanal yang belum diisi.
                Bila semua kanal sudah terisi, catatan ini justru menyesatkan. */}
            {CHANNEL_META.some((channel) => !channel.href) && (
              <p className="text-xs leading-relaxed text-fg-subtle">
                {t('contact.setupNote')}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
