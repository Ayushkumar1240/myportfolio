import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="section-pad flex flex-col items-center gap-4 border-t border-[var(--color-line)] py-8 text-xs text-[var(--color-muted)] sm:flex-row sm:justify-between">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <a href="#top" data-cursor="link" className="font-mono-tight tracking-[0.2em] uppercase hover:text-[var(--color-ink)]">
        Back to top ↑
      </a>
    </footer>
  )
}
