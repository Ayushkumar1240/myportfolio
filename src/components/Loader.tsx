import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const counter = { val: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(contentRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
        gsap.to(leftRef.current, {
          xPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          delay: 0.2,
        })
        gsap.to(rightRef.current, {
          xPercent: 100,
          duration: 1,
          ease: 'power4.inOut',
          delay: 0.2,
          onComplete: onDone,
        })
      },
    })
    tl.to(counter, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.floor(counter.val)),
    })
    gsap.to(barRef.current, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' })
    return () => {
      tl.kill()
    }
  }, [onDone])

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[200]">
      <div ref={leftRef} className="absolute inset-y-0 left-0 w-1/2 bg-[var(--color-bg)]" />
      <div ref={rightRef} className="absolute inset-y-0 right-0 w-1/2 bg-[var(--color-bg)]" />

      <div
        ref={contentRef}
        className="relative flex h-full flex-col items-center justify-center"
      >
        <div className="font-mono-tight mb-6 flex items-center gap-3 text-xs tracking-[0.3em] text-[var(--color-muted)] uppercase">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-[var(--color-accent)]" />
          Loading portfolio
        </div>
        <div className="font-display text-[clamp(3rem,12vw,7rem)] leading-none text-[var(--color-ink)] tabular-nums">
          {progress}%
        </div>
        <div className="mt-8 h-px w-48 overflow-hidden bg-[var(--color-line)]">
          <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-[var(--color-accent)]" />
        </div>
      </div>
    </div>
  )
}
