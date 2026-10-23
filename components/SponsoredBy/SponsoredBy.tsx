'use client'

import Link from 'next/link'
import { useId } from 'react'

import clsx from 'clsx'

import {
  AwsLogo,
  CargillLogo,
  CoderLogo,
  DoppelLogo,
  FigmaLogo,
  GustoLogo,
  IntuitLogo,
  LumenLogo,
  MastraLogo,
  NetflixLogo,
  RenderLogo,
  SanityLogo,
  VercelLogo,
} from './logos'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const logoClassName = 'h-6 w-auto max-w-[7.5rem] sm:h-7 sm:max-w-[11rem] md:max-w-[13rem]'

const sponsors = [
  { name: 'Intuit', href: 'https://www.intuit.com', Logo: IntuitLogo },
  { name: 'Netflix', href: 'https://www.netflix.com', Logo: NetflixLogo },
  { name: 'Mastra', href: 'https://mastra.ai', Logo: MastraLogo },
  { name: 'Lumen', href: 'https://www.lumen.com', Logo: LumenLogo },
  { name: 'Cargill', href: 'https://www.cargill.com', Logo: CargillLogo },
  { name: 'Doppel', href: 'https://doppel.com', Logo: DoppelLogo },
  { name: 'Amazon Web Services', href: 'https://aws.amazon.com', Logo: AwsLogo },
  { name: 'Figma', href: 'https://www.figma.com', Logo: FigmaLogo },
  { name: 'Sanity', href: 'https://www.sanity.io', Logo: SanityLogo },
  { name: 'Gusto', href: 'https://gusto.com', Logo: GustoLogo },
  { name: 'Coder', href: 'https://coder.com', Logo: CoderLogo },
  { name: 'Vercel', href: 'https://vercel.com', Logo: VercelLogo },
  { name: 'Render', href: 'https://render.com', Logo: RenderLogo },
] as const

export type SponsoredByProps = {
  className?: string
  heading?: string
}

export function SponsoredBy({ className, heading }: SponsoredByProps) {
  const headingId = useId()
  const title = heading?.trim() || 'Sponsored by'

  return (
    <section
      aria-labelledby={headingId}
      className={clsx(className, 'px-6 py-16 sm:px-8 md:px-12 md:py-24 xl:px-20 xl:py-28')}
    >
      <h2
        id={headingId}
        className="font-heading text-sm uppercase tracking-[0.18em] text-foreground sm:text-base"
      >
        {title}
      </h2>
      <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-8 sm:mt-10 sm:gap-x-10 md:gap-x-14">
        {sponsors.map(({ name, href, Logo }) => (
          <li key={name} className="flex min-w-0 items-center">
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} (opens in a new tab)`}
              className={clsx(
                focusRing,
                'inline-flex max-w-full text-foreground transition-colors duration-300 ease-out hover:text-primary'
              )}
            >
              <Logo className={logoClassName} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
