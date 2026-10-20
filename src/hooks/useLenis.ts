import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

// Lets overlays pause smooth scrolling while they are open.
export const lenisRef: { current: Lenis | null } = { current: null }

export function useLenis() {
  useEffect(() => {
    const reduced = prefersReducedMotion()
    const lenis = reduced
      ? null
      : new Lenis({
          duration: 1.1,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          smoothWheel: true,
        })
    lenisRef.current = lenis

    const raf = (time: number) => lenis?.raf(time * 1000)
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    }

    const anchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href === '#') return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -60, duration: 1.4, force: true })
      else el.scrollIntoView({ behavior: 'auto' })
    }
    document.addEventListener('click', anchorClick)

    return () => {
      document.removeEventListener('click', anchorClick)
      gsap.ticker.remove(raf)
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])
}
