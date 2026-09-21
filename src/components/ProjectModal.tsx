import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../data/portfolio'

const GRADIENTS = [
  'radial-gradient(circle at 20% 20%, #ffb45433, transparent 55%), radial-gradient(circle at 80% 80%, #ff7a4533, transparent 55%)',
  'radial-gradient(circle at 80% 20%, #ff7a4540, transparent 55%), radial-gradient(circle at 20% 80%, #ffb4542b, transparent 55%)',
  'radial-gradient(circle at 50% 10%, #ffb45430, transparent 60%), radial-gradient(circle at 10% 90%, #ff7a4535, transparent 55%)',
  'radial-gradient(circle at 90% 90%, #ffb45438, transparent 55%), radial-gradient(circle at 10% 10%, #ff7a452e, transparent 55%)',
  'radial-gradient(circle at 30% 70%, #ff7a453a, transparent 55%), radial-gradient(circle at 70% 30%, #ffb4542e, transparent 55%)',
  'radial-gradient(circle at 60% 40%, #ffb45435, transparent 55%), radial-gradient(circle at 40% 60%, #ff7a4530, transparent 55%)',
]

export default function ProjectModal({
  project,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project | null
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-[#08090a]/90 backdrop-blur-sm"
          />

          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)]"
          >
            <div
              className="relative flex shrink-0 flex-col justify-between gap-6 p-8 sm:p-10"
              style={{ background: GRADIENTS[index % GRADIENTS.length] }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono-tight text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  onClick={onClose}
                  data-cursor="link"
                  data-cursor-text="CLOSE"
                  className="font-mono-tight rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs tracking-widest text-[var(--color-ink)] uppercase transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  Esc ✕
                </button>
              </div>
              <div>
                <div className="font-mono-tight mb-2 text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
                  {project.period}
                </div>
                <h3 className="font-display text-[clamp(1.6rem,4vw,2.75rem)] leading-tight text-[var(--color-accent)]">
                  {project.name}
                </h3>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-8 sm:p-10">
              <p className="max-w-2xl text-[var(--color-muted)]">{project.description}</p>

              <div className="mt-6 grid grid-cols-3 gap-4 border-y border-[var(--color-line)] py-6 sm:max-w-md">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-xl text-[var(--color-accent)]">{m.value}</div>
                    <div className="mt-1 text-[11px] leading-tight text-[var(--color-muted)]">{m.label}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-6 grid gap-3">
                {project.points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
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

            <div className="flex shrink-0 items-center justify-between border-t border-[var(--color-line)] px-8 py-4 sm:px-10">
              <button
                onClick={onPrev}
                data-cursor="link"
                className="font-mono-tight flex items-center gap-2 text-xs tracking-[0.15em] text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-ink)]"
              >
                ← Prev
              </button>
              <button
                onClick={onNext}
                data-cursor="link"
                className="font-mono-tight flex items-center gap-2 text-xs tracking-[0.15em] text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-ink)]"
              >
                Next →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
