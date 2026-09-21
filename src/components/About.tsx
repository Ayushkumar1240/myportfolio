import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { aboutStats, education, profile } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="section-pad py-28">
      <SectionHeading index="01" eyebrow="About" title="Who's building this" />

      <div className="grid gap-16 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <p className="text-[clamp(1.3rem,2.4vw,1.9rem)] leading-snug text-[var(--color-ink)]">
            I like the unglamorous half of engineering — the payout that has to reconcile,
            the migration that can't drop a row, the API that still responds under a traffic
            spike. Most of my 2.5 years at{' '}
            <span className="text-[var(--color-accent)]">DS Group</span> has gone into exactly
            that: turning legacy PHP systems into microservices, and keeping payment and
            loyalty platforms honest at scale.
          </p>
          <p className="mt-6 max-w-xl text-[var(--color-muted)]">
            Outside of production code, I spend time on{' '}
            <span className="text-[var(--color-ink)]">system design</span> and{' '}
            <span className="text-[var(--color-ink)]">algorithmic problem-solving</span> — 671+
            LeetCode problems in, and counting. I studied Computer Science at{' '}
            {education.school} ({education.period}, {education.detail}).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-6 lg:col-span-5"
        >
          {aboutStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]/50"
            >
              <div className="font-display text-3xl text-[var(--color-accent)]">{s.value}</div>
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
        className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-[var(--color-line)] pt-8 text-sm text-[var(--color-muted)]"
      >
        <span className="font-mono-tight text-[var(--color-ink)]">{profile.location}</span>
        <span>{profile.email}</span>
        <span>{profile.phone}</span>
      </motion.div>
    </section>
  )
}
