import { motion } from 'framer-motion'
import { principles } from '../data/portfolio'

export default function Principles() {
  return (
    <section className="section-pad section-y">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0, margin: '0px 0px -24px 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 max-w-2xl sm:mb-8 lg:mb-10"
      >
        <div className="font-mono-tight mb-4 text-xs tracking-[0.3em] text-[var(--color-accent)] uppercase">
          How I actually build
        </div>
        <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-medium text-[var(--color-ink)]">
          A few things I believe about software, learned the expensive way.
        </h2>
      </motion.div>

      <div className="grid gap-0 border-t border-[var(--color-line)] sm:grid-cols-2">
        {principles.map((p, i) => (
          <motion.div
            key={p.index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: '0px 0px -24px 0px' }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group border-b border-[var(--color-line)] py-6 pr-6 transition-colors sm:py-8 sm:odd:border-r"
          >
            <div className="font-display text-[var(--color-line)] text-3xl transition-colors duration-500 group-hover:text-[var(--color-accent)]">
              {p.index}
            </div>
            <h3 className="font-display mt-4 text-xl leading-snug text-[var(--color-ink)] sm:text-2xl">
              {p.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              {p.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
