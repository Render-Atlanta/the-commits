const UNSAFE_PROTOCOL = /^(javascript|data|vbscript):/i
const HAS_PROTOCOL = /^[a-z][a-z\d+.-]*:/i

export function normalizeUrl(value?: string | null): string | undefined {
  if (typeof value !== 'string') return undefined

  const trimmed = value.trim()
  if (!trimmed || trimmed === '#') return undefined
  if (UNSAFE_PROTOCOL.test(trimmed)) return undefined
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (trimmed.startsWith('//')) return `https:${trimmed}`
  if (HAS_PROTOCOL.test(trimmed)) return undefined

  return `https://${trimmed.replace(/^\/+/, '')}`
}
