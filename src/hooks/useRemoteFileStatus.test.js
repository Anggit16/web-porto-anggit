import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useRemoteFileStatus } from './useRemoteFileStatus'

/** Bangun respons fetch tiruan dengan content-type tertentu. */
function fakeResponse({ ok = true, contentType = 'application/pdf' } = {}) {
  return { ok, headers: { get: () => contentType } }
}

describe('useRemoteFileStatus', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('idle bila URL kosong', () => {
    const { result } = renderHook(() => useRemoteFileStatus(null))
    expect(result.current).toBe('idle')
  })

  it('available bila HEAD 200 non-HTML', async () => {
    globalThis.fetch = vi.fn(async () => fakeResponse({ ok: true, contentType: 'application/pdf' }))
    const { result } = renderHook(() => useRemoteFileStatus('/cv/x.pdf'))
    expect(result.current).toBe('checking')
    await waitFor(() => expect(result.current).toBe('available'))
  })

  it('missing bila respons 404', async () => {
    globalThis.fetch = vi.fn(async () => fakeResponse({ ok: false }))
    const { result } = renderHook(() => useRemoteFileStatus('/cv/x.pdf'))
    await waitFor(() => expect(result.current).toBe('missing'))
  })

  it('missing bila SPA fallback membalas HTML (200 text/html)', async () => {
    globalThis.fetch = vi.fn(async () => fakeResponse({ ok: true, contentType: 'text/html; charset=utf-8' }))
    const { result } = renderHook(() => useRemoteFileStatus('/cv/x.pdf'))
    await waitFor(() => expect(result.current).toBe('missing'))
  })

  it('missing bila fetch gagal (network error)', async () => {
    globalThis.fetch = vi.fn(async () => {
      throw new Error('network down')
    })
    const { result } = renderHook(() => useRemoteFileStatus('/cv/x.pdf'))
    await waitFor(() => expect(result.current).toBe('missing'))
  })
})
