// Shared motion vocabulary so every section moves with the same rhythm.
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}

export const dur = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
}

export const inViewport = { once: true, amount: 0, margin: '0px 0px -24px 0px' }

export const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: inViewport,
  transition: { duration: 0.6, ease: ease.out },
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
