'use client'

import Spline from '@splinetool/react-spline'
import clsx from 'clsx'

export interface Props {
  className?: string
  sections: { children: React.ReactNode }[]
}

export function TrophyStickyContainer({ className, sections }: Props) {
  return (
    <div className={clsx(className, 'relative flex flex-col items-center sm:flex-row')}>
      <div className="w-1/2 flex-1 shrink-0 border-r border-foreground/25">
        {sections.map((section: { children: React.ReactNode }, index: number) => (
          <div
            key={index}
            className="grid h-screen w-full place-items-center p-6 sm:p-8 md:p-12 xl:p-20"
          >
            {section.children}
          </div>
        ))}
      </div>
      <div className="sticky inset-y-0 right-0 top-0 h-screen flex-1 shrink-0">
        <Spline scene="https://prod.spline.design/2Gm4QkPYPfTwREcA/scene.splinecode" />
      </div>
    </div>
  )
}
