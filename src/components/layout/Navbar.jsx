import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { profile } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollToSection } from '../../utils/scroll'
import { cn } from '../../utils/cn'
import ThemeToggle from '../ui/ThemeToggle'

const NAV_ITEMS = [
  { id: 'home', key: 'nav.home' },
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'contact', key: 'nav.contact' },
]

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  // Endonim bahasa (proper noun) — tidak diterjemahkan. Dipakai sebagai
  // nama aksesibel agar tombol "id"/"en" terbaca jelas oleh screen reader.
  const LANGUAGES = [
    { code: 'id', label: 'Bahasa Indonesia' },
    { code: 'en', label: 'English' },
  ]

  return (
    <div
      role="group"
      aria-label={t('a11y.language')}
      className="flex overflow-hidden rounded-lg border border-border-strong"
    >
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          aria-label={label}
          className={cn(
            'px-3.5 py-2.5 font-mono text-xs font-medium tracking-wide uppercase transition-colors duration-200',
            language === code
              ? 'bg-accent-600 text-white'
              : 'text-fg-subtle hover:text-fg',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const { t } = useLanguage()
  const activeSection = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  // Deteksi scroll: bayangan halus + indikator progres membaca halaman
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Tutup menu mobile dengan tombol Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const handleNavClick = (id) => {
    setMenuOpen(false)
    // scroll-padding-top di CSS menangani offset navbar.
    scrollToSection(id)
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300',
        scrolled || menuOpen
          ? 'border-border bg-page/80 shadow-lg shadow-black/5 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label={t('a11y.mainNav')}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        {/* Logo / monogram */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — ${t('nav.home')}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-600 to-accent-500 font-mono text-sm font-bold text-white shadow-sm shadow-accent-600/30 transition-transform duration-200 group-hover:scale-105">
            {profile.monogram}
          </span>
          <span className="hidden text-sm font-semibold text-fg sm:block">
            {profile.name}
          </span>
        </button>

        {/* Navigasi desktop — muncul di lg agar tidak berdesakan di tablet */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map(({ id, key }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => handleNavClick(id)}
                aria-current={activeSection === id ? 'true' : undefined}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-sm transition-colors duration-200',
                  activeSection === id
                    ? 'text-accent-text'
                    : 'text-fg-subtle hover:text-fg',
                )}
              >
                {t(key)}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-3 -bottom-[9px] h-0.5 rounded-full bg-gradient-to-r from-accent-600 to-accent-400 transition-all duration-300',
                    activeSection === id ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageToggle />

          {/* Tombol hamburger mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong text-fg-muted transition-colors duration-200 hover:border-accent-text hover:text-accent-text lg:hidden"
          >
            {menuOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Menu mobile — selalu ada di DOM agar aria-controls selalu valid;
          disembunyikan (hidden) saat tertutup. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-border bg-page/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
          {NAV_ITEMS.map(({ id, key }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => handleNavClick(id)}
                aria-current={activeSection === id ? 'true' : undefined}
                className={cn(
                  'w-full rounded-lg px-4 py-3 text-left text-sm transition-colors duration-200',
                  activeSection === id
                    ? 'bg-accent-600/10 text-accent-text'
                    : 'text-fg-muted hover:bg-raised hover:text-fg',
                )}
              >
                {t(key)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Indikator progres baca halaman */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-600 to-accent-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </header>
  )
}
