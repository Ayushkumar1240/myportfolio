import { motion } from 'framer-motion'
import HeroScene from './HeroScene'
import ErrorBoundary from './ErrorBoundary'
import CountUp from './CountUp'
import MagneticButton from './MagneticButton'
import ScrollHint from './ScrollHint'
import { heroStats, profile } from '../data/portfolio'

const line1 = 'Building systems'
const line2 = 'that move real money.'

function AnimatedLine({ text, delay }: { text: string; delay: number }) {
  const words = text.split(' ')
  return (
    <span className="block overflow-hidden">
      {words.map((word, i) => (
        <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.05 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-end overflow-hidden pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <ErrorBoundary>
          <HeroScene />
        </ErrorBoundary>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/40" />

      <div className="section-pad relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-mono-tight mb-6 flex items-center gap-3 text-xs tracking-[0.3em] text-[var(--color-muted)] uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </span>
          Available for select opportunities — {profile.location}
        </motion.div>

        <h1 className="font-display max-w-5xl text-[clamp(2.4rem,7.5vw,6rem)] leading-[0.98] font-medium text-[var(--color-ink)]">
          <AnimatedLine text={line1} delay={0.5} />
          <AnimatedLine text={line2} delay={0.7} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-base text-[var(--color-muted)] sm:text-lg"
        >
          I'm {profile.name} — a {profile.subrole.toLowerCase()} at DS Group. {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 font-mono-tight text-xs font-medium tracking-[0.15em] text-[#08090a] uppercase transition-transform"
          >
            View work
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-6 py-3 font-mono-tight text-xs tracking-[0.15em] text-[var(--color-ink)] uppercase transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Get in touch
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[var(--color-line)] pt-8 sm:grid-cols-4"
        >
          {heroStats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl text-[var(--color-ink)] sm:text-3xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-[var(--color-muted)]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <ScrollHint />
    </section>
  )
}
