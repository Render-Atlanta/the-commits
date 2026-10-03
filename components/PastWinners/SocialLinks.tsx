import Link from 'next/link'

import clsx from 'clsx'

import { normalizeUrl } from './normalize-url'
import { WinnerLink } from './types'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'

type SocialIconName = 'linkedin' | 'x' | 'instagram'

type SocialLink = {
  href: string
  label: string
  icon: SocialIconName
}

function SocialIcon({ name }: { name: SocialIconName }) {
  const className = 'size-4 fill-current'

  if (name === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 0 1-2.06-2.06 2.06 2.06 0 1 1 2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z" />
      </svg>
    )
  }

  if (name === 'x') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.14l-4.71-6.23-5.4 6.23H3.24l7.73-8.84L1.25 2.25h6.83l4.25 5.62 5.91-5.62zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.16 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  )
}

function toSocialLink(
  link: WinnerLink | undefined,
  icon: SocialIconName,
  label: string
): SocialLink | undefined {
  const href = normalizeUrl(link?.href)
  if (!href) return undefined
  return { href, icon, label }
}

export function SocialLinks({
  name,
  linkedin,
  x,
  instagram,
}: {
  name: string
  linkedin?: WinnerLink
  x?: WinnerLink
  instagram?: WinnerLink
}) {
  const links = [
    toSocialLink(linkedin, 'linkedin', `${name} on LinkedIn (opens in a new tab)`),
    toSocialLink(x, 'x', `${name} on X (opens in a new tab)`),
    toSocialLink(instagram, 'instagram', `${name} on Instagram (opens in a new tab)`),
  ].filter((link): link is SocialLink => link != null)

  if (links.length === 0) return null

  return (
    <ul className="mt-3 flex gap-2" aria-label={`${name} on social`}>
      {links.map(link => (
        <li key={link.icon}>
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={clsx(
              focusRing,
              'grid size-11 place-items-center border border-foreground/40 text-foreground transition-colors duration-300 ease-out hover:border-foreground hover:text-primary'
            )}
          >
            <SocialIcon name={link.icon} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
