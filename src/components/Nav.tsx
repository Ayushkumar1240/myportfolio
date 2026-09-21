import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navLinks, profile } from '../data/portfolio'
import MagneticButton from './MagneticButton'
import ScrambleText from './ScrambleText'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-line)]' : ''
      }`}
    >
      <div className="section-pad flex items-center justify-between py-5">
        <a href="#top" className="font-display text-lg tracking-tight" data-cursor="link">
          AK<span className="text-[var(--color-accent)]">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="link"
              className="font-mono-tight text-xs tracking-[0.15em] text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-accent)]"
            >
              <ScrambleText text={l.label} />
            </a>
          ))}
        </nav>

        <MagneticButton
          as="a"
          href={`mailto:${profile.email}`}
          data-cursor="link"
          data-cursor-text="EMAIL"
          className="hidden rounded-full border border-[var(--color-line)] px-5 py-2 font-mono-tight text-xs tracking-[0.15em] text-[var(--color-ink)] uppercase transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] md:inline-block"
        >
          {profile.email}
        </MagneticButton>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-[var(--color-ink)] transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-[var(--color-ink)] transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="section-pad flex flex-col gap-5 border-t border-[var(--color-line)] bg-[var(--color-bg)] py-6 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-mono-tight text-sm tracking-[0.15em] text-[var(--color-muted)] uppercase"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  )
}
