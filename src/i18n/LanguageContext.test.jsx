import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'

/**
 * Uji sistem bilingual end-to-end pada App:
 * - Bahasa default = Indonesia
 * - Toggle ID/EN memperbarui seluruh section
 * - Perubahan bahasa TIDAK menghilangkan state penting (filter proyek)
 * - Preferensi tersimpan di localStorage & <html lang> sinkron
 *
 * Nama aksesibel tombol bahasa: "Bahasa Indonesia" dan "English".
 */
const switchLang = async (user, label) => {
  await user.click(screen.getByRole('button', { name: label }))
}

describe('Sistem bahasa ID/EN', () => {
  it('memakai Bahasa Indonesia sebagai default', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Anggit Hardiyanto')
    expect(screen.getByText('Lihat Proyek')).toBeInTheDocument()
    expect(screen.getByText('Proyek Unggulan')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('id')
  })

  it('berpindah ke English dan memperbarui seluruh section', async () => {
    const user = userEvent.setup()
    render(<App />)

    await switchLang(user, 'English')

    expect(screen.getByText('View Projects')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Skills & Technologies' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Education & Experience' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Let's Connect" })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    // teks Indonesia tidak boleh tersisa di section
    expect(screen.queryByText('Proyek Unggulan')).not.toBeInTheDocument()
  })

  it('kembali ke Indonesia setelah toggle kedua', async () => {
    const user = userEvent.setup()
    render(<App />)

    await switchLang(user, 'English')
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()

    await switchLang(user, 'Bahasa Indonesia')
    expect(screen.getByText('Proyek Unggulan')).toBeInTheDocument()
    expect(screen.queryByText('Featured Projects')).not.toBeInTheDocument()
  })

  it('mempertahankan state filter proyek saat bahasa diganti', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Pilih filter "Website"
    await user.click(screen.getByRole('button', { name: 'Website' }))
    expect(screen.getByText('Website SudutJalan Kopi')).toBeInTheDocument()
    expect(screen.queryByText('Computer Based Test')).not.toBeInTheDocument()

    // Ganti ke English — filter harus tetap "Website"
    await switchLang(user, 'English')
    const websiteFilter = screen.getByRole('button', { name: 'Website' })
    expect(websiteFilter).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Website SudutJalan Kopi')).toBeInTheDocument()
    expect(screen.queryByText('Computer Based Test')).not.toBeInTheDocument()
  })

  it('menyimpan pilihan bahasa ke localStorage', async () => {
    const user = userEvent.setup()
    render(<App />)
    await switchLang(user, 'English')
    expect(window.localStorage.getItem('portfolio-language')).toBe('en')
  })

  it('memuat bahasa tersimpan dari localStorage', () => {
    window.localStorage.setItem('portfolio-language', 'en')
    render(<App />)
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
  })
})
