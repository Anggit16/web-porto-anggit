import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../../App'

/**
 * Uji navigasi: navbar, menu mobile, target section, dan toggle bahasa.
 */
describe('Navigasi', () => {
  it('merender navigasi desktop dengan semua tautan section', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: /Navigasi utama/i })
    for (const label of ['Beranda', 'Tentang', 'Keahlian', 'Proyek', 'Pendidikan & Pengalaman', 'Kontak']) {
      expect(within(nav).getByRole('button', { name: label })).toBeInTheDocument()
    }
  })

  it('menggulir ke section yang benar saat tautan diklik', async () => {
    const user = userEvent.setup()
    render(<App />)
    const nav = screen.getByRole('navigation', { name: /Navigasi utama/i })
    await user.click(within(nav).getByRole('button', { name: 'Proyek' }))
    // scrollIntoView dipanggil (di-mock di setup)
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })

  it('membuka dan menutup menu mobile via tombol hamburger', async () => {
    const user = userEvent.setup()
    render(<App />)

    const openBtn = screen.getByRole('button', { name: /Buka menu navigasi/i })
    expect(openBtn).toHaveAttribute('aria-expanded', 'false')

    await user.click(openBtn)
    // Tombol kini berubah jadi "tutup"
    const closeBtn = screen.getByRole('button', { name: /Tutup menu navigasi/i })
    expect(closeBtn).toHaveAttribute('aria-expanded', 'true')

    await user.click(closeBtn)
    expect(screen.getByRole('button', { name: /Buka menu navigasi/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('menutup menu mobile setelah memilih navigasi', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Buka menu navigasi/i }))
    // Scope ke menu mobile (desktop nav juga punya tombol "Kontak")
    const mobileMenu = document.getElementById('mobile-menu')
    await user.click(within(mobileMenu).getByRole('button', { name: 'Kontak' }))
    // aria-expanded kembali false → menu tertutup
    expect(screen.getByRole('button', { name: /Buka menu navigasi/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('menutup menu mobile dengan Escape', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Buka menu navigasi/i }))
    expect(screen.getByRole('button', { name: /Tutup menu navigasi/i })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: /Buka menu navigasi/i })).toBeInTheDocument()
  })

  it('memperbarui label navigasi saat bahasa diganti', async () => {
    const user = userEvent.setup()
    render(<App />)
    const nav = screen.getByRole('navigation', { name: /Navigasi utama/i })
    expect(within(nav).getByRole('button', { name: 'Proyek' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'English' }))
    expect(within(nav).getByRole('button', { name: 'Projects' })).toBeInTheDocument()
    expect(within(nav).getByRole('button', { name: 'Contact' })).toBeInTheDocument()
  })

  it('menampilkan footer dengan tahun berjalan dinamis', () => {
    render(<App />)
    const year = new Date().getFullYear().toString()
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByText((content) => content.includes(year))).toBeInTheDocument()
  })
})
