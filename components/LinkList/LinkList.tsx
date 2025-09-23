'use client'

import Link from 'next/link'

import Spline from '@splinetool/react-spline'
import clsx from 'clsx'

export interface Props {
  className?: string
  links: {
    text: string
    link: {
      href: string
      target?: '_self' | '_blank'
    }
  }[]
}

export function LinkList({ className, links }: Props) {
  return (
    <div className={clsx(className, 'flex flex-col items-center justify-center text-center')}>
      {links.map(
        (
          linkItem: { text: string; link: { href: string; target?: '_self' | '_blank' } },
          index: number
        ) => (
          <Link
            key={index}
            href={linkItem.link?.href || ''}
            target={linkItem.link?.target}
            className="group/link inline-flex items-center gap-x-4 py-1 leading-normal md:py-2"
          >
            <span className="relative z-10 translate-x-4 font-heading text-3xl font-light text-foreground transition-all duration-300 ease-out hover:text-primary group-hover/link:translate-x-0 sm:translate-x-6 md:text-4xl lg:text-5xl xl:text-6xl">
              {linkItem.text}
            </span>
            <div className="grid size-8 -translate-x-4 place-items-center bg-primary opacity-0 transition-all duration-300 ease-out group-hover/link:translate-x-0 group-hover/link:opacity-100 sm:-translate-x-6 md:size-10 xl:size-12">
              <svg viewBox="0 0 16 16" fill="none" className="size-4 stroke-background">
                <path strokeWidth={2} d="M2 1h13v13M15 1 1 15" />
              </svg>
            </div>
          </Link>
        )
      )}
    </div>
  )
}
