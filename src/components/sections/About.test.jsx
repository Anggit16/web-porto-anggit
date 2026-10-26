import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LanguageProvider } from '../../i18n/LanguageContext'

// Mock status hook agar setiap status dapat diuji tanpa jaringan.
vi.mock('../../hooks/useRemoteFileStatus', () => ({
  useRemoteFileStatus: vi.fn(),
}))

// Beri cvFile nyata agar status 'available' merender href yang benar.
vi.mock('../../data/site', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, cvFile: '/cv/anggit-hardiyanto.pdf' }
})

import { useRemoteFileStatus } from '../../hooks/useRemoteFileStatus'
import About from './About'

function renderAbout() {
  return render(
    <LanguageProvider>
      <About />
    </LanguageProvider>,
  )
}

describe('Section About — status unduhan CV', () => {
  it('menampilkan tombol unduh saat berkas tersedia', () => {
    useRemoteFileStatus.mockReturnValue('available')
    renderAbout()

    const link = screen.getByRole('link', { name: /Unduh CV/i })
    expect(link).toHaveAttribute('href', '/cv/anggit-hardiyanto.pdf')
    expect(link).toHaveAttribute('download')
    expect(screen.queryByText(/belum tersedia/i)).not.toBeInTheDocument()
  })

  it('menampilkan pesan belum tersedia saat idle (tanpa tombol)', () => {
    useRemoteFileStatus.mockReturnValue('idle')
    renderAbout()

    expect(screen.getByText(/File CV belum tersedia/i)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Unduh CV/i })).not.toBeInTheDocument()
  })

  it('menampilkan status pemeriksaan saat sedang dicek', () => {
    useRemoteFileStatus.mockReturnValue('checking')
    renderAbout()

    expect(screen.getByText(/Memeriksa ketersediaan/i)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Unduh CV/i })).not.toBeInTheDocument()
  })

  it('menampilkan pesan error jujur saat berkas hilang (bukan 404 diam-diam)', () => {
    useRemoteFileStatus.mockReturnValue('missing')
    renderAbout()

    expect(screen.getByText(/tidak dapat ditemukan di server/i)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Unduh CV/i })).not.toBeInTheDocument()
  })
})
