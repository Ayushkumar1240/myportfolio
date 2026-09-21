import { useEffect, useState } from 'react'
import { navLinks } from '../data/portfolio'

const sections = [{ label: 'Intro', href: '#top' }, ...navLinks]

export default function SectionDots() {
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const ids = sections.map((s) => s.href.slice(1))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="pointer-events-auto fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
      {sections.map((s) => {
        const isActive = active === s.href
        return (
          <a
            key={s.href}
            href={s.href}
            data-cursor="link"
            className="group flex items-center gap-3"
          >
            <span
              className={`font-mono-tight text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                isActive
                  ? 'translate-x-0 text-[var(--color-ink)] opacity-100'
                  : 'translate-x-2 text-[var(--color-muted)] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                isActive
                  ? 'scale-125 border-[var(--color-accent)] bg-[var(--color-accent)]'
                  : 'border-[var(--color-muted)] bg-transparent group-hover:border-[var(--color-ink)]'
              }`}
            />
          </a>
        )
      })}
    </div>
  )
}
