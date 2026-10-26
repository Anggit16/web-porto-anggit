import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// --- Stub API browser yang tidak tersedia di jsdom ---

// IntersectionObserver (dipakai useActiveSection)
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
globalThis.IntersectionObserver = MockIntersectionObserver

// scrollIntoView & scrollTo (dipakai navigasi smooth scroll)
Element.prototype.scrollIntoView = vi.fn()
window.scrollTo = vi.fn()

// matchMedia (dipakai potensial untuk prefers-reduced-motion)
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  vi.clearAllMocks()
})
