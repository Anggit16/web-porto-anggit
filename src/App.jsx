import { useLanguage } from './i18n/LanguageContext'
import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './theme/ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Reveal from './components/ui/Reveal'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'

function SkipLink() {
  const { t } = useLanguage()
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-lg focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-white"
    >
      {t('a11y.skipToContent')}
    </a>
  )
}

/**
 * Latar dekoratif global: orb aksen yang dilembutkan (blur) mengikuti tema.
 * Murni dekoratif → aria-hidden, tidak menangkap klik.
 */
function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="animate-float absolute -top-40 left-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent-600/15 blur-[130px]" />
      <div className="absolute top-1/3 -right-40 h-[26rem] w-[26rem] rounded-full bg-accent-500/15 blur-[130px]" />
      <div className="absolute bottom-0 -left-40 h-[24rem] w-[24rem] rounded-full bg-accent-600/10 blur-[130px]" />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BackgroundDecor />
        <SkipLink />

        <Navbar />

        {/* tabIndex -1 agar skip link memindahkan fokus ke konten utama */}
        <main id="main-content" tabIndex={-1} className="outline-hidden">
          <Hero />
          <div className="divide-y divide-border">
            <Reveal>
              <About />
            </Reveal>
            <Reveal>
              <Skills />
            </Reveal>
            <Reveal>
              <Projects />
            </Reveal>
            <Reveal>
              <Experience />
            </Reveal>
            <Reveal>
              <Contact />
            </Reveal>
          </div>
        </main>

        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}
