import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      const stored = localStorage.getItem('pfa-theme')
      if (stored) return stored === 'dark'
    } catch {
      /* ignore */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', dark)
    try {
      localStorage.setItem('pfa-theme', dark ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }, [dark])

  return [dark, setDark]
}
