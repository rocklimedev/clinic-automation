import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export function Toast({ message, onDone, duration = 2600 }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => onDone?.(), duration)
    return () => clearTimeout(t)
  }, [message, duration, onDone])

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[100] -translate-x-1/2">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--fg))] px-4 py-2.5 text-sm font-medium text-[rgb(var(--bg))] shadow-soft-lg"
          >
            <CheckCircle2 className="h-4 w-4 text-brand-400" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
