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
  'flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-accent-600/20 to-accent-500/5 text-accent-text'

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

        {/* grid-cols-1 = track minmax(0,1fr): teks nowrap di dalamnya tidak
            boleh memaksa lebar track melebihi viewport (lihat grid-cols-1). */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Kolom kiri: paragraf */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            {Array.isArray(paragraphs) &&
              paragraphs.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-fg-muted">
                  {paragraph}
                </p>
              ))}

            {/* Kartu CV — lembar dokumen dekoratif + aksi unduh nyata.
                Lembar di kiri murni visual (aria-hidden) supaya kartu tidak
                terasa kosong; teks & tombol tetap satu-satunya sumber info. */}
            <div className={cn('group mt-4', CARD)}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
                {/* Lembar CV dekoratif — warnanya mengikuti token tema */}
                <div
                  aria-hidden="true"
                  className="relative w-24 shrink-0 self-start rounded-lg border border-border bg-raised p-3 shadow-lg shadow-black/10 transition-transform duration-300 group-hover:-rotate-3"
                >
                  <span className="absolute right-1.5 top-1.5 rounded-sm bg-accent-600 px-1.5 py-0.5 font-mono text-[10px] font-bold leading-none text-white">
                    PDF
                  </span>
                  <span className="mb-2.5 block h-3 w-3 rounded-sm bg-accent-text/70" />
                  <span className="mb-1.5 block h-1.5 w-full rounded-full bg-fg-faint" />
                  <span className="mb-1.5 block h-1.5 w-4/5 rounded-full bg-fg-faint" />
                  <span className="mb-1.5 block h-1.5 w-full rounded-full bg-fg-faint" />
                  <span className="mb-1.5 mt-3 block h-1.5 w-full rounded-full bg-fg-faint" />
                  <span className="block h-1.5 w-3/5 rounded-full bg-fg-faint" />
                </div>

                {/* Informasi & aksi */}
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className={ICON_BADGE}>
                      <Download size={17} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-fg">
                        {t('about.cvTitle')}
                      </h3>
                      <p className="truncate text-xs text-fg-subtle">
                        {profile.name} · {profile.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Nama berkas diambil langsung dari data — bukan teks karangan */}
                  {cvFile && (
                    <p
                      className="truncate font-mono text-xs text-fg-muted"
                      title={cvFile.split('/').pop()}
                    >
                      {cvFile.split('/').pop()}
                    </p>
                  )}

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
