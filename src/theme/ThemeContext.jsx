import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const ThemeContext = createContext(null)

const STORAGE_KEY = 'portfolio-theme'
const DARK = 'dark'
const LIGHT = 'light'

/**
 * Baca preferensi tema sistem. matchMedia bisa tidak tersedia (lingkungan uji
 * atau browser sangat lama) — dalam kasus itu kita jatuh ke tema gelap.
 */
function getSystemTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? LIGHT
      : DARK
  } catch {
    return DARK
  }
}

/**
 * Tema awal:
 * 1. Preferensi tersimpan milik pengunjung (localStorage), bila ada & valid.
 * 2. Jika belum ada → ikuti preferensi sistem.
 * Logika ini identik dengan skrip anti-flash di index.html agar tidak ada
 * kedipan tema saat aplikasi melakukan hidrasi.
 */
function getInitialTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === LIGHT || stored === DARK) return stored
  } catch {
    /* penyimpanan gagal (private mode, dsb.) — gunakan preferensi sistem */
  }
  return getSystemTheme()
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  // Terapkan tema ke <html> + <meta name="theme-color"> dan simpan preferensi.
  useEffect(() => {
    const root = document.documentElement
    const isLight = theme === LIGHT

    root.classList.toggle('light', isLight)
    root.dataset.theme = theme
    root.style.colorScheme = theme

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', isLight ? '#f8fafc' : '#0a0c14')

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* penyimpanan gagal — bukan masalah fatal */
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === LIGHT ? DARK : LIGHT))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isLight: theme === LIGHT,
      isDark: theme === DARK,
    }),
    [theme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Pola standar React Context: satu file berisi Provider + hook.
// oxlint-disable-next-line react/only-export-components -- hook memang harus diekspor dari file context
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme harus dipakai di dalam <ThemeProvider>')
  }
  return ctx
}
