const DANGEROUS_SCHEME = /^(javascript|data|vbscript):/i

export function safeHref(value: string | undefined | null, fallback = '#'): string {
  if (typeof value !== 'string') return fallback

  const trimmed = value.trim()
  if (!trimmed) return fallback

  const scheme = trimmed.replace(/[\u0000-\u001F\u007F\s]+/g, '')
  if (DANGEROUS_SCHEME.test(scheme)) return fallback

  return trimmed
}

export function externalLinkRel(target?: string): 'noopener noreferrer' | undefined {
  return target === '_blank' ? 'noopener noreferrer' : undefined
}
