import { useState } from 'react'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projects } from '../data/portfolio'

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const total = projects.length

  return (
    <section id="work" className="section-pad py-28">
      <SectionHeading index="03" eyebrow="Selected Work" title="Things I've shipped" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} onOpen={() => setActiveIndex(i)} />
        ))}
      </div>

      <ProjectModal
        project={activeIndex === null ? null : projects[activeIndex]}
        index={activeIndex ?? 0}
        total={total}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => (i === null ? 0 : (i - 1 + total) % total))}
        onNext={() => setActiveIndex((i) => (i === null ? 0 : (i + 1) % total))}
      />
    </section>
  )
}
