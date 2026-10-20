import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import ProjectCard, { type CardVariant } from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projectFilters, projects, type ProjectCategory } from '../data/portfolio'
import { ease } from '../lib/motion'

// Rhythm: one wide feature, then a pair of halves; wide features alternate sides.
function variantFor(i: number, n: number): CardVariant {
  const pos = i % 3
  if (pos === 0) return Math.floor(i / 3) % 2 ? 'wide-rev' : 'wide'
  if (pos === 1 && i === n - 1) return 'wide-rev'
  return 'half'
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [originSlug, setOriginSlug] = useState<string | null>(null)

  const list = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  )
  const counts = useMemo(
    () =>
      Object.fromEntries(
        projectFilters.map((f) => [f.id, f.id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(f.id as ProjectCategory)).length]),
      ),
    [],
  )

  const activeIndex = activeSlug ? list.findIndex((p) => p.slug === activeSlug) : -1
  const step = (dir: 1 | -1) => {
    if (activeIndex < 0) return
    setActiveSlug(list[(activeIndex + dir + list.length) % list.length].slug)
  }

  return (
    <section id="work" className="section-pad section-y">
      <SectionHeading index="03" eyebrow="Selected Work" title="Things I've shipped" />

      <LayoutGroup>
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {projectFilters
              .filter((f) => counts[f.id] > 0)
              .map((f) => {
                const on = filter === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(f.id)}
                    className={`press font-mono-tight relative rounded-full border px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${
                      on
                        ? 'border-transparent text-[var(--color-on-accent)]'
                        : 'border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-muted)] hover:text-[var(--color-ink)]'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="filter-pill"
                        transition={{ duration: 0.45, ease: ease.out }}
                        className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
                      />
                    )}
                    <span className="relative">
                      {f.label} <span className={on ? 'opacity-60' : 'opacity-50'}>{counts[f.id]}</span>
                    </span>
                  </button>
                )
              })}
          </div>
          <p className="font-mono-tight text-xs text-[var(--color-muted)]" aria-live="polite">
            Showing {list.length} of {projects.length}
          </p>
        </div>

        <motion.div layout className="grid gap-x-8 gap-y-12 md:grid-cols-12 md:gap-y-16">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                number={projects.indexOf(p) + 1}
                variant={variantFor(i, list.length)}
                onOpen={() => {
                  setOriginSlug(p.slug)
                  setActiveSlug(p.slug)
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <ProjectModal
          project={activeIndex >= 0 ? list[activeIndex] : null}
          number={activeIndex >= 0 ? projects.indexOf(list[activeIndex]) + 1 : 0}
          position={activeIndex + 1}
          total={list.length}
          shared={activeSlug === originSlug}
          onClose={() => setActiveSlug(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      </LayoutGroup>
    </section>
  )
}
