import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { Project } from '../data/portfolio'
import ArchDiagram from './ArchDiagram'
import { ease } from '../lib/motion'

export type CardVariant = 'wide' | 'wide-rev' | 'half'

export function ProjectVisual({
  project,
  number,
  animated,
  interactive = false,
  className = '',
  layoutId,
}: {
  project: Project
  number: number
  animated: boolean
  interactive?: boolean
  className?: string
  layoutId?: string
}) {
  return (
    <motion.div
      layoutId={layoutId}
      transition={{ duration: 0.6, ease: ease.out }}
      className={`bg-grid relative overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] ${className}`}
    >
      <div className="font-mono-tight pointer-events-none absolute top-3 left-4 z-10 text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
        fig.{String(number).padStart(2, '0')} — system sketch
      </div>
      <div className="font-mono-tight pointer-events-none absolute right-4 bottom-3 z-10 flex gap-2 text-[10px] tracking-[0.15em] text-[var(--color-muted)] uppercase">
        {project.categories.map((c) => (
          <span key={c}>#{c}</span>
        ))}
      </div>
      <ArchDiagram
        diagram={project.diagram}
        animated={animated}
        interactive={interactive}
        title={project.name}
        className="absolute inset-0 h-full w-full px-2 pt-7 pb-6 sm:p-6 sm:pt-9 sm:pb-8"
      />
    </motion.div>
  )
}

export default function ProjectCard({
  project,
  number,
  variant,
  onOpen,
}: {
  project: Project
  number: number
  variant: CardVariant
  onOpen: () => void
}) {
  const ref = useRef<HTMLElement>(null)
  const [hover, setHover] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 120, damping: 18 })
  const y = useSpring(my, { stiffness: 120, damping: 18 })

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 10)
  }
  const onLeave = () => {
    setHover(false)
    mx.set(0)
    my.set(0)
  }

  const wide = variant !== 'half'

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, ease: ease.out }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onOpen}
      data-cursor="link"
      data-cursor-text="OPEN"
      className={`group cursor-pointer ${
        wide ? 'grid items-center gap-6 md:col-span-12 md:grid-cols-12 md:gap-10' : 'flex flex-col gap-6 md:col-span-6'
      }`}
    >
      <motion.div
        style={{ x, y }}
        className={`${wide ? 'md:col-span-7' : ''} ${variant === 'wide-rev' ? 'md:order-2' : ''}`}
      >
        <div className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02]">
          <ProjectVisual
            project={project}
            number={number}
            animated={hover}
            layoutId={`visual-${project.slug}`}
            className={`${wide ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/3] sm:aspect-[16/11]'} transition-colors duration-500 group-hover:border-[var(--color-accent)]/50`}
          />
        </div>
      </motion.div>

      <div className={wide ? 'md:col-span-5' : ''}>
        <div className="font-mono-tight flex items-center justify-between text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          <span>{String(number).padStart(2, '0')}</span>
          <span>{project.period}</span>
        </div>

        <h3
          className={`font-display mt-3 leading-[1.05] text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-accent)] ${
            wide ? 'text-[clamp(1.7rem,3.2vw,2.75rem)]' : 'text-[clamp(1.4rem,2.2vw,1.9rem)]'
          }`}
        >
          {project.name}
        </h3>

        <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-ink)]/80 italic sm:text-base">{project.hook}</p>

        {wide && (
          <dl className="mt-6 grid gap-4 border-t border-[var(--color-line)] pt-5 text-sm">
            <div>
              <dt className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">Role</dt>
              <dd className="mt-1 text-[var(--color-muted)]">{project.role}</dd>
            </div>
            <div>
              <dt className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">Key challenge</dt>
              <dd className="mt-1 text-[var(--color-muted)]">{project.challenge}</dd>
            </div>
          </dl>
        )}

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-display text-xl text-[var(--color-accent)]">{m.value}</div>
              <div className="text-[11px] text-[var(--color-muted)]">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, wide ? 6 : 4).map((t) => (
            <span
              key={t}
              className="font-mono-tight rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[10px] tracking-wide text-[var(--color-muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpen()
          }}
          className="link-underline font-mono-tight mt-6 inline-flex items-center gap-2 text-xs tracking-[0.15em] text-[var(--color-ink)] uppercase"
        >
          Read case study
          <span aria-hidden className="arrow-slide">
            <span>→</span>
            <span>→</span>
          </span>
        </button>
      </div>
    </motion.article>
  )
}
