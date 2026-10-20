export type ThemeVars = {
  bg: string
  surface: string
  surface2: string
  ink: string
  muted: string
  line: string
  accent: string
  accent2: string
  onAccent: string
}

export type Theme = { id: string; name: string; mode: 'dark' | 'light'; vars: ThemeVars }

export const DEFAULT_THEME_ID = 'paper'

export const themes: Theme[] = [
  {
    id: 'amber',
    name: 'Amber',
    mode: 'dark',
    vars: { bg: '#08090a', surface: '#101113', surface2: '#16181b', ink: '#f3f2ec', muted: '#8b8d92', line: '#232529', accent: '#ffb454', accent2: '#ff7a45', onAccent: '#08090a' },
  },
  {
    id: 'mint',
    name: 'Mint',
    mode: 'dark',
    vars: { bg: '#070b0a', surface: '#0e1413', surface2: '#141c1a', ink: '#eef5f2', muted: '#86948f', line: '#1f2a27', accent: '#5eead4', accent2: '#a3e635', onAccent: '#04110e' },
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    mode: 'dark',
    vars: { bg: '#07080d', surface: '#0e1018', surface2: '#141722', ink: '#eef1f8', muted: '#878ca0', line: '#1f2433', accent: '#7aa2ff', accent2: '#38bdf8', onAccent: '#060a18' },
  },
  {
    id: 'ember',
    name: 'Ember',
    mode: 'dark',
    vars: { bg: '#0b0807', surface: '#141010', surface2: '#1b1615', ink: '#f6efec', muted: '#9a8e8a', line: '#2a2220', accent: '#ff5d5d', accent2: '#ffb454', onAccent: '#140606' },
  },
  {
    id: 'acid',
    name: 'Acid',
    mode: 'dark',
    vars: { bg: '#0a0a09', surface: '#121210', surface2: '#191916', ink: '#f2f2ea', muted: '#8f8f86', line: '#262622', accent: '#d4ff3a', accent2: '#7dd3fc', onAccent: '#0a0d00' },
  },
  {
    id: 'paper',
    name: 'Paper',
    mode: 'light',
    vars: { bg: '#f4f1ea', surface: '#ece8de', surface2: '#e3ded2', ink: '#17160f', muted: '#6b665a', line: '#d5cfc1', accent: '#c2410c', accent2: '#a16207', onAccent: '#fff8f1' },
  },
  {
    id: 'frost',
    name: 'Frost',
    mode: 'light',
    vars: { bg: '#f1f3f7', surface: '#e7eaf0', surface2: '#dde1e9', ink: '#0d1321', muted: '#5d6475', line: '#cfd4de', accent: '#2547d0', accent2: '#0e7490', onAccent: '#f5f7ff' },
  },
]

const STORAGE_KEY = 'portfolio-theme'

const CSS_NAMES: Record<keyof ThemeVars, string> = {
  bg: '--color-bg',
  surface: '--color-surface',
  surface2: '--color-surface-2',
  ink: '--color-ink',
  muted: '--color-muted',
  line: '--color-line',
  accent: '--color-accent',
  accent2: '--color-accent-2',
  onAccent: '--color-on-accent',
}

// Readable text colour for an arbitrary accent picked by hand.
export function contrastOn(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? '#0a0a0a' : '#ffffff'
}

export type StoredTheme = { id: string; mode: 'dark' | 'light'; vars: ThemeVars }

export function applyTheme(t: StoredTheme) {
  const root = document.documentElement
  root.classList.add('theme-switching')
  window.setTimeout(() => root.classList.remove('theme-switching'), 450)
  ;(Object.keys(CSS_NAMES) as (keyof ThemeVars)[]).forEach((k) => root.style.setProperty(CSS_NAMES[k], t.vars[k]))
  root.style.colorScheme = t.mode
  root.dataset.theme = t.mode
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.vars.bg)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t))
  } catch {
    /* storage unavailable — theme just won't persist */
  }
  window.dispatchEvent(new CustomEvent('themechange'))
}

export function loadTheme(): StoredTheme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as StoredTheme
  } catch {
    /* ignore */
  }
  return themes.find((t) => t.id === DEFAULT_THEME_ID)!
}

export const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
