import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { applyTheme, contrastOn, loadTheme, themes, type StoredTheme } from '../lib/themes'
import { ease } from '../lib/motion'

export default function ThemePicker() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<StoredTheme>(loadTheme)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (t: StoredTheme) => {
    setCurrent(t)
    applyTheme(t)
  }

  const customAccent = (hex: string) => {
    const base = themes.find((t) => t.mode === current.mode) ?? themes[0]
    const vars = current.id === 'custom' ? current.vars : base.vars
    choose({ id: 'custom', mode: current.mode, vars: { ...vars, accent: hex, accent2: hex, onAccent: contrastOn(hex) } })
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Change colour theme"
        data-cursor-text="THEME"
        className="press flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)]"
      >
        <span
          className="h-4 w-4 rounded-full"
          style={{ background: 'conic-gradient(var(--color-accent) 0 50%, var(--color-ink) 50% 100%)' }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Colour themes"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: ease.out }}
            className="absolute top-12 right-0 z-[60] w-[min(18rem,calc(100vw-2rem))] origin-top-right rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-2xl"
          >
            <div className="font-mono-tight mb-3 text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">Colour theme</div>
            <div className="grid grid-cols-4 gap-3">
              {themes.map((t) => {
                const on = current.id === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => choose(t)}
                    aria-pressed={on}
                    className="press group flex flex-col items-center gap-1.5"
                  >
                    <span
                      className={`relative h-10 w-10 overflow-hidden rounded-full border-2 transition-colors ${
                        on ? 'border-[var(--color-accent)]' : 'border-[var(--color-line)] group-hover:border-[var(--color-muted)]'
                      }`}
                      style={{ background: t.vars.bg }}
                    >
                      <span className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: t.vars.accent }} />
                      <span className="absolute top-1.5 left-1.5 h-2 w-2 rounded-full" style={{ background: t.vars.ink }} />
                    </span>
                    <span className={`text-[10px] ${on ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}`}>{t.name}</span>
                  </button>
                )
              })}
            </div>

            <label className="mt-4 flex cursor-pointer items-center justify-between gap-3 border-t border-[var(--color-line)] pt-4">
              <span>
                <span className="block text-sm text-[var(--color-ink)]">Custom accent</span>
                <span className="block text-[11px] text-[var(--color-muted)]">Pick any colour</span>
              </span>
              <span className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[var(--color-line)]" style={{ background: 'var(--color-accent)' }}>
                <input
                  type="color"
                  value={current.vars.accent}
                  onChange={(e) => customAccent(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  aria-label="Custom accent colour"
                />
              </span>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
