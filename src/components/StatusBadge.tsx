import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

export default function StatusBadge() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
        }),
      )
    }
    update()
    const id = setInterval(update, 1000 * 15)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="font-mono-tight pointer-events-none fixed bottom-6 left-6 z-40 hidden items-center gap-2 text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase sm:flex">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
      </span>
      {profile.location} · {time} IST
    </div>
  )
}
