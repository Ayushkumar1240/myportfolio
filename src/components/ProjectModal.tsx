import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../data/portfolio'
import { ProjectVisual } from './ProjectCard'
import { DiagramLegend } from './ArchDiagram'
import { lenisRef } from '../hooks/useLenis'
import { ease } from '../lib/motion'

export default function ProjectModal({
  project,
  number,
  position,
  total,
  shared,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project | null
  number: number
  position: number
  total: number
  shared: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const open = !!project
  const closeRef = useRef<HTMLButtonElement>(null)
  const handlers = useRef({ onClose, onPrev, onNext })
  useEffect(() => {
    handlers.current = { onClose, onPrev, onNext }
  })

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    lenisRef.current?.stop()
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handlers.current.onClose()
      if (e.key === 'ArrowRight') handlers.current.onNext()
      if (e.key === 'ArrowLeft') handlers.current.onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      lenisRef.current?.start()
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div onClick={onClose} className="absolute inset-0 bg-[var(--color-bg)]/90 backdrop-blur-sm" />

          <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-[var(--color-line)] bg-[var(--color-bg)] sm:max-h-[90vh] sm:rounded-3xl">
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-line)] px-5 py-3 sm:px-8">
              <span className="font-mono-tight text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
                Case study {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button
                ref={closeRef}
                onClick={onClose}
                data-cursor-text="CLOSE"
                className="press font-mono-tight rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs tracking-widest text-[var(--color-ink)] uppercase transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Esc ✕
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
              <div className="p-4 sm:p-8">
                <ProjectVisual
                  key={project.slug}
                  project={project}
                  number={number}
                  animated
                  interactive
                  layoutId={shared ? `visual-${project.slug}` : undefined}
                  className="aspect-[4/3] sm:aspect-[16/8]"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <DiagramLegend />
                  <span className="font-mono-tight hidden text-[10px] tracking-wide text-[var(--color-muted)] uppercase sm:inline">
                    Hover or tap a node to trace its connections
                  </span>
                </div>
              </div>

              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: ease.out }}
                className="grid gap-10 px-5 pb-10 sm:px-8 lg:grid-cols-12"
              >
                <div className="lg:col-span-7">
                  <div className="font-mono-tight text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
                    {project.period}
                  </div>
                  <h3
                    id="project-modal-title"
                    className="font-display mt-2 text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] text-[var(--color-ink)]"
                  >
                    {project.name}
                  </h3>
                  <p className="font-display mt-5 text-lg leading-snug text-[var(--color-accent)] italic sm:text-xl">
                    {project.hook}
                  </p>
                  <p className="mt-4 text-[var(--color-muted)]">{project.description}</p>

                  <h4 className="font-mono-tight mt-10 text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">
                    What I built
                  </h4>
                  <ol className="mt-4 grid gap-4">
                    {project.points.map((p, i) => (
                      <li key={i} className="flex gap-4 text-sm leading-relaxed text-[var(--color-ink)]/85">
                        <span className="font-mono-tight mt-0.5 text-xs text-[var(--color-muted)]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {p}
                      </li>
                    ))}
                  </ol>
                </div>

                <aside className="flex flex-col gap-8 lg:col-span-5">
                  <div className="rounded-2xl border border-[var(--color-line)] p-5">
                    <div className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">Role</div>
                    <p className="mt-2 text-sm text-[var(--color-ink)]/85">{project.role}</p>
                    <div className="font-mono-tight mt-5 text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">
                      Key challenge
                    </div>
                    <p className="mt-2 text-sm text-[var(--color-ink)]/85">{project.challenge}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="border-l border-[var(--color-accent)] pl-4">
                        <div className="font-display text-2xl text-[var(--color-ink)]">{m.value}</div>
                        <div className="mt-1 text-[11px] leading-tight text-[var(--color-muted)]">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">Stack</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="font-mono-tight rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[10px] tracking-wide text-[var(--color-muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>
              </motion.div>
            </div>

            <div className="flex shrink-0 items-center justify-between border-t border-[var(--color-line)] px-5 py-4 sm:px-8">
              <button
                onClick={onPrev}
                className="press font-mono-tight flex items-center gap-2 text-xs tracking-[0.15em] text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-ink)]"
              >
                ← Prev
              </button>
              <span className="font-mono-tight hidden text-[10px] tracking-wide text-[var(--color-muted)] uppercase sm:inline">
                ← → to browse
              </span>
              <button
                onClick={onNext}
                className="press font-mono-tight flex items-center gap-2 text-xs tracking-[0.15em] text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-ink)]"
              >
                Next →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
