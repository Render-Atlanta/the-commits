import Image from 'next/image'
import React, { CSSProperties, Ref, forwardRef } from 'react'

import clsx from 'clsx'

type Logo = {
  logoImage?: { url: string; dimensions: { width: number; height: number } }
  logoAlt: string
  logoWidth: number
  mobileLogoWidth: number
}

type Props = {
  className?: string
  logos: Logo[]
  fadeEdges?: boolean
  pauseOnHover?: boolean
  reverse?: boolean
  duration?: number
  gap?: number
  repeat?: number
}

export const Marquee = forwardRef(function Marquee(
  {
    className,
    logos,
    fadeEdges = false,
    pauseOnHover = false,
    reverse = false,
    duration = 40,
    gap = 48,
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
              'flex shrink-0 animate-scrollLeft items-center',
              pauseOnHover && 'group-hover/marquee:[animation-play-state:paused]',
              reverse && '[animation-direction:reverse]'
            )}
            style={{ columnGap: gap, paddingInlineStart: gap / 2, paddingInlineEnd: gap / 2 }}
          >
            {logos.map(({ logoImage, logoAlt, logoWidth = 96, mobileLogoWidth = 56 }, index) => {
              if (logoImage == null) {
                return <div key={index} className="bg-background/50 size-16 rounded-xl" />
              }

              return (
                <div key={index}>
                  <Image
                    src={logoImage.url}
                    alt={logoAlt}
                    width={logoWidth}
                    height={logoWidth / (logoImage.dimensions.width / logoImage.dimensions.height)}
                    priority
                    className="hidden md:block"
                  />
                  <Image
                    src={logoImage.url}
                    alt={logoAlt}
                    width={mobileLogoWidth}
                    height={
                      mobileLogoWidth / (logoImage.dimensions.width / logoImage.dimensions.height)
                    }
                    priority
                    className="md:hidden"
                  />
                </div>
              )
            })}
          </div>
        ))}
    </div>
  )
})

export default Marquee
