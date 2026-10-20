import { useEffect, useState } from 'react'

export function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState(hrefs[0] ?? '')
  const key = hrefs.join('|')

  useEffect(() => {
    const els = key
      .split('|')
      .map((h) => document.getElementById(h.slice(1)))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
