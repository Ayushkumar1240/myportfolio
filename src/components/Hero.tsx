import { motion } from 'framer-motion'
import HeroScene from './HeroScene'
import ErrorBoundary from './ErrorBoundary'
import CountUp from './CountUp'
import MagneticButton from './MagneticButton'
import ScrollHint from './ScrollHint'
import { heroStats, profile } from '../data/portfolio'
import { ease } from '../lib/motion'

function AnimatedLine({ text, delay, className = '' }: { text: string; delay: number; className?: string }) {
  const words = text.split(' ')
  return (
    <span className="block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pr-[0.22em] pb-[0.08em] align-bottom last:pr-0">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: ease.out, delay: delay + i * 0.05 }}
            className={`inline-block ${className}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: ease.out },
})

export default function Hero() {
  return (
    <section id="top" className="relative flex flex-col overflow-hidden pt-[88px] sm:pt-[84px]">
      {/* 3D sketch sits to the right on desktop, faded behind the copy on mobile */}
      <div className="pointer-events-none absolute inset-0 opacity-40 lg:opacity-90">
        <ErrorBoundary>
          <HeroScene />
        </ErrorBoundary>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg)_0%,color-mix(in_srgb,var(--color-bg)_70%,transparent)_45%,transparent_75%)] max-lg:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-bg)_30%,transparent),color-mix(in_srgb,var(--color-bg)_85%,transparent)_60%,var(--color-bg))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />

      <div className="section-pad relative z-10 flex flex-col pt-2 pb-10 sm:pt-4 lg:pb-14">
        <motion.div {...fadeUp(0.3)} className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mb-8">
          <span className="font-display text-lg text-[var(--color-ink)] sm:text-xl">{profile.name}</span>
          <span className="hidden h-px w-8 bg-[var(--color-line)] sm:block" />
          <span className="font-mono-tight text-[11px] tracking-[0.2em] text-[var(--color-muted)] uppercase">{profile.subrole}</span>
          <span className="font-mono-tight inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-3 py-1 text-[10px] tracking-[0.15em] text-[var(--color-ink)] uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            Open to work
          </span>
        </motion.div>

        <h1 className="font-display max-w-[14ch] max-lg:max-w-none text-[clamp(2.2rem,6.6vw,6rem)] leading-[0.95] font-medium tracking-[-0.025em] text-[var(--color-ink)] lg:max-w-[15ch]">
          <AnimatedLine text={profile.heroLine1} delay={0.4} />
          <AnimatedLine text={profile.heroLine2Plain} delay={0.55} />
          <AnimatedLine text={profile.heroLine2Accent} delay={0.7} className="font-normal text-[var(--color-accent)] italic" />
        </h1>

        <motion.p {...fadeUp(0.95)} className="mt-6 max-w-[34rem] text-[15px] leading-relaxed text-[var(--color-muted)] sm:mt-8 sm:text-lg">
          {profile.heroSummary}
        </motion.p>

        <motion.div {...fadeUp(1.1)} className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
          <MagneticButton
            as="a"
            href="#work"
            className="press group font-mono-tight inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-xs font-medium tracking-[0.15em] text-[var(--color-on-accent)] uppercase"
          >
            View work
            <span aria-hidden className="arrow-slide">
              <span>→</span>
              <span>→</span>
            </span>
          </MagneticButton>
          <MagneticButton
            as="a"
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            data-cursor-text="PDF"
            className="press group font-mono-tight inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-6 py-3 text-xs tracking-[0.15em] text-[var(--color-ink)] uppercase transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Download résumé
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </MagneticButton>
          <a href="#contact" className="link-underline font-mono-tight px-2 py-3 text-xs tracking-[0.15em] text-[var(--color-muted)] uppercase hover:text-[var(--color-ink)]">
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        {...fadeUp(1.25)}
        className="section-pad relative z-10 grid grid-cols-2 gap-x-6 gap-y-5 pb-8 sm:grid-cols-4 sm:pb-10"
      >
        {heroStats.map((s) => (
          <div key={s.label} className="border-t border-[var(--color-line)] pt-4">
            <div className="font-display text-2xl text-[var(--color-ink)] sm:text-3xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-xs text-[var(--color-muted)]">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <ScrollHint />
    </section>
  )
}
