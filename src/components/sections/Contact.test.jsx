import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LanguageProvider } from '../../i18n/LanguageContext'

// Konfigurasi satu kanal valid (email), satu valid (github), satu kosong (linkedin).
vi.mock('../../data/site', () => ({
  contactInfo: { email: 'anggit@example.com', location: null },
  socialLinks: { github: 'https://github.com/anggit', linkedin: null },
}))

import Contact from './Contact'

function renderContact() {
  return render(
    <LanguageProvider>
      <Contact />
    </LanguageProvider>,
  )
}

describe('Section Contact — kanal tautan', () => {
  it('merender email & github sebagai tautan valid', () => {
    renderContact()

    const email = screen.getByRole('link', { name: 'anggit@example.com' })
    expect(email).toHaveAttribute('href', 'mailto:anggit@example.com')

    const github = screen.getByRole('link', { name: 'https://github.com/anggit' })
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('menandai kanal tanpa nilai sebagai belum tersedia, bukan tautan rusak', () => {
    renderContact()

    expect(screen.getByText('Belum tersedia')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /linkedin/i })).not.toBeInTheDocument()
  })

  it('tidak lagi menampilkan catatan teknis formulir kontak', () => {
    renderContact()
    expect(screen.queryByText(/formulir kontak/i)).not.toBeInTheDocument()
  })

  it('menautkan CTA kolaborasi langsung ke email dengan subjek terisi', () => {
    renderContact()

    const cta = screen.getByRole('link', { name: /kirim email/i })
    expect(cta.getAttribute('href')).toMatch(/^mailto:anggit@example\.com\?subject=/)
    // mailto dibuka di aplikasi email, bukan tab baru
    expect(cta).not.toHaveAttribute('target')
  })

  it('menyediakan alternatif "Buka di Gmail" untuk alamat yang sama', () => {
    renderContact()

    const gmail = screen.getByRole('link', { name: /buka di gmail/i })
    const href = gmail.getAttribute('href')
    expect(href).toContain('https://mail.google.com/mail/?view=cm&fs=1&to=anggit%40example.com')
    expect(href).toMatch(/&su=/)
    // Gmail dibuka di tab baru → wajib rel aman
    expect(gmail).toHaveAttribute('target', '_blank')
    expect(gmail).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
