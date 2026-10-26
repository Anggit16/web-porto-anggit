import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'

/**
 * Uji sistem tema terang/gelap pada App:
 * - Default = gelap (matchMedia stub mengembalikan prefers-color-scheme: dark)
 * - Toggle menambah class `light` di <html> dan menyimpan preferensi
 * - Preferensi tersimpan dimuat kembali saat render ulang
 * - Label tombol tema ikut bahasa aktif (ID/EN)
 */
describe('Mode terang / gelap', () => {
  it('default ke tema gelap saat tidak ada preferensi tersimpan', () => {
    render(<App />)
    expect(document.documentElement.classList.contains('light')).toBe(false)
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('beralih ke mode terang, menyimpan preferensi, dan kembali lagi', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Aktifkan mode terang' }))
    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(window.localStorage.getItem('portfolio-theme')).toBe('light')

    await user.click(screen.getByRole('button', { name: 'Aktifkan mode gelap' }))
    expect(document.documentElement.classList.contains('light')).toBe(false)
    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark')
  })

  it('memuat preferensi tema tersimpan dari localStorage', () => {
    window.localStorage.setItem('portfolio-theme', 'light')
    render(<App />)
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('label tombol tema mengikuti bahasa aktif', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'English' }))
    expect(
      screen.getByRole('button', { name: 'Switch to light mode' }),
    ).toBeInTheDocument()
  })
})