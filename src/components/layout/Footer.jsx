import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { profile, socialLinks, contactInfo } from '../../data/site'
import { scrollToSection, scrollToTop } from '../../utils/scroll'
import SocialLinks from '../ui/SocialLinks'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { t } = useLanguage()

  const links = [
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'contact', label: t('nav.contact') },
  ]

  const handleNav = (id) => {
    scrollToSection(id)
  }

  return (
    <footer className="relative border-t border-border bg-surface">
      {/* Garis aksen gradasi di atas footer */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Identitas */}
          <div className="max-w-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-600 to-accent-500 font-mono text-xs font-bold text-white">
                {profile.monogram}
              </span>
              <span className="text-sm font-semibold text-fg">{profile.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-fg-subtle">
              {t('footer.builtWith')}
            </p>
          </div>

          {/* Navigasi footer */}
          <nav aria-label={t('a11y.footerNav')}>
            <h2 className="mb-3 font-mono text-xs font-medium tracking-widest text-fg-subtle uppercase">
              {t('footer.menu')}
            </h2>
            <ul className="flex flex-col gap-2">
              {links.map(({ id, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => handleNav(id)}
                    className="text-sm text-fg-subtle transition-colors duration-200 hover:text-accent-text"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sosial & back to top */}
          <div className="flex flex-col items-start gap-4">
            <SocialLinks links={{ ...socialLinks, email: contactInfo.email }} size="sm" />
            <button
              type="button"
              onClick={() => scrollToTop()}
              aria-label={t('a11y.backToTop')}
              className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-3 py-2 text-xs text-fg-subtle transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text hover:text-accent-text"
            >
              <ArrowUp size={14} aria-hidden="true" />
              {t('a11y.backToTop')}
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-fg-subtle">
            © {YEAR} {profile.name}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
