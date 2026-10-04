'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { useIsInBuilder } from '@makeswift/runtime/react'
import clsx from 'clsx'

import { groupWinners } from '@/components/PastWinners/group-winners'
import { Winner } from '@/components/PastWinners/types'
import { PAST_WINNERS } from '@/components/PastWinners/winners'

import { WinnerCard } from './WinnerCard'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const slideWidth =
  'w-[66%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)*0.375)] lg:w-[calc((100%-3rem)*0.25)]'

export type PastWinnersCarouselProps = {
  className?: string
  heading?: string
  intro?: string
  yearFilter?: string
  winners?: Winner[]
}

function orderedWinners(winners: Winner[], yearFilter?: string) {
  return groupWinners(winners, yearFilter).flatMap(group => group.winners)
}

function CarouselButton({
  direction,
  disabled,
  controlsId,
  onClick,
}: {
  direction: 'previous' | 'next'
  disabled: boolean
  controlsId: string
  onClick: () => void
}) {
  const isPrevious = direction === 'previous'

  return (
    <button
      type="button"
      aria-label={isPrevious ? 'Previous winners' : 'Next winners'}
      aria-controls={controlsId}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        focusRing,
        'grid size-14 shrink-0 place-items-center border border-foreground/40 text-foreground transition-colors duration-300 ease-out hover:border-foreground hover:bg-primary hover:text-background disabled:pointer-events-none disabled:opacity-40'
      )}
    >
      <svg
        viewBox="0 0 34 20"
        aria-hidden="true"
        focusable="false"
        className={clsx('w-5 fill-none stroke-current', isPrevious ? 'rotate-90' : '-rotate-90')}
      >
        <path strokeWidth={3} d="M32 2 17 17 2 2" />
      </svg>
    </button>
  )
}

export function PastWinnersCarousel({
  className,
  heading,
  intro,
  yearFilter,
  winners = [],
}: PastWinnersCarouselProps) {
  const headingId = useId()
  const statusId = useId()
  const listId = useId()
  const scrollerRef = useRef<HTMLUListElement>(null)
  const isInBuilder = useIsInBuilder()
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [status, setStatus] = useState('')

  const title = heading?.trim() || 'Past Winners'
  const introCopy = intro?.trim()
  const configured = winners.filter(Boolean)
  const slides = orderedWinners(configured.length > 0 ? configured : PAST_WINNERS, yearFilter)

  const updateScrollState = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const maxScroll = scroller.scrollWidth - scroller.clientWidth
    setCanPrev(scroller.scrollLeft > 8)
    setCanNext(scroller.scrollLeft < maxScroll - 8)

    const cards = [...scroller.querySelectorAll<HTMLElement>(':scope > li')]
    const viewLeft = scroller.getBoundingClientRect().left
    const viewRight = scroller.getBoundingClientRect().right
    const visible = cards.filter(card => {
      const rect = card.getBoundingClientRect()
      return rect.right > viewLeft + 8 && rect.left < viewRight - 8
    })
    const first = cards.indexOf(visible[0])
    const last = cards.indexOf(visible[visible.length - 1])

    if (first >= 0 && last >= 0) {
      setStatus(
        first === last
          ? `Showing winner ${first + 1} of ${cards.length}`
          : `Showing winners ${first + 1} to ${last + 1} of ${cards.length}`
      )
    }
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    updateScrollState()
    scroller.addEventListener('scroll', updateScrollState, { passive: true })
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(scroller)

    return () => {
      scroller.removeEventListener('scroll', updateScrollState)
      observer.disconnect()
    }
  }, [slides.length, updateScrollState])

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = [...scroller.querySelectorAll<HTMLElement>(':scope > li')]
    const current = scroller.scrollLeft
    const positions = cards.map(card => ({
      card,
      left:
        card.getBoundingClientRect().left -
        scroller.getBoundingClientRect().left +
        scroller.scrollLeft,
    }))
    const target =
      direction === 1
        ? positions.find(item => item.left > current + 8)
        : [...positions].reverse().find(item => item.left < current - 8)

    if (!target) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scroller.scrollTo({
      left: target.left,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  if (slides.length === 0 && !isInBuilder) return null

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby={headingId}
      className={clsx(className, 'px-6 py-16 sm:px-8 md:px-12 md:py-24 xl:px-20 xl:py-28')}
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
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
        {slides.length > 0 ? (
          <div className="flex gap-2">
            <CarouselButton
              direction="previous"
              disabled={!canPrev}
              controlsId={listId}
              onClick={() => scrollByCard(-1)}
            />
            <CarouselButton
              direction="next"
              disabled={!canNext}
              controlsId={listId}
              onClick={() => scrollByCard(1)}
            />
          </div>
        ) : null}
      </div>

      {slides.length > 0 ? (
        <>
          <p id={statusId} className="sr-only" aria-live="polite">
            {status}
          </p>
          <ul
            id={listId}
            ref={scrollerRef}
            aria-labelledby={headingId}
            className="-mx-1 mt-12 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:none] sm:mt-16 [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((winner, index) => (
              <WinnerCard
                key={`${winner.name ?? 'winner'}-${winner.year ?? 'year'}-${index}`}
                winner={winner}
                className={slideWidth}
              />
            ))}
          </ul>
        </>
      ) : isInBuilder ? (
        <p className="mt-8 max-w-3xl border border-border p-6 font-body text-base font-light leading-relaxed text-foreground/70">
          No winners match {yearFilter?.trim() || 'this year'}. Clear the year filter or add a
          winner for that year.
        </p>
      ) : null}
    </section>
  )
}
