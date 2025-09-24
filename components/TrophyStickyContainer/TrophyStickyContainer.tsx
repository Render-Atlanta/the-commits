'use client'

import { useEffect, useState } from 'react'

import Spline from '@splinetool/react-spline'
import clsx from 'clsx'

export interface Props {
  className?: string
  sections: { children: React.ReactNode }[]
}

export function TrophyStickyContainer({ className, sections }: Props) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={clsx(
        className,
        'relative flex flex-col-reverse items-center justify-center sm:flex-row'
      )}
    >
      <div className="w-full flex-1 shrink-0 border-r border-foreground/25 sm:w-1/2">
        {sections.map((section: { children: React.ReactNode }, index: number) => (
          <div
            key={index}
            className="grid h-auto w-full place-items-center p-6 sm:h-screen sm:p-8 md:p-12 xl:p-20"
          >
            {section.children}
          </div>
        ))}
      </div>
      <div className="aspect-square h-96 w-full flex-1 shrink-0 sm:sticky sm:inset-y-0 sm:right-0 sm:top-0 sm:aspect-auto sm:h-screen">
        <Spline scene="https://prod.spline.design/2Gm4QkPYPfTwREcA/scene.splinecode" />
      </div>

      <div
        className={clsx(
          'absolute left-6 top-[calc(100vh-64px)] hidden transition-opacity duration-300 ease-linear sm:left-8 sm:block md:left-12 xl:left-20',
          isScrolled && 'opacity-0'
        )}
      >
        <svg viewBox="0 0 34 20" className="w-9 stroke-primary" fill="none">
          <path strokeWidth={3} d="M32 2 17 17 2 2" />
        </svg>
      </div>
    </div>
  )
}
