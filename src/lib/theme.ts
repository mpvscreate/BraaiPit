export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'braaipit_theme'

export function getTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {}
  return 'dark'
}

export function setTheme(theme: Theme) {
  try { localStorage.setItem(STORAGE_KEY, theme) } catch {}
  document.documentElement.setAttribute('data-theme', theme)
  const meta = document.querySelector('meta[name="color-scheme"]')
  if (meta) meta.setAttribute('content', theme)
}

export function initTheme() {
  const theme = getTheme()
  if (theme !== 'dark') {
    setTheme(theme)
  }
}
