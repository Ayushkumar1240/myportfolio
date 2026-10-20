import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { engineeringNotes, type EngineeringNote, type FlowStep } from '../data/portfolio'
import { ease, reveal } from '../lib/motion'

function FlowPlayer({ note }: { note: EngineeringNote }) {
  const scenarios = note.scenarios ?? []
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const steps: FlowStep[] = scenarios.find((s) => s.id === scenarioId)?.steps ?? []
  const last = steps.length - 1
  const running = playing && step < last

  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setStep((s) => s + 1), 1400)
    return () => clearTimeout(t)
  }, [running, step])

  const pickScenario = (id: string) => {
    setScenarioId(id)
    setStep(0)
    setPlaying(false)
  }

  const play = () => {
    if (step >= last) setStep(0)
    setPlaying(true)
  }

  const current = steps[step]

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        {scenarios.length > 1 ? (
          <div role="group" aria-label="Scenario" className="flex rounded-full border border-[var(--color-line)] p-1">
            {scenarios.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={s.id === scenarioId}
                onClick={() => pickScenario(s.id)}
                className={`press font-mono-tight relative rounded-full px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-colors ${
                  s.id === scenarioId ? 'text-[var(--color-on-accent)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                {s.id === scenarioId && (
                  <motion.span
                    layoutId={`scenario-${note.id}`}
                    transition={{ duration: 0.4, ease: ease.out }}
                    className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
                  />
                )}
                <span className="relative">{s.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <span className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
            {scenarios[0]?.label}
          </span>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPlaying(false)
              setStep((s) => Math.max(0, s - 1))
            }}
            disabled={step === 0}
            aria-label="Previous step"
            className="press h-8 w-8 rounded-full border border-[var(--color-line)] text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] disabled:opacity-30"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => (running ? setPlaying(false) : play())}
            className="press font-mono-tight h-8 rounded-full bg-[var(--color-accent)] px-4 text-[10px] tracking-[0.15em] text-[var(--color-on-accent)] uppercase"
          >
            {running ? 'Pause' : step >= last ? 'Replay' : 'Play flow'}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false)
              setStep((s) => Math.min(last, s + 1))
            }}
            disabled={step === last}
            aria-label="Next step"
            className="press h-8 w-8 rounded-full border border-[var(--color-line)] text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative">
      <div
        aria-hidden
        className="absolute top-[15px] hidden h-px bg-[var(--color-line)] sm:block"
        style={{ left: `${50 / steps.length}%`, right: `${50 / steps.length}%` }}
      >
        <div
          className="h-full origin-left bg-[var(--color-accent)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ transform: `scaleX(${last ? step / last : 0})` }}
        />
      </div>
      <ol className="grid gap-3 sm:gap-0" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((s, i) => {
          const done = i < step
          const on = i === step
          return (
            <li key={`${scenarioId}-${s.id}`} className="col-span-full sm:col-span-1">
              <button
                type="button"
                onClick={() => {
                  setPlaying(false)
                  setStep(i)
                }}
                aria-current={on ? 'step' : undefined}
                className="group flex w-full items-center gap-3 text-left sm:flex-col sm:gap-2 sm:text-center"
              >
                <span
                  className={`relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border font-mono-tight text-[10px] transition-colors duration-300 ${
                    on
                      ? s.tone === 'warn'
                        ? 'border-[var(--color-accent-2)] bg-[var(--color-accent-2)] text-[var(--color-on-accent)]'
                        : 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-on-accent)]'
                      : done
                        ? 'border-[var(--color-accent)] bg-[var(--color-bg)] text-[var(--color-accent)]'
                        : 'border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-muted)] group-hover:border-[var(--color-muted)]'
                  }`}
                >
                  {done ? '✓' : String(i + 1).padStart(2, '0')}
                  {on && (
                    <span className="absolute inset-0 animate-ping rounded-full border border-[var(--color-accent)] opacity-40" />
                  )}
                </span>
                <span
                  className={`font-mono-tight text-[11px] leading-tight transition-colors ${
                    on ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      </div>

      <div className="mt-6 min-h-[84px] rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5" aria-live="polite">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={`${scenarioId}-${current.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">
                Step {step + 1} — {current.label}
              </div>
              <p className="mt-2 text-sm text-[var(--color-ink)]/85">{current.detail}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ComparePanel({ note }: { note: EngineeringNote }) {
  const [side, setSide] = useState<'before' | 'after'>('before')
  const data = note.compare!
  const view = data[side]

  return (
    <div>
      <div role="group" aria-label="Compare" className="mb-6 inline-flex rounded-full border border-[var(--color-line)] p-1">
        {(['before', 'after'] as const).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={side === k}
            onClick={() => setSide(k)}
            className={`press font-mono-tight relative rounded-full px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-colors ${
              side === k ? 'text-[var(--color-on-accent)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            {side === k && (
              <motion.span
                layoutId={`compare-${note.id}`}
                transition={{ duration: 0.4, ease: ease.out }}
                className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
              />
            )}
            <span className="relative">{data[k].label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-5">
        {view.bars.map((b) => (
          <div key={b.label}>
            <div className="font-mono-tight mb-2 flex justify-between text-[11px] text-[var(--color-muted)]">
              <span>{b.label}</span>
              <span className="text-[var(--color-ink)]">{b.value === 100 ? 'baseline' : `${b.value}% of baseline`}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
              <motion.div
                className={`h-full rounded-full ${side === 'after' ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-muted)]'}`}
                initial={false}
                animate={{ width: `${b.value}%` }}
                transition={{ duration: 0.8, ease: ease.out }}
              />
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-6 grid gap-2 sm:grid-cols-3">
        {view.points.map((p) => (
          <motion.li
            key={`${side}-${p}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-3 text-xs text-[var(--color-ink)]/85"
          >
            {p}
          </motion.li>
        ))}
      </ul>
      <p className="font-mono-tight mt-4 text-[10px] text-[var(--color-muted)]">Relative to the pre-optimisation baseline.</p>
    </div>
  )
}

export default function EngineeringNotes() {
  const [activeId, setActiveId] = useState(engineeringNotes[0].id)
  const note = engineeringNotes.find((n) => n.id === activeId)!

  return (
    <section id="notes" className="section-pad section-y">
      <SectionHeading index="04" eyebrow="Behind the Code" title="Engineering notes" />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <motion.div {...reveal} role="tablist" aria-label="Engineering stories" className="grid gap-2 self-start sm:grid-cols-3 lg:sticky lg:top-24 lg:col-span-4 lg:grid-cols-1">
          {engineeringNotes.map((n, i) => {
            const on = n.id === activeId
            return (
              <button
                key={n.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="note-panel"
                onClick={() => setActiveId(n.id)}
                className={`press group relative overflow-hidden rounded-xl border p-4 text-left transition-colors sm:p-5 ${
                  on ? 'border-[var(--color-accent)]/60 bg-[var(--color-surface)]' : 'border-[var(--color-line)] hover:border-[var(--color-muted)]'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="note-marker"
                    transition={{ duration: 0.45, ease: ease.out }}
                    className="absolute inset-y-0 left-0 w-[3px] bg-[var(--color-accent)]"
                  />
                )}
                <div className="font-mono-tight flex justify-between text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                  <span>{n.tag}</span>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div
                  className={`font-display mt-2 text-lg leading-snug transition-colors ${
                    on ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)] group-hover:text-[var(--color-ink)]'
                  }`}
                >
                  {n.title}
                </div>
              </button>
            )
          })}
        </motion.div>

        <motion.div {...reveal} className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={note.id}
              id="note-panel"
              role="tabpanel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: ease.out }}
              className="rounded-2xl border border-[var(--color-line)] p-5 sm:p-8"
            >
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-[var(--color-ink)]">
                {note.title}
              </h3>

              <div className="mt-6 grid gap-6 border-b border-[var(--color-line)] pb-8 md:grid-cols-2">
                <div>
                  <div className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-accent-2)] uppercase">The problem</div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{note.problem}</p>
                </div>
                <div>
                  <div className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">The approach</div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{note.approach}</p>
                </div>
              </div>

              <div className="pt-8">{note.kind === 'flow' ? <FlowPlayer note={note} /> : <ComparePanel note={note} />}</div>

              <div className="mt-8 flex gap-3 border-t border-[var(--color-line)] pt-6">
                <span className="font-mono-tight shrink-0 text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">Outcome</span>
                <p className="text-sm text-[var(--color-ink)]">{note.outcome}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
