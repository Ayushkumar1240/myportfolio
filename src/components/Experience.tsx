import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { achievements, experience } from '../data/portfolio'

export default function Experience() {
  return (
    <section id="experience" className="section-pad py-28">
      <SectionHeading index="02" eyebrow="Experience" title="Where the work happens" />

      <div className="flex flex-col gap-12">
        {experience.map((job) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 border-t border-[var(--color-line)] pt-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <h3 className="font-display text-2xl text-[var(--color-ink)]">{job.company}</h3>
              <div className="mt-1 text-[var(--color-accent)]">{job.role}</div>
              <div className="font-mono-tight mt-3 text-xs tracking-[0.15em] text-[var(--color-muted)] uppercase">
                {job.period}
              </div>
              <div className="mt-1 text-xs text-[var(--color-muted)]">{job.location}</div>
            </div>
            <ul className="grid gap-4 lg:col-span-8">
              {job.points.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 grid gap-6 border-t border-[var(--color-line)] pt-10 sm:grid-cols-2"
      >
        {achievements.map((a) => (
          <div key={a.title} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
            <div className="font-display text-lg text-[var(--color-ink)]">{a.title}</div>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{a.detail}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
