import { ArrowDown, ArrowRight, Code2, Mail } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { profile, socialLinks, contactInfo, techHighlights } from '../../data/site'
import { scrollToSection } from '../../utils/scroll'
import Button from '../ui/Button'
import LogoMark from '../ui/LogoMark'
import SocialLinks from '../ui/SocialLinks'

export default function Hero() {
  const { t } = useLanguage()

  const scrollTo = (id) => {
    scrollToSection(id)
  }

  return (
    <section
      id="home"
      className="viewport-fill relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Garis aksen halus di atas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-500/40 to-transparent"
      />

      {/* Orb dekoratif lokal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-24 h-72 w-72 rounded-full bg-accent-600/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-4 h-80 w-80 rounded-full bg-accent-500/20 blur-[110px]"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
        <div className="flex flex-col items-start gap-7">
          {/* Badge status ketersediaan */}
          <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 font-mono text-xs tracking-wide text-fg-muted backdrop-blur-sm"
            style={{ animationDelay: '40ms' }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t('hero.available')}
          </span>

          {/* Foto profil — fallback berupa mark identitas bila foto tidak ada */}
          <div
            className="animate-fade-up relative"
            style={{ animationDelay: '100ms' }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-2xl bg-linear-to-tr from-accent-600/40 via-accent-500/20 to-transparent blur-md"
            />
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={t('hero.photoAlt', { name: profile.name })}
                width="96"
                height="96"
                // Di atas layar → eager, tanpa menunggu lazy load.
                loading="eager"
                decoding="async"
                // Foto sumber potret (3:4) → potong condong ke atas agar kepala tetap utuh.
                className="relative h-20 w-20 rounded-2xl border border-border-strong object-cover object-top sm:h-24 sm:w-24"
              />
            ) : (
              <LogoMark size="hero" label={t('hero.logoAlt')} />
            )}
          </div>

          {/* Teks utama */}
          <div className="flex max-w-3xl flex-col gap-5">
            <p
              className="animate-fade-up font-mono text-sm tracking-widest text-accent-text uppercase"
              style={{ animationDelay: '160ms' }}
            >
              {t('hero.greeting')}
            </p>
            <h1
              className="animate-fade-up text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ animationDelay: '220ms' }}
            >
              <span className="text-gradient">{profile.name}</span>
            </h1>
            <p
              className="animate-fade-up flex items-center gap-3 text-xl font-medium text-fg-muted sm:text-2xl"
              style={{ animationDelay: '280ms' }}
            >
              <span className="h-px w-8 bg-accent-text" aria-hidden="true" />
              {t('hero.role')}
            </p>
            <p
              className="animate-fade-up max-w-2xl text-base leading-relaxed text-fg-subtle sm:text-lg"
              style={{ animationDelay: '340ms' }}
            >
              {t('hero.description')}
            </p>
          </div>

          {/* CTA */}
          <div
            className="animate-fade-up flex flex-wrap items-center gap-4"
            style={{ animationDelay: '400ms' }}
          >
            <Button size="lg" onClick={() => scrollTo('projects')}>
              {t('hero.ctaProjects')}
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo('contact')}>
              {t('hero.ctaContact')}
              <Mail size={17} aria-hidden="true" />
            </Button>
            <SocialLinks links={{ ...socialLinks, email: contactInfo.email }} />
          </div>

          {/* Ringkasan teknologi */}
          <div
            className="animate-fade-up mt-4 flex flex-col gap-3"
            style={{ animationDelay: '460ms' }}
          >
            <div className="flex items-center gap-2 text-fg-subtle">
              <Code2 size={15} aria-hidden="true" />
              <span className="font-mono text-xs tracking-wide uppercase">
                {t('hero.techTitle')}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {techHighlights.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border-strong bg-raised px-2.5 py-1 font-mono text-xs text-fg-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text/50 hover:text-fg"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Petunjuk scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center sm:flex"
      >
        <ArrowDown className="animate-scroll-hint text-fg-subtle" size={18} />
      </div>
    </section>
  )
}
