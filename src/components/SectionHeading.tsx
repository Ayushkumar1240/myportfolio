import { motion } from 'framer-motion'
import ScrambleText from './ScrambleText'

export default function SectionHeading({
  index,
  title,
  eyebrow,
}: {
  index: string
  title: string
  eyebrow: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-14 flex items-end justify-between gap-6 border-b border-[var(--color-line)] pb-6"
    >
      <div>
        <ScrambleText
          text={eyebrow}
          className="font-mono-tight mb-3 block text-xs tracking-[0.3em] text-[var(--color-accent)] uppercase"
        />
        <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-medium text-[var(--color-ink)]">{title}</h2>
      </div>
      <div className="font-mono-tight hidden text-sm text-[var(--color-muted)] sm:block">{index}</div>
    </motion.div>
  )
}
