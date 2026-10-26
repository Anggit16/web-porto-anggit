import { afterEach, describe, expect, it, vi } from 'vitest'
import { scrollToSection, scrollToTop } from './scroll'

describe('scrollToSection', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('menggulir dan mengembalikan true bila section ditemukan', () => {
    const el = document.createElement('section')
    el.id = 'about'
    document.body.appendChild(el)
    const scrollIntoView = vi.fn()
    el.scrollIntoView = scrollIntoView

    expect(scrollToSection('about')).toBe(true)
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })

  it('mengembalikan false dan memperingatkan (bukan gagal diam-diam) bila section tidak ada', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(scrollToSection('section-tidak-ada')).toBe(false)
    expect(warn).toHaveBeenCalled()

    warn.mockRestore()
  })
})

describe('scrollToTop', () => {
  it('memanggil window.scrollTo ke posisi atas', () => {
    const scrollTo = vi.fn()
    const original = window.scrollTo
    window.scrollTo = scrollTo

    scrollToTop()
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }))

    window.scrollTo = original
  })
})
