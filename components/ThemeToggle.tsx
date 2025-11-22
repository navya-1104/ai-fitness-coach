'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react' // optional icon lib; if you don't have lucide-react you can remove icons

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  useEffect(() => {
    // Listen to system changes and apply only if user hasn't explicitly chosen
    const handler = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme')
      if (stored) return
      setTheme(e.matches ? 'dark' : 'light')
    }
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white/60 dark:bg-black/40 shadow-sm hover:scale-[1.02] transition-transform"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-yellow-400" />
          <span className="text-sm">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-slate-700" />
          <span className="text-sm">Dark</span>
        </>
      )}
    </button>
  )
}
