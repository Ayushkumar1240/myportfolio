import { marqueeSkills } from '../data/portfolio'

export default function Marquee() {
  const items = [...marqueeSkills, ...marqueeSkills]
  return (
    <div className="overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-surface)] py-4">
      <div className="animate-marquee flex w-max gap-10">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono-tight flex items-center gap-10 text-sm tracking-wide text-[var(--color-muted)] whitespace-nowrap"
          >
            {item}
            <span className="text-[var(--color-accent)]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
