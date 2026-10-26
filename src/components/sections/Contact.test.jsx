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

  it('menjelaskan bahwa tidak ada formulir kontak (tanpa simulasi pengiriman)', () => {
    renderContact()
    expect(screen.getByText(/belum memiliki formulir kontak/i)).toBeInTheDocument()
  })
})
