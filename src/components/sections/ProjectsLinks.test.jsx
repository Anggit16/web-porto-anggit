import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LanguageProvider } from '../../i18n/LanguageContext'

// Dua proyek mock untuk menguji perilaku modal:
// - 'proyek-uji'    : github TIDAK valid + demo valid → hanya tombol demo dirender
// - 'proyek-kosong' : semua field kosong → placeholder & pesan tautan jujur
vi.mock('../../data/projects', () => ({
  projects: [
    {
      id: 'proyek-uji',
      name: 'Proyek Uji',
      category: 'web-app',
      image: null,
      description: { id: 'Deskripsi uji.', en: 'Test description.' },
      technologies: ['React.js'],
      github: 'javascript:alert(1)',
      demo: 'https://example.com/demo',
      details: {
        challenge: { id: 'c', en: 'c' },
        solution: { id: 's', en: 's' },
        role: { id: 'r', en: 'r' },
        result: { id: 'r', en: 'r' },
      },
    },
    {
      id: 'proyek-kosong',
      name: 'Proyek Kosong',
      category: 'web-app',
      image: null,
      description: { id: 'Deskripsi kosong.', en: 'Empty description.' },
      technologies: [],
      github: null,
      demo: null,
      details: { challenge: null, solution: null, role: null, result: null },
    },
  ],
  projectCategories: ['web-app'],
}))

import Projects from './Projects'

function renderProjects() {
  return render(
    <LanguageProvider>
      <Projects />
    </LanguageProvider>,
  )
}

describe('Projects — modal detail: tautan & placeholder', () => {
  it('menyembunyikan URL tidak valid dan menampilkan yang valid', async () => {
    const user = userEvent.setup()
    renderProjects()

    const card = screen.getByText('Proyek Uji').closest('article')
    await user.click(within(card).getByRole('button', { name: /Lihat Detail/i }))
    const dialog = screen.getByRole('dialog')

    const demo = within(dialog).getByRole('link', { name: /Live Demo/i })
    expect(demo).toHaveAttribute('href', 'https://example.com/demo')
    expect(demo).toHaveAttribute('rel', 'noopener noreferrer')

    expect(within(dialog).queryByRole('link', { name: /GitHub/i })).not.toBeInTheDocument()
  })

  it('menampilkan placeholder jujur untuk proyek yang belum terisi', async () => {
    const user = userEvent.setup()
    renderProjects()

    const card = screen.getByText('Proyek Kosong').closest('article')
    await user.click(within(card).getByRole('button', { name: /Lihat Detail/i }))

    const dialog = screen.getByRole('dialog')
    // Empat detail null + teknologi kosong → placeholder jujur
    expect(within(dialog).getAllByText(/akan dilengkapi/i).length).toBeGreaterThan(0)
    // Catatan status hanya muncul bila masih ada detail yang null
    expect(within(dialog).getByText(/masih berupa placeholder/i)).toBeInTheDocument()
    // Tanpa tautan valid → pesan jujur, bukan tombol rusak
    expect(within(dialog).getByText(/Tautan repository atau demo belum tersedia/i)).toBeInTheDocument()
  })
})
