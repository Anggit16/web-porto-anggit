import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { translations } from './translations'

/**
 * Penjaga integritas sistem bilingual:
 * ID dan EN harus punya struktur kunci yang identik, agar tidak ada teks
 * yang lupa diterjemahkan saat menambah section/fitur baru.
 */

/** Ratakan objek bersarang menjadi daftar path kunci. */
function flattenKeys(obj, prefix = '') {
  const keys = []
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) keys.push(...flattenKeys(v, path))
    else keys.push(path)
  }
  return keys
}

function lookup(lang, path) {
  return path.split('.').reduce((node, part) => (node == null ? undefined : node[part]), translations[lang])
}

describe('Konsistensi terjemahan ID/EN', () => {
  const idKeys = flattenKeys(translations.id)
  const enKeys = flattenKeys(translations.en)

  it('punya jumlah kunci yang sama', () => {
    expect(idKeys.length).toBe(enKeys.length)
  })

  it('tidak ada kunci yang hanya ada di ID', () => {
    const missingInEn = idKeys.filter((k) => !enKeys.includes(k))
    expect(missingInEn).toEqual([])
  })

  it('tidak ada kunci yang hanya ada di EN', () => {
    const missingInId = enKeys.filter((k) => !idKeys.includes(k))
    expect(missingInId).toEqual([])
  })

  it('semua nilai string terisi (bukan string kosong)', () => {
    const empties = idKeys.filter((k) => {
      const v = lookup('id', k)
      return typeof v === 'string' && v.trim() === ''
    })
    expect(empties).toEqual([])
  })

  it('placeholder interpolasi {{...}} sama di kedua bahasa', () => {
    const placeholderOf = (s) => [...s.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]).sort()
    const mismatches = idKeys.filter((k) => {
      const idVal = lookup('id', k)
      const enVal = lookup('en', k)
      if (typeof idVal !== 'string' || typeof enVal !== 'string') return false
      return placeholderOf(idVal).join(',') !== placeholderOf(enVal).join(',')
    })
    expect(mismatches).toEqual([])
  })
})

/**
 * Penjaga kunci mati: setiap keypath harus benar-benar dipakai di kode aplikasi.
 * Dua bentuk pemakaian yang dikenali:
 * 1. literal   → t('nav.about')
 * 2. dinamis   → t(`skills.groups.${group.id}`) — terdeteksi dari prefik + "${"
 *
 * Kunci yang tidak terpakai hanya menambah ukuran bundle dan membingungkan
 * pembaca (terjemahan yang dibuat sia-sia).
 */
describe('Kunci terjemahan dipakai di aplikasi', () => {
  const SRC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')

  function collectFiles(dir, out = []) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) collectFiles(path, out)
      else if (/\.(jsx?|tsx?)$/.test(entry.name)) out.push(path)
    }
    return out
  }

  // Hanya kode aplikasi: file uji tidak dihitung sebagai pemakai
  // (kunci yang hanya dipakai di uji tetap dianggap mati).
  const appSource = collectFiles(SRC_DIR)
    .filter((file) => !file.includes('.test.') && !file.endsWith('translations.js'))
    .map((file) => readFileSync(file, 'utf8'))
    .join('\n')

  function isUsed(keyPath) {
    if (
      appSource.includes(`'${keyPath}'`) ||
      appSource.includes(`"${keyPath}"`) ||
      appSource.includes(`\`${keyPath}\``)
    ) {
      return true
    }
    const segments = keyPath.split('.')
    for (let i = segments.length - 1; i >= 1; i--) {
      if (appSource.includes(`${segments.slice(0, i).join('.')}.${'${'}`)) return true
    }
    return false
  }

  it('tidak ada kunci terjemahan yang mati (tidak terpakai)', () => {
    const unused = flattenKeys(translations.id).filter((keyPath) => !isUsed(keyPath))
    expect(unused).toEqual([])
  })
})
