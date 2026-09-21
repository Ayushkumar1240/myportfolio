import { useRef, useState, type ElementType } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

export default function ScrambleText({
  text,
  as: Tag = 'span',
  className = '',
  trigger = 'hover',
}: {
  text: string
  as?: ElementType
  className?: string
  trigger?: 'hover' | 'mount'
}) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const rafId = useRef<number | undefined>(undefined)

  const scramble = () => {
    cancelAnimationFrame(rafId.current!)
    frame.current = 0
    const totalFrames = text.length * 3

    const tick = () => {
      frame.current++
      const revealCount = Math.floor((frame.current / totalFrames) * text.length)
      const next = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < revealCount) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')
      setDisplay(next)
      if (frame.current < totalFrames) {
        rafId.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    rafId.current = requestAnimationFrame(tick)
  }

  const handlers =
    trigger === 'hover'
      ? { onMouseEnter: scramble }
      : {}

  return (
    <Tag className={className} {...handlers}>
      {display}
    </Tag>
  )
}
