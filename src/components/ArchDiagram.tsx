import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Diagram, DiagramNode } from '../data/portfolio'
import { ease } from '../lib/motion'

const NODE_H = 20
const nodeWidth = (n: DiagramNode) => n.label.length * 5.6 + 16

function edgePath(a: DiagramNode, b: DiagramNode) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  if (Math.abs(dx) >= Math.abs(dy)) {
    const sx = a.x + Math.sign(dx) * (nodeWidth(a) / 2)
    const tx = b.x - Math.sign(dx) * (nodeWidth(b) / 2)
    const mx = (sx + tx) / 2
    return `M ${sx} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${tx} ${b.y}`
  }
  const sy = a.y + Math.sign(dy) * (NODE_H / 2)
  const ty = b.y - Math.sign(dy) * (NODE_H / 2)
  const my = (sy + ty) / 2
  return `M ${a.x} ${sy} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${ty}`
}

const KIND_STYLE: Record<DiagramNode['kind'], { fill: string; stroke: string; text: string; dash?: string; rx: number }> = {
  client: { fill: 'var(--color-surface-2)', stroke: 'color-mix(in srgb, var(--color-ink) 35%, transparent)', text: 'var(--color-ink)', rx: 3 },
  service: { fill: 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))', stroke: 'var(--color-accent)', text: 'var(--color-accent)', rx: 3 },
  data: { fill: 'var(--color-surface)', stroke: 'var(--color-muted)', text: 'var(--color-ink)', rx: 10 },
  external: { fill: 'transparent', stroke: 'var(--color-muted)', text: 'var(--color-muted)', dash: '3 3', rx: 3 },
}

export default function ArchDiagram({
  diagram,
  animated = false,
  interactive = false,
  className = '',
  title,
}: {
  diagram: Diagram
  animated?: boolean
  interactive?: boolean
  className?: string
  title: string
}) {
  const reduce = useReducedMotion()
  const [focus, setFocus] = useState<string | null>(null)

  const byId = useMemo(() => Object.fromEntries(diagram.nodes.map((n) => [n.id, n])), [diagram])
  const edges = useMemo(
    () =>
      diagram.edges
        .filter(([a, b]) => byId[a] && byId[b])
        .map(([a, b]) => ({ a, b, d: edgePath(byId[a], byId[b]) })),
    [diagram, byId],
  )

  const isLit = (a: string, b: string) => !focus || focus === a || focus === b

  return (
    <svg viewBox="0 0 400 240" className={className} role="img" aria-label={`Architecture sketch: ${title}`}>
      {edges.map((e, i) => (
        <g key={`${e.a}-${e.b}`}>
          <motion.path
            d={e.d}
            fill="none"
            stroke={focus && isLit(e.a, e.b) ? 'var(--color-accent)' : 'var(--color-line)'}
            strokeWidth={focus && isLit(e.a, e.b) ? 1.4 : 1}
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: ease.out }}
            style={{ opacity: isLit(e.a, e.b) ? 1 : 0.25, transition: 'opacity .3s, stroke .3s' }}
          />
          {animated && !reduce && isLit(e.a, e.b) && (
            <circle r="2" fill="var(--color-accent)">
              <animateMotion dur={`${1.8 + (i % 3) * 0.4}s`} begin={`-${(i * 0.27) % 1.6}s`} repeatCount="indefinite" path={e.d} />
            </circle>
          )}
        </g>
      ))}

      {diagram.nodes.map((n, i) => {
        const w = nodeWidth(n)
        const s = KIND_STYLE[n.kind]
        const dim = focus && focus !== n.id && !diagram.edges.some(([a, b]) => (a === focus && b === n.id) || (b === focus && a === n.id))
        return (
          <motion.g
            key={n.id}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: ease.out }}
            style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: interactive ? 'pointer' : undefined }}
            onMouseEnter={interactive ? () => setFocus(n.id) : undefined}
            onMouseLeave={interactive ? () => setFocus(null) : undefined}
            onClick={interactive ? () => setFocus((f) => (f === n.id ? null : n.id)) : undefined}
          >
            <g style={{ opacity: dim ? 0.3 : 1, transition: 'opacity .3s' }}>
            <rect
              x={n.x - w / 2}
              y={n.y - NODE_H / 2}
              width={w}
              height={NODE_H}
              rx={s.rx}
              fill={s.fill}
              stroke={focus === n.id ? 'var(--color-accent)' : s.stroke}
              strokeDasharray={s.dash}
              strokeWidth={1}
            />
            <text
              x={n.x}
              y={n.y + 3.2}
              textAnchor="middle"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill={s.text}
              style={{ letterSpacing: '-0.02em', pointerEvents: 'none' }}
            >
              {n.label}
            </text>
            </g>
          </motion.g>
        )
      })}
    </svg>
  )
}

export function DiagramLegend() {
  const items: [DiagramNode['kind'], string][] = [
    ['client', 'Client'],
    ['service', 'Service'],
    ['data', 'Data store'],
    ['external', 'Third-party'],
  ]
  return (
    <div className="font-mono-tight flex flex-wrap gap-x-4 gap-y-2 text-[10px] tracking-wide text-[var(--color-muted)] uppercase">
      {items.map(([k, l]) => {
        const s = KIND_STYLE[k]
        return (
          <span key={k} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-4"
              style={{ background: s.fill, border: `1px ${s.dash ? 'dashed' : 'solid'} ${s.stroke}`, borderRadius: s.rx > 5 ? 999 : 2 }}
            />
            {l}
          </span>
        )
      })}
    </div>
  )
}
