import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, profile } from '../data/portfolio'
import MagneticButton from './MagneticButton'
import ScrambleText from './ScrambleText'
import ThemePicker from './ThemePicker'
import { useActiveSection } from '../hooks/useActiveSection'
import { lenisRef } from '../hooks/useLenis'
import { ease } from '../lib/motion'

const hrefs = ['#top', ...navLinks.map((l) => l.href)]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(hrefs)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    lenisRef.current?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      lenisRef.current?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: ease.out, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || open
          ? 'border-[var(--color-line)] bg-[var(--color-bg)]/80 backdrop-blur-md'
          : 'border-transparent'
      }`}
    >
      <div className="section-pad flex items-center justify-between py-4">
        <a href="#top" className="group font-display flex items-center gap-2 text-lg tracking-tight" aria-label="Ayush Kumar — back to top">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] text-sm transition-colors group-hover:border-[var(--color-accent)]">
            AK
          </span>
          <span className="hidden text-sm text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-ink)] lg:inline">
            {profile.name}
            <span className="text-[var(--color-accent)]">.</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const on = active === l.href
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={on ? 'true' : undefined}
                className={`font-mono-tight relative px-3 py-2 text-xs tracking-[0.15em] uppercase transition-colors ${
                  on ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                <ScrambleText text={l.label} />
                {on && (
                  <motion.span
                    layoutId="nav-indicator"
                    transition={{ duration: 0.45, ease: ease.out }}
                    className="absolute right-3 -bottom-0.5 left-3 h-px bg-[var(--color-accent)]"
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemePicker />
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            data-cursor-text="PDF"
            className="press group font-mono-tight hidden items-center gap-1.5 rounded-full border border-[var(--color-line)] px-4 py-2 text-xs tracking-[0.15em] text-[var(--color-ink)] uppercase transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] lg:inline-flex"
          >
            Résumé
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
          <MagneticButton
            as="a"
            href="#contact"
            data-cursor-text="SAY HI"
            className="press group hidden items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2 font-mono-tight text-xs tracking-[0.15em] text-[var(--color-on-accent)] uppercase md:inline-flex"
          >
            Let's talk
            <span aria-hidden className="arrow-slide">
              <span>↗</span>
              <span>↗</span>
            </span>
          </MagneticButton>

          <button
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className={`h-px w-6 bg-[var(--color-ink)] transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-[var(--color-ink)] transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: ease.inOut }}
            className="section-pad absolute inset-x-0 top-full flex h-[calc(100dvh-100%)] flex-col justify-between border-t border-[var(--color-line)] bg-[var(--color-bg)] py-10 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: ease.out }}
                  className={`font-display flex items-baseline gap-4 border-b border-[var(--color-line)] py-4 text-4xl ${
                    active === l.href ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink)]'
                  }`}
                >
                  <span className="font-mono-tight text-xs text-[var(--color-muted)]">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col gap-3"
            >
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                onClick={() => setOpen(false)}
                className="press font-mono-tight mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-xs tracking-[0.15em] text-[var(--color-on-accent)] uppercase"
              >
                Download résumé ↓
              </a>
              <a href={`mailto:${profile.email}`} className="text-sm text-[var(--color-ink)]">
                {profile.email}
              </a>
              <div className="flex gap-6">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-tight text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
