import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const rowA = ['BACKEND ENGINEER', 'SYSTEM DESIGN', 'MICROSERVICES']
const rowB = ['NODE.JS · TYPESCRIPT', 'PAYMENTS AT SCALE', 'AWS · DOCKER']

export default function GiantMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const rowARef = useRef<HTMLDivElement>(null)
  const rowBRef = useRef<HTMLDivElement>(null)
  const skewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(rowARef.current, { xPercent: -50, duration: 34, ease: 'none', repeat: -1 })
      gsap.to(rowBRef.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })

      const proxy = { skew: 0 }
      const clampVal = gsap.utils.clamp(-8, 8)

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const skew = clampVal(self.getVelocity() / -300)
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: 'power3.out',
              overwrite: true,
              onUpdate: () => {
                gsap.set(skewRef.current, { skewY: proxy.skew })
              },
            })
          }
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  const loopA = [...rowA, ...rowA]
  const loopB = [...rowB, ...rowB]

  return (
    <div ref={wrapRef} className="overflow-hidden border-y border-[var(--color-line)] py-10">
      <div ref={skewRef} className="flex flex-col gap-2">
        <div className="overflow-hidden">
          <div ref={rowARef} className="flex w-max">
            {loopA.map((item, i) => (
              <span
                key={i}
                className="font-display text-outline mr-10 flex items-center gap-10 text-[clamp(2.5rem,9vw,7rem)] leading-none font-medium whitespace-nowrap"
              >
                {item}
                <span className="text-[var(--color-line)]">/</span>
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={rowBRef} className="flex w-max">
            {loopB.map((item, i) => (
              <span
                key={i}
                className="font-display mr-10 flex items-center gap-10 text-[clamp(2.5rem,9vw,7rem)] leading-none font-medium whitespace-nowrap text-[var(--color-accent)]"
              >
                {item}
                <span className="text-[var(--color-ink)]/20">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
