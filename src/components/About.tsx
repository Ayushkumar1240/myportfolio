import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { aboutParagraphs, aboutStats, profile } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="section-pad section-y">
      <SectionHeading index="01" eyebrow="About" title="Who's building this" />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: '0px 0px -24px 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <p className="text-[clamp(1.3rem,2.4vw,1.9rem)] leading-snug text-[var(--color-ink)]">
            {aboutParagraphs[0]}
          </p>
          <p className="mt-6 max-w-xl text-[var(--color-muted)]">{aboutParagraphs[1]}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: '0px 0px -24px 0px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-5"
        >
          {aboutStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 sm:p-6 transition-colors hover:border-[var(--color-accent)]/50"
            >
              <div className="font-display text-2xl sm:text-3xl text-[var(--color-accent)]">{s.value}</div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-[var(--color-line)] pt-6 text-sm text-[var(--color-muted)] sm:mt-12"
      >
        <span className="font-mono-tight text-[var(--color-ink)]">{profile.location}</span>
        <span>{profile.email}</span>
        <span>{profile.phone}</span>
      </motion.div>
    </section>
  )
}
