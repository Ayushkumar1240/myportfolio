import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const dot = dotRef.current!
    const ring = ringRef.current!
    const labelEl = labelRef.current!
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }

    gsap.set([dot, ring, labelEl], { xPercent: -50, yPercent: -50 })

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.08, ease: 'none' })
      gsap.to(labelEl, { x: pos.x, y: pos.y + 28, duration: 0.12, ease: 'none' })
    }
    window.addEventListener('mousemove', onMove)

    gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.16
      ringPos.y += (pos.y - ringPos.y) * 0.16
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
    })

    const interactiveSelector = 'a, button, [data-cursor="link"]'

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(interactiveSelector)
      if (!target) return
      const text = target.getAttribute('data-cursor-text')
      gsap.to(dot, { scale: 0, duration: 0.2 })
      gsap.to(ring, { opacity: 0.4, duration: 0.25 })
      if (text) {
        setLabel(text)
        gsap.to(labelEl, { opacity: 1, scale: 1, duration: 0.25, ease: 'power3.out' })
      }
    }
    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(interactiveSelector)
      if (!target) return
      gsap.to(dot, { scale: 1, duration: 0.2 })
      gsap.to(ring, { opacity: 1, duration: 0.25 })
      gsap.to(labelEl, { opacity: 0, scale: 0.85, duration: 0.2 })
      setLabel('')
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[300] hidden md:block" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-8 w-8 rounded-full border border-[var(--color-accent)] will-change-transform"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] will-change-transform"
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 scale-[0.85] rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 opacity-0 will-change-transform"
      >
        <span className="font-mono-tight text-[9px] tracking-[0.15em] text-[var(--color-accent)] uppercase">
          {label}
        </span>
      </div>
    </div>
  )
}
