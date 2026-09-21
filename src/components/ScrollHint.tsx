import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="font-mono-tight pointer-events-none absolute right-8 bottom-6 z-10 hidden flex-col items-center gap-3 text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase sm:flex"
        >
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-9 w-5 items-start justify-center rounded-full border border-[var(--color-line)] p-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
