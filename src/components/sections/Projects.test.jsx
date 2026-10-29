import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { LanguageProvider } from '../../i18n/LanguageContext'
import App from '../../App'
import Projects from './Projects'
import { projects } from '../../data/projects'

/** Render Projects terisolasi (tanpa Navbar) untuk uji filter/modal murni. */
function renderProjects() {
  return render(
    <LanguageProvider>
      <Projects />
    </LanguageProvider>,
  )
}

/** Render App penuh saat uji butuh tombol ganti bahasa (ada di Navbar). */
function renderApp() {
  return render(<App />)
}

describe('Section Projects — filter, empty state, modal', () => {
  it('menampilkan semua proyek pada filter default (Semua)', () => {
    renderProjects()
    for (const p of projects) {
      expect(screen.getByText(p.name)).toBeInTheDocument()
    }
  })

  it('memfilter proyek berdasarkan kategori', async () => {
    const user = userEvent.setup()
    renderProjects()

    await user.click(screen.getByRole('button', { name: 'Website' }))
    expect(screen.getByText('Website SudutJalan Kopi')).toBeInTheDocument()
    expect(screen.queryByText('Point of Sale')).not.toBeInTheDocument()
  })

  it('menandai filter aktif dengan aria-pressed', async () => {
    const user = userEvent.setup()
    renderProjects()
    const allBtn = screen.getByRole('button', { name: 'Semua' })
    expect(allBtn).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'Aplikasi Web' }))
    expect(allBtn).toHaveAttribute('aria-pressed', 'false')
  })

  it('menampilkan empty state untuk kategori tanpa proyek (Aplikasi Desktop)', async () => {
    const user = userEvent.setup()
    renderProjects()

    await user.click(screen.getByRole('button', { name: 'Aplikasi Desktop' }))
    expect(screen.getByText(/Tidak ada proyek pada kategori ini/i)).toBeInTheDocument()
    expect(screen.queryByText('Computer Based Test')).not.toBeInTheDocument()
  })

  it('empty state menyediakan aksi pulih "tampilkan semua proyek"', async () => {
    const user = userEvent.setup()
    renderProjects()

    await user.click(screen.getByRole('button', { name: 'Aplikasi Desktop' }))
    expect(screen.getByText(/Tidak ada proyek pada kategori ini/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Tampilkan semua proyek' }))
    expect(screen.getByText('Computer Based Test')).toBeInTheDocument()
    expect(screen.queryByText(/Tidak ada proyek pada kategori ini/i)).not.toBeInTheDocument()
  })

  it('menerjemahkan empty state ke English', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: 'English' }))
    await user.click(screen.getByRole('button', { name: 'Desktop Application' }))
    expect(screen.getByText(/No projects in this category/i)).toBeInTheDocument()
  })

  it('membuka modal detail proyek dengan label terjemahan', async () => {
    const user = userEvent.setup()
    renderProjects()

    const card = screen.getByText('Computer Based Test').closest('article')
    await user.click(within(card).getByRole('button', { name: /Lihat Detail/i }))

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByText('Detail Proyek')).toBeInTheDocument()
    expect(within(dialog).getByText('Deskripsi')).toBeInTheDocument()
    expect(within(dialog).getByText('Tantangan')).toBeInTheDocument()
    expect(within(dialog).getByText('Teknologi')).toBeInTheDocument()
  })

  it('proyek terisi menampilkan detail bilingual, tautan, tanpa placeholder', async () => {
    const user = userEvent.setup()
    renderProjects()

    const cbt = projects.find((p) => p.id === 'computer-based-test')
    const card = screen.getByText('Computer Based Test').closest('article')
    await user.click(within(card).getByRole('button', { name: /Lihat Detail/i }))

    const dialog = screen.getByRole('dialog')
    // Bahasa aktif default = Indonesia → nilai `id` yang tampil
    expect(within(dialog).getByText(cbt.details.challenge.id)).toBeInTheDocument()
    // Data lengkap → tidak ada lagi placeholder maupun catatan status
    expect(within(dialog).queryByText(/akan dilengkapi/i)).not.toBeInTheDocument()
    expect(within(dialog).queryByText(/masih berupa placeholder/i)).not.toBeInTheDocument()
    // URL valid dari data → tombol GitHub tertuju persis ke repo asli
    expect(within(dialog).getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', cbt.github)
  })

  it('menutup modal dengan tombol tutup', async () => {
    const user = userEvent.setup()
    renderProjects()
    const card = screen.getByText('Computer Based Test').closest('article')
    await user.click(within(card).getByRole('button', { name: /Lihat Detail/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Tutup detail proyek/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('menutup modal dengan tombol Escape', async () => {
    const user = userEvent.setup()
    renderProjects()
    const card = screen.getByText('Computer Based Test').closest('article')
    await user.click(within(card).getByRole('button', { name: /Lihat Detail/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('mempertahankan modal terbuka saat bahasa diganti (via App)', async () => {
    const user = userEvent.setup()
    renderApp()

    const card = screen.getByText('Computer Based Test').closest('article')
    await user.click(within(card).getByRole('button', { name: /Lihat Detail/i }))

    await user.click(screen.getByRole('button', { name: 'English' }))
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByText('Project Details')).toBeInTheDocument()
    expect(within(dialog).getByText('Technologies')).toBeInTheDocument()
  })
})
