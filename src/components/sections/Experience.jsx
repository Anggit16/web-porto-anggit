import { Award, Briefcase, GraduationCap } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { education, experiences, certifications } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'

function TimelineItem({ icon: Icon, title, subtitle, period, isLast }) {
  return (
    <li className="relative flex gap-5 pb-8 last:pb-0">
      {/* Garis vertikal timeline */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute top-10 left-[19px] h-full w-px bg-gradient-to-b from-border-strong to-transparent"
        />
      )}

      {/* Ikon */}
      <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-gradient-to-br from-accent-600/20 to-accent-500/5 text-accent-text">
        <Icon size={17} aria-hidden="true" />
      </span>

      {/* Konten */}
      <div className="flex flex-col gap-1 pt-1">
        <h3 className="text-base font-semibold text-fg">{title}</h3>
        {subtitle && <p className="text-sm text-fg-subtle">{subtitle}</p>}
        {period && <p className="font-mono text-xs text-fg-subtle">{period}</p>}
      </div>
    </li>
  )
}

function EmptyState({ text }) {
  return (
    <div className="rounded-xl border border-dashed border-border-strong p-6">
      <p className="text-sm leading-relaxed text-fg-subtle">{text}</p>
    </div>
  )
}

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label={t('experience.label')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Pendidikan */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xs font-medium tracking-widest text-fg-subtle uppercase">
              <GraduationCap size={15} className="text-accent-text" aria-hidden="true" />
              {t('experience.educationTitle')}
            </h3>
            {education.length > 0 ? (
              <ul>
                {education.map((item, i) => (
                  <TimelineItem
                    key={item.id}
                    icon={GraduationCap}
                    title={item.degree}
                    subtitle={item.institution || t('experience.placeholderInstitution')}
                    period={item.period || t('experience.placeholderPeriod')}
                    isLast={i === education.length - 1}
                  />
                ))}
              </ul>
            ) : (
              <EmptyState text={t('experience.emptyEducation')} />
            )}
          </div>

          {/* Pengalaman kerja & magang */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xs font-medium tracking-widest text-fg-subtle uppercase">
              <Briefcase size={15} className="text-accent-text" aria-hidden="true" />
              {t('experience.experienceTitle')}
            </h3>
            {experiences.length > 0 ? (
              <ul>
                {experiences.map((item, i) => (
                  <TimelineItem
                    key={item.id}
                    icon={Briefcase}
                    title={item.role}
                    subtitle={item.organization}
                    period={item.period}
                    isLast={i === experiences.length - 1}
                  />
                ))}
              </ul>
            ) : (
              <EmptyState text={t('experience.emptyExperience')} />
            )}
          </div>

          {/* Sertifikasi & pelatihan */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xs font-medium tracking-widest text-fg-subtle uppercase">
              <Award size={15} className="text-accent-text" aria-hidden="true" />
              {t('experience.certificationTitle')}
            </h3>
            {certifications.length > 0 ? (
              <ul>
                {certifications.map((item, i) => (
                  <TimelineItem
                    key={item.id}
                    icon={Award}
                    title={item.name}
                    subtitle={item.issuer}
                    period={item.year}
                    isLast={i === certifications.length - 1}
                  />
                ))}
              </ul>
            ) : (
              <EmptyState text={t('experience.emptyCertification')} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
