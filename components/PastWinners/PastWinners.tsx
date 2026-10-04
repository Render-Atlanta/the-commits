'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useId } from 'react'

import { useIsInBuilder } from '@makeswift/runtime/react'
import clsx from 'clsx'

import { SocialLinks } from './SocialLinks'
import { categoryLabel } from './award-categories'
import { groupWinners } from './group-winners'
import { normalizeUrl } from './normalize-url'
import { Winner } from './types'
import { PAST_WINNERS } from './winners'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export type PastWinnersProps = {
  className?: string
  heading?: string
  intro?: string
  yearFilter?: string
  winners?: Winner[]
}

function WinnerCard({ winner }: { winner: Winner }) {
  const name = winner.name?.trim() || 'Winner'
  const project = winner.project?.trim()
  const category = categoryLabel(winner.category)
  const imageUrl = winner.image?.url?.trim()
  const imageAlt = winner.imageAlt?.trim() || ''
  const projectHref = normalizeUrl(winner.projectLink?.href)

  const body = (
    <>
      <div className="relative aspect-square w-full overflow-hidden bg-foreground/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {category ? (
          <p className="font-heading text-xs uppercase leading-snug tracking-wider text-primary">
            {category}
          </p>
        ) : null}
        <h4
          className={clsx(
            'font-heading text-xl font-light uppercase leading-tight text-foreground sm:text-2xl',
            category && 'mt-2',
            projectHref && 'transition-colors duration-300 ease-out group-hover/card:text-primary'
          )}
        >
          {name}
        </h4>
        {project ? (
          <p className="mt-2 font-body text-base font-light leading-relaxed text-foreground/70">
            {project}
          </p>
        ) : null}
        {projectHref ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </div>
    </>
  )

  return (
    <li className="flex h-full min-w-0 flex-col">
      {projectHref ? (
        <Link
          href={projectHref}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            focusRing,
            'group/card flex flex-1 flex-col border border-border transition-colors duration-300 ease-out hover:border-foreground'
          )}
        >
          {body}
        </Link>
      ) : (
        <div className="flex flex-1 flex-col border border-border">{body}</div>
      )}
      <SocialLinks
        name={name}
        linkedin={winner.linkedin}
        x={winner.x}
        instagram={winner.instagram}
        website={winner.website}
      />
    </li>
  )
}

export function PastWinners({
  className,
  heading,
  intro,
  yearFilter,
  winners = [],
}: PastWinnersProps) {
  const headingId = useId()
  const isInBuilder = useIsInBuilder()
  const title = heading?.trim() || 'Past Winners'
  const introCopy = intro?.trim()
  const configured = winners.filter(Boolean)
  const groups = groupWinners(configured.length > 0 ? configured : PAST_WINNERS, yearFilter)

  if (groups.length === 0 && !isInBuilder) return null

  return (
    <section
      aria-labelledby={headingId}
      className={clsx(className, 'px-6 py-16 sm:px-8 md:px-12 md:py-24 xl:px-20 xl:py-28')}
    >
      <div className="max-w-3xl">
        <h2
          id={headingId}
          className="font-heading text-4xl font-light uppercase leading-none text-foreground sm:text-5xl lg:text-6xl"
        >
          {title}
        </h2>
        {introCopy ? (
          <p className="mt-5 font-body text-lg font-light leading-relaxed text-foreground/70 sm:text-xl">
            {introCopy}
          </p>
        ) : null}
      </div>

      {groups.length > 0 ? (
        <div className="mt-12 md:mt-16">
          {groups.map(group => (
            <div
              key={group.year}
              className="mt-14 border-t border-border pt-8 first:mt-0 md:mt-20 md:pt-10"
            >
              <h3 className="font-heading text-2xl font-light uppercase text-primary sm:text-3xl">
                {group.year}
              </h3>
              <ul className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
                {group.winners.map((winner, index) => (
                  <WinnerCard
                    key={`${group.year}-${winner.name ?? 'winner'}-${index}`}
                    winner={winner}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : isInBuilder ? (
        <p className="mt-8 max-w-3xl border border-border p-6 font-body text-base font-light leading-relaxed text-foreground/70">
          No winners match {yearFilter?.trim() || 'this year'}. Clear the year filter or add a
          winner for that year.
        </p>
      ) : null}
    </section>
  )
}
