import { Braces, Server, Smartphone, Terminal, Layout } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { skillGroups } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'

const GROUP_ICONS = {
  languages: Braces,
  frontend: Layout,
  backend: Server,
  mobile: Smartphone,
  tools: Terminal,
}

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label={t('skills.label')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = GROUP_ICONS[group.id] || Terminal
            const hasItems = group.items.length > 0

            return (
              <div
                key={group.id}
                className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-text/40 hover:shadow-xl hover:shadow-accent-600/10"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-accent-600/20 to-accent-500/5 text-accent-text transition-transform duration-300 group-hover:scale-110">
                    <Icon size={17} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-fg">
                    {t(`skills.groups.${group.id}`)}
                  </h3>
                </div>

                {hasItems ? (
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-border-strong bg-raised px-2.5 py-1 font-mono text-xs text-fg-muted transition-colors duration-200 hover:border-accent-text/50 hover:text-fg"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-fg-subtle">
                    {t('skills.toolsNote')}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
