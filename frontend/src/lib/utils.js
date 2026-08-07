import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value)
}

export function formatPhone(value) {
  if (!value) return ''
  const digits = value.replace(/\D/g, '')
  if (digits.length === 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`
  if (digits.length > 10) {
    const cc = digits.slice(0, digits.length - 10)
    const rest = digits.slice(-10)
    return `+${cc} ${rest.slice(0, 5)} ${rest.slice(5)}`
  }
  return value
}

export function seededRandom(seed) {
  let t = seed + 0x6d2b79f5
  return function () {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}
