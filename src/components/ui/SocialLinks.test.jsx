import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SocialLinks from './SocialLinks'

describe('SocialLinks — hanya tautan valid yang dirender', () => {
  it('tidak merender apa pun bila semua kanal kosong', () => {
    const { container } = render(
      <SocialLinks links={{ github: null, linkedin: null, email: null }} />,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('menyembunyikan nilai tidak valid dan hanya menampilkan yang valid', () => {
    render(
      <SocialLinks
        links={{
          github: 'https://github.com/anggit',
          linkedin: 'bukan-url',
          email: 'anggit@example.com',
        }}
      />,
    )

    const github = screen.getByRole('link', { name: 'GitHub' })
    expect(github).toHaveAttribute('href', 'https://github.com/anggit')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')

    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:anggit@example.com',
    )

    // linkedin tidak valid → tidak dirender (bukan tautan dummy)
    expect(screen.queryByRole('link', { name: 'LinkedIn' })).not.toBeInTheDocument()
  })
})
