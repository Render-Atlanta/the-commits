'use client'

import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import { useScramble } from 'use-scramble'

export interface Props {
  className?: string
  color?: string
  text?: string
  align?: 'left' | 'center' | 'right'
}

export function AnimatedEyebrowText({
  className,
  color = 'black',
  text = 'Heading',
  align = 'left',
}: Props) {
  const [shouldPlay, setShouldPlay] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const { ref } = useScramble({
    text: shouldPlay ? text : '',
    speed: 0.65,
    tick: 5,
    step: 1,
    scramble: 10,
    overdrive: false,
    playOnMount: false,
  })

  useEffect(() => {
    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setPageLoaded(true)
    } else {
      const handleLoad = () => setPageLoaded(true)
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            // Element is fully in viewport - add delay before starting animation
            setTimeout(() => {
              setShouldPlay(true)
            }, 300)
            observer.disconnect()
          }
        })
      },
      {
        threshold: 1.0, // Trigger when 100% of element is visible
      }
    )

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [])

  // Start animation when page is loaded (if element might already be in view)
  useEffect(() => {
    if (pageLoaded && elementRef.current) {
      // Check if element is already fully visible
      const rect = elementRef.current.getBoundingClientRect()
      const isFullyVisible =
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.left >= 0 &&
        rect.right <= window.innerWidth

      if (isFullyVisible) {
        setShouldPlay(true)
      }
    }
  }, [pageLoaded])

  return (
    <div
      ref={elementRef}
      className={clsx(className, 'font-mono text-lg uppercase', {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
      })}
      style={{ color }}
    >
      [<span ref={ref} className="tracking-wider" />]
    </div>
  )
}
