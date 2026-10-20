import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import GiantMarquee from './components/GiantMarquee'
import About from './components/About'
import Principles from './components/Principles'
import Experience from './components/Experience'
import Projects from './components/Projects'
import EngineeringNotes from './components/EngineeringNotes'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import SectionDots from './components/SectionDots'
import StatusBadge from './components/StatusBadge'
import { useLenis } from './hooks/useLenis'

export default function App() {
  const [loading, setLoading] = useState(true)

  useLenis()

  useEffect(() => {
    console.log(
      '%c Hey, fellow developer. ',
      'background:#ffb454;color:#08090a;font-weight:700;padding:4px 8px;border-radius:4px;',
    )
    console.log(
      '%cLooking at the source instead of the site — respect. ayush.kumar.devmail@gmail.com if you want to talk shop.',
      'color:#8b8d92;font-family:monospace;',
    )
  }, [])

  return (
    <MotionConfig reducedMotion="user">
    <div className="grain">
      <a
        href="#work"
        className="font-mono-tight fixed top-3 left-3 z-[400] -translate-y-20 rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs text-[var(--color-on-accent)] uppercase focus:translate-y-0"
      >
        Skip to work
      </a>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Cursor />
      <ScrollProgress />
      <SectionDots />
      <StatusBadge />
      <Nav />
      <main>
        <Hero />
        <GiantMarquee />
        <About />
        <Principles />
        <Experience />
        <Projects />
        <EngineeringNotes />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
    </MotionConfig>
  )
}
