import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Marquee from './Marquee'
import { skillGroups } from '../data/portfolio'

export default function Skills() {
  return (
    <section id="skills" className="py-28">
      <div className="section-pad">
        <SectionHeading index="04" eyebrow="Toolbox" title="What I build with" />
      </div>

      <div className="mb-16">
        <Marquee />
      </div>

      <div className="section-pad grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: (gi % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-mono-tight mb-4 text-xs tracking-[0.2em] text-[var(--color-accent)] uppercase">
              {group.label}
            </div>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
