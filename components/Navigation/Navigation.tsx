'use client'

import Image from 'next/image'
import Link from 'next/link'
import ReactHeadroom from 'react-headroom'

import clsx from 'clsx'

import { ButtonLinkProps as ButtonProps, LinkButton } from '@/components/Button'

type Props = {
  className?: string
  logo: {
    image?: { url: string; dimensions: { width: number; height: number } }
    alt: string
    width?: number
    widthMobile?: number
    link?: {
      href: string
      target?: '_self' | '_blank'
    }
  }
  cta: {
    color?: ButtonProps['color']
    text?: ButtonProps['text']
    link?: ButtonProps['link']
  }
  text?: string
}

export function Navigation({ className, logo, text, cta }: Props) {
  return (
    <header
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 h-[72px] w-full p-2 sm:h-[88px] sm:p-3'
      )}
    >
      <div className="flex h-full w-full items-stretch justify-between">
        <div className="flex items-center border border-foreground/40 bg-background">
          {logo.image && (
            <Link
              href={logo.link?.href ?? '#'}
              target={logo.link?.target}
              className="h-full py-2 pl-3 pr-5"
            >
              <Image
                alt={logo.alt}
                height={logo.image.dimensions.width / logo.image.dimensions.height}
                priority
                src={logo.image.url}
                width={logo.width}
                className="h-full object-contain"
              />
            </Link>
          )}
          <div className="hidden h-full items-center border-l border-foreground/40 px-6 font-heading text-xl uppercase text-primary sm:flex">
            {text}
          </div>
        </div>

        <LinkButton link={cta.link} text={cta.text} color={cta.color ?? 'black'} />
      </div>
    </header>
  )
}
