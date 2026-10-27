import { ArrowUpRight, Code2 } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { cn } from '../../utils/cn'
import Button from './Button'

/**
 * Card proyek: gambar (atau placeholder), nama, kategori, deskripsi,
 * chip teknologi, dan tombol detail.
 * Gambar null → placeholder konsisten tanpa layout shift (rasio 16:9 tetap).
 */
export default function ProjectCard({ project, categoryLabel, onOpen, className }) {
  const { t } = useLanguage()

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:border-accent-text/40 hover:shadow-xl hover:shadow-accent-600/10',
        className,
      )}
    >
      {/* Garis aksen muncul saat hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-0.5 scale-x-0 bg-linear-to-r from-accent-600 to-accent-400 transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Media: rasio tetap 16:9 agar tidak ada layout shift */}
      <div className="relative aspect-video w-full overflow-hidden bg-raised">
        {project.image ? (
          <img
            src={project.image}
            alt={t('projects.imageAlt', { name: project.name })}
            loading="lazy"
            width="640"
            height="360"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center transition-colors duration-300 group-hover:bg-accent-600/5"
            role="img"
            aria-label={t('projects.imageAlt', { name: project.name })}
          >
            <Code2
              size={40}
              className="text-fg-faint transition-colors duration-300 group-hover:text-accent-text/60"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-border-strong bg-raised px-2.5 py-1 font-mono text-xs tracking-wide text-accent-text uppercase">
            {categoryLabel}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-fg transition-colors duration-200 group-hover:text-accent-text">
          {project.name}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-fg-subtle">
          {t(project.description)}
        </p>

        {project.technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border-strong bg-raised px-2.5 py-1 font-mono text-xs text-fg-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
          >
            {t('projects.viewDetail')}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </article>
  )
}
