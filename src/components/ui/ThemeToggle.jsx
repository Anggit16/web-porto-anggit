import { Moon, Sun } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useTheme } from '../../theme/ThemeContext'

/**
 * Tombol ganti tema terang/gelap.
 * Nama aksesibel menjelaskan AKSI yang akan terjadi (bukan sekadar status),
 * sehingga jelas dibacakan screen reader.
 */
export default function ThemeToggle() {
  const { t } = useLanguage()
  const { isLight, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? t('a11y.themeToDark') : t('a11y.themeToLight')}
      title={isLight ? t('a11y.themeToDark') : t('a11y.themeToLight')}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong text-fg-subtle transition-colors duration-200 hover:border-accent-text hover:text-accent-text"
    >
      {isLight ? (
        <Moon size={17} aria-hidden="true" />
      ) : (
        <Sun size={17} aria-hidden="true" />
      )}
    </button>
  )
}
