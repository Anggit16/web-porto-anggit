import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LOADER_FADE_MS, MIN_LOADER_MS, hideAppLoader } from './appLoader'

/** Siapkan kondisi awal: splash ada & <html> masih terkunci scroll-nya. */
function pasangSplash() {
  document.documentElement.className = 'app-loading'
  document.body.innerHTML = '<div id="app-loader"></div>'
  return document.getElementById('app-loader')
}

describe('hideAppLoader', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Tanpa nilai ini, util menganggap splash sudah tampil cukup lama.
    delete window.__appLoaderShownAt
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
    document.documentElement.className = ''
    delete window.__appLoaderShownAt
  })

  it('menandai splash selesai, melepas kunci scroll, lalu menghapus elemennya', () => {
    const loader = pasangSplash()

    expect(hideAppLoader()).toBe(true)
    expect(loader.classList.contains('is-done')).toBe(true)
    expect(document.documentElement.classList.contains('app-loading')).toBe(false)

    vi.advanceTimersByTime(LOADER_FADE_MS)
    expect(document.getElementById('app-loader')).toBeNull()
  })

  it('menghormati durasi tampil minimum saat splash baru saja muncul', () => {
    pasangSplash()
    window.__appLoaderShownAt = performance.now()

    hideAppLoader()
    vi.advanceTimersByTime(MIN_LOADER_MS - 100)
    expect(document.getElementById('app-loader')).not.toBeNull()
    expect(document.getElementById('app-loader').classList.contains('is-done')).toBe(false)

    vi.advanceTimersByTime(200)
    expect(document.getElementById('app-loader').classList.contains('is-done')).toBe(true)
  })

  it('tidak error bila splash tidak ada (mis. dirender tanpa index.html)', () => {
    document.body.innerHTML = ''
    expect(hideAppLoader()).toBe(false)
  })
})
