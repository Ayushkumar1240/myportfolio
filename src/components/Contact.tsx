import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { profile } from '../data/portfolio'

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex items-center justify-center overflow-hidden py-[clamp(5rem,12vw,10rem)] text-center"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[60vw] max-h-[800px] w-[60vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl section-pad">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono-tight mb-6 text-xs tracking-[0.3em] text-[var(--color-accent)] uppercase"
        >
          05 — Contact
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.4rem,7vw,5.5rem)] leading-[1.05] font-medium text-[var(--color-ink)]"
        >
          Let's build
          <br />
          something{' '}
          <em className="text-[var(--color-accent)] font-normal italic">that doesn't fall over.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-[44ch] text-[var(--color-muted)] sm:text-lg"
        >
          Open to backend-heavy full-stack roles, systems work, and interesting problems at scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex justify-center"
        >
          <MagneticButton
            as="a"
            href={`mailto:${profile.email}`}
            data-cursor="link"
            data-cursor-text="EMAIL"
            className="group font-display inline-flex items-center gap-3 border-b border-[var(--color-line)] pb-2 text-[clamp(1.2rem,3vw,1.9rem)] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]"
          >
            {profile.email}
            <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="font-mono-tight text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-accent)]"
            >
              {s.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10"
        >
          <a
            href={`tel:${profile.phone}`}
            data-cursor="link"
            className="font-mono-tight text-xs tracking-[0.2em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            {profile.phone}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
