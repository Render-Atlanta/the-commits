import Image from 'next/image'
import React, { CSSProperties, Ref, forwardRef } from 'react'

import clsx from 'clsx'

type Item = {
  logoImage?: { url: string; dimensions: { width: number; height: number } }
  logoAlt: string
  text: string
}

type Props = {
  className?: string
  items: Item[]
  fontSize?: number
  fadeEdges?: boolean
  pauseOnHover?: boolean
  reverse?: boolean
  duration?: number
  repeat?: number
}

export const Marquee = forwardRef(function Marquee(
  {
    className,
    items,
    fontSize = 20,
    fadeEdges = false,
    pauseOnHover = false,
    reverse = false,
    duration = 40,
    repeat = 4,
  }: Props,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      className={clsx(
        'group/marquee flex overflow-hidden',
        fadeEdges &&
          '[mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]',
        className
      )}
      ref={ref}
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={clsx(
              'flex shrink-0 animate-scrollLeft items-center gap-x-[1.5vw] px-[1.5vw]',
              pauseOnHover && 'group-hover/marquee:[animation-play-state:paused]',
              reverse && '[animation-direction:reverse]'
            )}
          >
            {items.map(({ logoImage, logoAlt, text }, index) => {
              return (
                <div
                  key={index}
                  className="font-heading text-foreground flex items-center gap-x-[3vw] font-light tracking-tight md:tracking-tighter"
                  style={{ fontSize: `${fontSize}vw` }}
                >
                  {logoImage ? (
                    <div className="relative aspect-square" style={{ width: `${fontSize}vw` }}>
                      <Image
                        src={logoImage.url}
                        alt={logoAlt}
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                  {text}
                </div>
              )
            })}
          </div>
        ))}
    </div>
  )
})

export default Marquee
