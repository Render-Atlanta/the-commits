import Image from 'next/image'
import Link from 'next/link'

import clsx from 'clsx'

import { SocialLinks } from '@/components/PastWinners/SocialLinks'
import { yearKey } from '@/components/PastWinners/group-winners'
import { normalizeUrl } from '@/components/PastWinners/normalize-url'
import { Winner } from '@/components/PastWinners/types'

import { carouselCategoryLabel } from './categories'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function WinnerCard({ winner, className }: { winner: Winner; className?: string }) {
  const name = winner.name?.trim() || 'Winner'
  const project = winner.project?.trim()
  const category = carouselCategoryLabel(winner.category)
  const year = yearKey(winner.year)
  const imageUrl = winner.image?.url?.trim()
  const imageAlt = winner.imageAlt?.trim() || ''
  const projectHref = normalizeUrl(winner.projectLink?.href)

  const body = (
    <>
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-foreground/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 38vw, 66vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-heading text-xs uppercase tracking-wide text-foreground/70">{year}</p>
        <p className="mt-1.5 line-clamp-2 min-h-[2lh] font-heading text-xs uppercase leading-snug tracking-wider text-primary">
          {category}
        </p>
        <h4
          className={clsx(
            'mt-1.5 line-clamp-2 min-h-[2lh] font-heading text-base font-light uppercase leading-tight text-foreground sm:text-lg',
            projectHref && 'transition-colors duration-300 ease-out group-hover/card:text-primary'
          )}
        >
          {name}
        </h4>
        <p
          className="mt-1.5 line-clamp-2 min-h-[2lh] font-body text-sm font-light leading-snug text-foreground/70"
          aria-hidden={project ? undefined : true}
        >
          {project}
        </p>
        {projectHref ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </div>
    </>
  )

  return (
    <li className={clsx('flex min-w-0 flex-col self-stretch', className)}>
      {projectHref ? (
        <Link
          href={projectHref}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            focusRing,
            'group/card flex min-h-0 flex-1 flex-col border border-border transition-colors duration-300 ease-out hover:border-foreground'
          )}
        >
          {body}
        </Link>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col border border-border">{body}</div>
      )}
      <div className="mt-2.5 min-h-8">
        <SocialLinks
          name={name}
          linkedin={winner.linkedin}
          x={winner.x}
          instagram={winner.instagram}
          website={winner.website}
          className="mt-0"
          buttonClassName="size-8"
        />
      </div>
    </li>
  )
}
