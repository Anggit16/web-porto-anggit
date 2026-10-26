import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'portfolio-language'
const SUPPORTED = ['id', 'en']
const DEFAULT_LANGUAGE = 'id'

/**
 * Baca bahasa tersimpan dari localStorage dengan aman.
 * localStorage bisa gagal (private mode, storage penuh, disabled) —
 * dalam kasus itu kita jatuh ke bahasa default.
 */
function getInitialLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED.includes(stored)) return stored
  } catch {
    /* abaikan — gunakan default */
  }
  return DEFAULT_LANGUAGE
}

/** Ambil nilai dari objek terjemahan berdasarkan path, contoh: "nav.about". */
function lookup(lang, keyPath) {
  return keyPath
    .split('.')
    .reduce((node, part) => (node == null ? undefined : node[part]), translations[lang])
}

/** Interpolasi sederhana: "Ikon teknologi {{name}}" + {name: 'React'} */
function interpolate(template, vars) {
  if (typeof template !== 'string' || !vars) return template
  return template.replace(/\{\{(\w+)\}\}/g, (match, name) =>
    vars[name] != null ? String(vars[name]) : match,
  )
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  // Sinkronkan atribut <html lang> dan simpan preferensi.
  useEffect(() => {
    document.documentElement.lang = language
    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      /* penyimpanan gagal — bukan masalah fatal */
    }
  }, [language])

  /**
   * Fungsi terjemahan.
   * - `t('nav.about')` → teks dari bahasa aktif
   * - `t('nav.about')` dengan fallback otomatis ke `id` jika kunci hilang
   * - `t(project.summary)` juga menerima objek bilingual { id, en }
   * - `t('...', { name: 'React' })` → interpolasi {{name}}
   */
  const t = useCallback(
    (key, vars) => {
      let value
      if (key && typeof key === 'object' && !Array.isArray(key)) {
        value = key[language] ?? key[DEFAULT_LANGUAGE]
      } else if (typeof key === 'string') {
        value = lookup(language, key) ?? lookup(DEFAULT_LANGUAGE, key)
      }
      if (value == null) {
        if (import.meta.env.DEV) {
          console.warn(`[i18n] Kunci terjemahan tidak ditemukan:`, key)
        }
        return ''
      }
      return interpolate(value, vars)
    },
    [language],
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      isId: language === 'id',
      isEn: language === 'en',
      t,
    }),
    [language, t],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

// Pola standar React Context: satu file berisi Provider + hook.
// oxlint-disable-next-line react/only-export-components -- hook memang harus diekspor dari file context
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage harus dipakai di dalam <LanguageProvider>')
  }
  return ctx
}
