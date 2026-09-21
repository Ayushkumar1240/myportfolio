import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Project } from '../data/portfolio'

const GRADIENTS = [
  'radial-gradient(circle at 20% 20%, #ffb45433, transparent 55%), radial-gradient(circle at 80% 80%, #ff7a4533, transparent 55%)',
  'radial-gradient(circle at 80% 20%, #ff7a4540, transparent 55%), radial-gradient(circle at 20% 80%, #ffb4542b, transparent 55%)',
  'radial-gradient(circle at 50% 10%, #ffb45430, transparent 60%), radial-gradient(circle at 10% 90%, #ff7a4535, transparent 55%)',
  'radial-gradient(circle at 90% 90%, #ffb45438, transparent 55%), radial-gradient(circle at 10% 10%, #ff7a452e, transparent 55%)',
  'radial-gradient(circle at 30% 70%, #ff7a453a, transparent 55%), radial-gradient(circle at 70% 30%, #ffb4542e, transparent 55%)',
  'radial-gradient(circle at 60% 40%, #ffb45435, transparent 55%), radial-gradient(circle at 40% 60%, #ff7a4530, transparent 55%)',
]

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onOpen}
        data-cursor="link"
        data-cursor-text="VIEW"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-accent)]/50"
      >
        <div
          className="h-28 w-full shrink-0 border-b border-[var(--color-line)] transition-transform duration-500 group-hover:scale-105"
          style={{ background: GRADIENTS[index % GRADIENTS.length] }}
        />

        <div className="flex flex-1 flex-col p-7" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono-tight text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono-tight text-xs text-[var(--color-muted)]">{project.period}</span>
          </div>

          <h3 className="font-display mt-4 text-xl leading-tight text-[var(--color-accent)] sm:text-2xl">
            {project.name}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-lg text-[var(--color-accent)]">{m.value}</div>
                <div className="mt-0.5 text-[11px] leading-tight text-[var(--color-muted)]">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.stack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="font-mono-tight rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[10px] tracking-wide text-[var(--color-muted)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="font-mono-tight mt-6 flex items-center gap-2 text-xs tracking-[0.15em] text-[var(--color-ink)] uppercase">
            View case study
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
