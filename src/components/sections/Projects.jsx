import { ExternalLink, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { GithubIcon } from '../ui/BrandIcons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { projects, projectCategories } from '../../data/projects'
import { cn } from '../../utils/cn'
import { isValidHttpUrl } from '../../utils/url'
import Button from '../ui/Button'
import ProjectCard from '../ui/ProjectCard'
import SectionHeading from '../ui/SectionHeading'

/** Modal detail proyek — Escape menutup, fokus dikembalikan ke pemicu. */
function ProjectModal({ project, onClose }) {
  const { t } = useLanguage()
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      // Focus trap sederhana: kunci Tab di dalam panel modal
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  // Kunci scroll body saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Klik backdrop menutup modal
  const onBackdrop = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) onClose()
  }

  const detailRows = [
    { key: 'challenge', value: project.details.challenge },
    { key: 'solution', value: project.details.solution },
    { key: 'role', value: project.details.role },
    { key: 'result', value: project.details.result },
  ]

  // Hanya tampilkan tombol tautan bila URL benar-benar valid.
  const githubHref = isValidHttpUrl(project.github) ? project.github.trim() : null
  const demoHref = isValidHttpUrl(project.demo) ? project.demo.trim() : null

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onBackdrop}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border-strong bg-surface shadow-2xl shadow-black/30"
      >
        {/* Header modal */}
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div>
            <span className="font-mono text-xs tracking-wide text-accent-text uppercase">
              {t('projects.modal.title')}
            </span>
            <h3 id="project-modal-title" className="mt-1 text-xl font-bold text-fg">
              {project.name}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('projects.modal.close')}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-strong text-fg-subtle transition-colors duration-200 hover:border-accent-text hover:text-accent-text"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        {/* Konten modal — scrollable */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-col gap-6">
            {/* Deskripsi */}
            <div>
              <h4 className="mb-2 font-mono text-xs font-medium tracking-widest text-fg-subtle uppercase">
                {t('projects.modal.description')}
              </h4>
              <p className="text-sm leading-relaxed text-fg-muted">
                {t(project.description)}
              </p>
            </div>

            {/* Detail (challenge/solution/role/result) */}
            {detailRows.map(({ key, value }) => (
              <div key={key}>
                <h4 className="mb-2 font-mono text-xs font-medium tracking-widest text-fg-subtle uppercase">
                  {t(`projects.modal.${key}`)}
                </h4>
                <p className="text-sm leading-relaxed text-fg-muted">
                  {value || <em className="text-fg-subtle">{t('projects.modal.placeholder')}</em>}
                </p>
              </div>
            ))}

            {/* Teknologi */}
            <div>
              <h4 className="mb-2 font-mono text-xs font-medium tracking-widest text-fg-subtle uppercase">
                {t('projects.modal.technologies')}
              </h4>
              {project.technologies.length > 0 ? (
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
              ) : (
                <p className="text-sm text-fg-subtle">
                  <em>{t('projects.modal.placeholder')}</em>
                </p>
              )}
            </div>

            {/* Tautan */}
            <div>
              <h4 className="mb-2 font-mono text-xs font-medium tracking-widest text-fg-subtle uppercase">
                {t('projects.modal.links')}
              </h4>
              {githubHref || demoHref ? (
                <div className="flex flex-wrap gap-3">
                  {githubHref && (
                    <Button as="a" href={githubHref} target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
                      <GithubIcon size={15} aria-hidden="true" />
                      {t('projects.modal.github')}
                    </Button>
                  )}
                  {demoHref && (
                    <Button as="a" href={demoHref} target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
                      <ExternalLink size={15} aria-hidden="true" />
                      {t('projects.modal.liveDemo')}
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-sm text-fg-subtle">
                  <em>{t('projects.modal.noLinks')}</em>
                </p>
              )}
            </div>

            {/* Catatan placeholder */}
            <p className="rounded-lg border border-border bg-raised p-4 text-sm leading-relaxed text-fg-subtle">
              {t('projects.modal.statusPlaceholder')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const lastTriggerRef = useRef(null)

  const filters = ['all', ...projectCategories]

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const openModal = useCallback((project) => {
    lastTriggerRef.current = document.activeElement
    setSelectedProject(project)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedProject(null)
    // Kembalikan fokus ke tombol pemicu
    lastTriggerRef.current?.focus?.()
  }, [])

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label={t('projects.label')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Filter kategori */}
        <div
          role="group"
          aria-label={t('projects.filterLabel')}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {filters.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                activeFilter === cat
                  ? 'bg-linear-to-r from-accent-600 to-accent-500 text-white shadow-sm shadow-accent-600/30'
                  : 'border border-border-strong text-fg-subtle hover:border-accent-text hover:bg-accent-600/5 hover:text-accent-text',
              )}
            >
              {t(`projects.filters.${cat}`)}
            </button>
          ))}
        </div>

        {/* Grid proyek / empty state */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                categoryLabel={t(`projects.filters.${project.category}`)}
                onOpen={openModal}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 rounded-xl border border-dashed border-border-strong py-16 text-center">
            <p className="max-w-md px-4 text-sm text-fg-subtle">{t('projects.empty')}</p>
            <Button variant="outline" size="sm" onClick={() => setActiveFilter('all')}>
              {t('projects.showAll')}
            </Button>
          </div>
        )}
      </div>

      {/* Modal detail — di-portal ke <body> agar tidak terpengaruh
          transform/stacking context dari animasi Reveal di sekitarnya. */}
      {selectedProject &&
        createPortal(
          <ProjectModal project={selectedProject} onClose={closeModal} />,
          document.body,
        )}
    </section>
  )
}
