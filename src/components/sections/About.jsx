import { Download, GraduationCap, Heart } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { profile, cvFile } from '../../data/site'
import { useRemoteFileStatus } from '../../hooks/useRemoteFileStatus'
import { cn } from '../../utils/cn'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'

/** Kelas kartu seragam (hover halus) untuk seluruh panel di section ini. */
const CARD =
  'rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent-text/40 hover:shadow-lg hover:shadow-accent-600/5'

const ICON_BADGE =
  'flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-600/20 to-accent-500/5 text-accent-text'

export default function About() {
  const { t } = useLanguage()
  const paragraphs = t('about.paragraphs')
  const interests = t('about.interests')
  const cvStatus = useRemoteFileStatus(cvFile)

  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          align="left"
          label={t('about.label')}
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Kolom kiri: paragraf */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            {Array.isArray(paragraphs) &&
              paragraphs.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-fg-muted">
                  {paragraph}
                </p>
              ))}

            {/* CV download */}
            <div className={cn('mt-4', CARD)}>
              <div className="mb-4 flex items-center gap-3">
                <div className={ICON_BADGE}>
                  <Download size={17} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-fg">
                  {t('about.cvTitle')}
                </h3>
              </div>
              {cvStatus === 'available' ? (
                <Button as="a" href={cvFile} download variant="primary">
                  <Download size={16} aria-hidden="true" />
                  {t('about.cvButton')}
                </Button>
              ) : (
                <p
                  role="status"
                  className={cn(
                    'text-sm leading-relaxed',
                    cvStatus === 'missing'
                      ? 'rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-warning'
                      : 'text-fg-subtle',
                  )}
                >
                  {cvStatus === 'checking'
                    ? t('about.cvChecking')
                    : cvStatus === 'missing'
                      ? t('about.cvError')
                      : t('about.cvUnavailable')}
                </p>
              )}
            </div>
          </div>

          {/* Kolom kanan: fakta singkat */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {/* Pendidikan */}
            <div className={CARD}>
              <div className="mb-4 flex items-center gap-3">
                <div className={ICON_BADGE}>
                  <GraduationCap size={17} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-fg">
                  {t('experience.educationTitle')}
                </h3>
              </div>
              <p className="text-sm font-medium text-fg">{profile.education.degree}</p>
              <p className="mt-1 text-xs text-fg-subtle">
                {profile.education.institution || t('experience.placeholderInstitution')}
              </p>
            </div>

            {/* Minat */}
            <div className={CARD}>
              <div className="mb-4 flex items-center gap-3">
                <div className={ICON_BADGE}>
                  <Heart size={17} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-fg">
                  {t('about.interestsTitle')}
                </h3>
              </div>
              <ul className="flex flex-col gap-2">
                {Array.isArray(interests) &&
                  interests.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-fg-muted"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-text"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
