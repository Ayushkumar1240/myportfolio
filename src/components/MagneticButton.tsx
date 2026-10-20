import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from 'react'
import gsap from 'gsap'

type MagneticButtonProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export default function MagneticButton<T extends ElementType = 'button'>({
  as,
  children,
  className = '',
  ...rest
}: MagneticButtonProps<T>) {
  const ref = useRef<HTMLElement>(null)
  const Tag = (as || 'button') as ElementType

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.5, ease: 'power3.out' })
  }

  const onMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor="link"
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
