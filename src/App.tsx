import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import GiantMarquee from './components/GiantMarquee'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
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
    <div className="grain">
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
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
