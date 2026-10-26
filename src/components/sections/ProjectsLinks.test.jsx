import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LanguageProvider } from '../../i18n/LanguageContext'

// Proyek dengan github TIDAK valid dan demo valid:
// hanya tombol demo yang boleh dirender (URL rusak disembunyikan).
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
      details: { challenge: 'c', solution: 's', role: 'r', result: 'r' },
    },
  ],
  projectCategories: ['web-app'],
}))

import Projects from './Projects'

describe('Projects — validasi tautan pada modal detail', () => {
  it('menyembunyikan URL tidak valid dan menampilkan yang valid', async () => {
    const user = userEvent.setup()
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>,
    )

    await user.click(screen.getByRole('button', { name: /Lihat Detail/i }))
    const dialog = screen.getByRole('dialog')

    const demo = within(dialog).getByRole('link', { name: /Live Demo/i })
    expect(demo).toHaveAttribute('href', 'https://example.com/demo')
    expect(demo).toHaveAttribute('rel', 'noopener noreferrer')

    expect(within(dialog).queryByRole('link', { name: /GitHub/i })).not.toBeInTheDocument()
  })
})
