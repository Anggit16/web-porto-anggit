import { describe, expect, it } from 'vitest'
import { isValidEmail, isValidHttpUrl, toMailto } from './url'

describe('isValidHttpUrl', () => {
  it('menerima URL http/https absolut', () => {
    expect(isValidHttpUrl('https://github.com/anggit')).toBe(true)
    expect(isValidHttpUrl('http://example.com')).toBe(true)
    expect(isValidHttpUrl('  https://example.com  ')).toBe(true)
  })

  it('menolak nilai kosong atau malformed', () => {
    for (const value of [
      null,
      undefined,
      '',
      '   ',
      'github.com/anggit', // tanpa protokol
      'javascript:alert(1)',
      'mailto:a@b.com',
      '/relative/path',
      42,
    ]) {
      expect(isValidHttpUrl(value)).toBe(false)
    }
  })
})

describe('isValidEmail', () => {
  it('menerima email wajar', () => {
    expect(isValidEmail('anggit@example.com')).toBe(true)
    expect(isValidEmail(' anggit@example.com ')).toBe(true)
  })

  it('menolak email tidak valid', () => {
    for (const value of [null, undefined, '', 'anggit', 'anggit@', '@example.com', 'a b@example.com', 'a@b']) {
      expect(isValidEmail(value)).toBe(false)
    }
  })
})

describe('toMailto', () => {
  it('membangun mailto hanya untuk email valid', () => {
    expect(toMailto('anggit@example.com')).toBe('mailto:anggit@example.com')
    expect(toMailto('invalid')).toBeNull()
    expect(toMailto(null)).toBeNull()
  })
})
