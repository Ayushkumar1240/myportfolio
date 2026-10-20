import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Marquee from './Marquee'
import { languages, projects, skillCategories, skillsIntro } from '../data/portfolio'
import { ease, reveal } from '../lib/motion'

const norm = (s: string) => s.toLowerCase().replace(/\.js$/, '').trim()

// Where each category sits in the system-stack diagram.
const AREAS: Record<string, string> = {
  frontend: 'web',
  mobile: 'mob',
  backend: 'api',
  integrations: 'ext',
  data: 'data',
  devops: 'ops',
  security: 'sec',
}

export default function Skills() {
  const [catId, setCatId] = useState(skillCategories[2].id)
  const cat = skillCategories.find((c) => c.id === catId)!
  const [techName, setTechName] = useState(cat.items[0].name)
  const tech = cat.items.find((t) => t.name === techName) ?? cat.items[0]

  const related = projects.filter((p) => p.stack.some((s) => norm(s) === norm(tech.name)))

  const selectCat = (id: string) => {
    const next = skillCategories.find((c) => c.id === id)!
    setCatId(id)
    setTechName(next.items[0].name)
  }

  return (
    <section id="skills" className="section-y">
      <div className="section-pad">
        <SectionHeading index="05" eyebrow="Toolbox" title="What I build with" />
        <motion.p {...reveal} className="mb-8 max-w-md text-[var(--color-muted)] lg:mb-10">
          {skillsIntro} <span className="text-[var(--color-ink)]">Pick a layer of the stack.</span>
        </motion.p>
      </div>

      <div className="section-pad grid gap-8 lg:grid-cols-12 lg:gap-12">
        <motion.div {...reveal} className="lg:col-span-5">
          <div className="font-mono-tight mb-3 flex justify-between text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
            <span>System stack</span>
            <span>request ↓</span>
          </div>
          <div
            role="tablist"
            aria-label="Skill categories"
            className="bg-grid grid gap-2 rounded-2xl border border-[var(--color-line)] p-3"
            style={{
              gridTemplateColumns: '1fr 1fr 2.5rem',
              gridTemplateAreas: '"web mob sec" "api ext sec" "data data sec" "ops ops sec"',
            }}
          >
            {skillCategories.map((c) => {
              const on = c.id === catId
              const vertical = AREAS[c.id] === 'sec'
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="skill-panel"
                  onClick={() => selectCat(c.id)}
                  style={{ gridArea: AREAS[c.id] }}
                  className={`press group relative flex min-h-[64px] overflow-hidden rounded-lg border text-left transition-colors duration-300 ${
                    vertical ? 'items-center justify-center' : 'flex-col justify-between p-3'
                  } ${
                    on
                      ? 'border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,var(--color-surface))]'
                      : 'border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-muted)]'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="stack-glow"
                      transition={{ duration: 0.5, ease: ease.out }}
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,color-mix(in_srgb,var(--color-accent)_25%,transparent),transparent_70%)]"
                    />
                  )}
                  {vertical ? (
                    <span
                      className={`font-mono-tight relative text-[10px] tracking-[0.25em] uppercase [writing-mode:vertical-rl] ${
                        on ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'
                      }`}
                    >
                      {c.layer}
                    </span>
                  ) : (
                    <>
                      <span
                        className={`font-mono-tight relative text-[10px] tracking-[0.2em] uppercase ${
                          on ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'
                        }`}
                      >
                        {c.layer}
                      </span>
                      <span className="relative mt-2 flex items-end justify-between gap-2">
                        <span className={`font-display text-base leading-tight sm:text-lg ${on ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)]/70'}`}>
                          {c.label}
                        </span>
                        <span className="font-mono-tight text-[10px] text-[var(--color-muted)]">{c.items.length}</span>
                      </span>
                    </>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-6">
            <div className="font-mono-tight mb-3 text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">Languages</div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--color-ink)]/80">
              {languages.map((l, i) => (
                <span key={l}>
                  {l}
                  {i < languages.length - 1 && <span className="ml-4 text-[var(--color-line)]">/</span>}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              id="skill-panel"
              role="tabpanel"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.35, ease: ease.out }}
            >
              <div className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">{cat.layer}</div>
              <h3 className="font-display mt-2 text-[clamp(1.8rem,3.5vw,2.75rem)] leading-tight text-[var(--color-ink)]">{cat.label}</h3>
              <p className="mt-3 max-w-xl text-[var(--color-muted)]">{cat.blurb}</p>

              <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={`${cat.label} technologies`}>
                {cat.items.map((t) => {
                  const on = t.name === tech.name
                  return (
                    <button
                      key={t.name}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTechName(t.name)}
                      onMouseEnter={() => setTechName(t.name)}
                      className={`press font-mono-tight rounded-full border px-4 py-2 text-xs transition-colors ${
                        on
                          ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                          : 'border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                      }`}
                    >
                      {t.name}
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 sm:p-6" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="font-display text-xl text-[var(--color-ink)]">{tech.name}</div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{tech.note}</p>
                    <div className="mt-5 border-t border-[var(--color-line)] pt-4">
                      <div className="font-mono-tight text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                        {related.length ? `Used in ${related.length} project${related.length > 1 ? 's' : ''}` : 'Used across day-to-day work'}
                      </div>
                      {related.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {related.map((p, i) => (
                            <li key={p.slug}>
                              <a
                                href="#work"
                                className="link-underline text-sm text-[var(--color-ink)]/85 hover:text-[var(--color-accent)]"
                              >
                                {p.name.split(' — ')[0]}
                              </a>
                              {i < related.length - 1 && <span className="ml-2 text-[var(--color-line)]">·</span>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mt-10 sm:mt-14">
        <Marquee />
      </div>
    </section>
  )
}
