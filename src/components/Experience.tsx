import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { achievements, education, experience } from '../data/portfolio'
import { ease, reveal } from '../lib/motion'

const VISIBLE = 3

function Marker({ filled }: { filled?: boolean }) {
  return (
    <span
      className={`absolute top-1.5 left-[-5px] h-[11px] w-[11px] rounded-full border-2 border-[var(--color-accent)] sm:left-[calc(25%-5.5px)] ${
        filled ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-bg)]'
      }`}
    />
  )
}

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [expanded, setExpanded] = useState(false)
  const job = experience[0]
  const shown = expanded ? job.points : job.points.slice(0, VISIBLE)

  return (
    <section id="experience" className="section-pad section-y">
      <SectionHeading index="02" eyebrow="Experience" title="Where the work happens" />

      <div ref={trackRef} className="relative">
        <div className="absolute top-0 bottom-0 left-0 w-px bg-[var(--color-line)] sm:left-1/4" />
        <motion.div
          style={{ scaleY: progress }}
          className="absolute top-0 bottom-0 left-0 w-px origin-top bg-[var(--color-accent)] sm:left-1/4"
        />

        {/* Education */}
        <motion.div {...reveal} className="relative grid gap-2 pb-10 pl-8 sm:grid-cols-4 sm:gap-10 sm:pl-0 sm:pb-12">
          <div className="font-mono-tight text-xs tracking-[0.15em] text-[var(--color-muted)] uppercase sm:pr-10 sm:text-right">
            {education.period}
          </div>
          <Marker />
          <div className="sm:col-span-3 sm:pl-6">
            <div className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">Education</div>
            <div className="font-display mt-1 text-xl text-[var(--color-ink)]">{education.school}</div>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {education.degree} · {education.detail}
            </p>
          </div>
        </motion.div>

        {/* Role */}
        <motion.div {...reveal} className="relative grid gap-2 pl-8 sm:grid-cols-4 sm:gap-10 sm:pl-0">
          <div className="sm:pr-10 sm:text-right">
            <div className="font-mono-tight text-xs tracking-[0.15em] text-[var(--color-muted)] uppercase">{job.period}</div>
            <div className="mt-1 text-xs text-[var(--color-muted)]">{job.location}</div>
          </div>
          <Marker filled />
          <div className="sm:col-span-3 sm:pl-6">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--color-ink)]">{job.company}</h3>
              <span className="text-[var(--color-accent)]">{job.role}</span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink)]/80 italic sm:text-base">{job.lede}</p>

            <div className="mt-5 inline-flex max-w-full items-start gap-3 rounded-xl border border-[var(--color-accent)]/40 bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] px-4 py-3">
              <span aria-hidden className="mt-0.5 text-[var(--color-accent)]">★</span>
              <span>
                <span className="block text-sm text-[var(--color-ink)]">{achievements[0].title}</span>
                <span className="block text-xs text-[var(--color-muted)]">{achievements[0].detail}</span>
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {job.stack.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.04, ease: ease.out }}
                  className="font-mono-tight rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[10px] tracking-wide text-[var(--color-muted)]"
                >
                  {t}
                </motion.span>
              ))}
            </div>

            <ul className="mt-6 grid gap-4">
              <AnimatePresence initial={false}>
                {shown.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: ease.out }}
                    className="flex gap-4 overflow-hidden text-sm leading-relaxed text-[var(--color-muted)] sm:text-base"
                  >
                    <span className="font-mono-tight mt-1 shrink-0 text-xs text-[var(--color-accent)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {p}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((e) => !e)}
              className="press font-mono-tight mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-4 py-2 text-[11px] tracking-[0.15em] text-[var(--color-ink)] uppercase transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              {expanded ? 'Show less' : `Show all ${job.points.length} responsibilities`}
              <span aria-hidden className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        {...reveal}
        className="mt-10 flex flex-col gap-2 border-t border-[var(--color-line)] pt-8 sm:flex-row sm:items-baseline sm:gap-6"
      >
        <span className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">Off the clock</span>
        <span className="font-display text-lg text-[var(--color-ink)]">{achievements[1].title}</span>
        <span className="text-sm text-[var(--color-muted)]">{achievements[1].detail}</span>
      </motion.div>
    </section>
  )
}
