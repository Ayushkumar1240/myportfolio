import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="section-pad border-t border-[var(--color-line)] pt-8 pb-6">
      <div
        aria-hidden
        className="font-display text-outline pointer-events-none text-[clamp(4rem,18vw,15rem)] leading-[0.8] font-medium tracking-tight select-none"
      >
        Ayush<span className="text-[var(--color-accent)]" style={{ WebkitTextStroke: 0 }}>.</span>
      </div>
      <div className="mt-8 flex flex-col gap-4 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        {/* <span className="font-mono-tight hidden md:inline">React · Three.js · Framer Motion</span> */}
        <a href="#top" className="group font-mono-tight inline-flex items-center gap-2 tracking-[0.2em] uppercase hover:text-[var(--color-ink)]">
          Back to top
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </a>
      </div>
    </footer>
  )
}
