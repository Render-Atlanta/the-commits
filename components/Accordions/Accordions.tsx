'use client'

import React, { ReactNode, Ref, forwardRef } from 'react'

import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'

type AccordionItem = {
  title: ReactNode
  body: ReactNode
}

type Props = {
  className?: string
  accordions: AccordionItem[]
  type: 'single' | 'multiple'
}

export const Accordions = forwardRef(function Accordions(
  { className, accordions, type = 'multiple' }: Props,
  ref: Ref<HTMLUListElement>
) {
  return (
    <Accordion.Root type={type} asChild>
      <ul className={clsx(className, 'w-full -space-y-px')} ref={ref}>
        {accordions.length === 0 ? (
          <div className="p-6 text-center text-lg text-foreground">
            There are no Accordions. Try adding some.
          </div>
        ) : (
          accordions.map((accordion, i) => (
            <Accordion.Item key={i} value={`${i + 1}`} asChild>
              <li className="border-border group relative border py-5 pl-6 pr-6 transition-colors duration-300 ease-out hover:isolate hover:z-20 hover:border-foreground data-[state=open]:isolate data-[state=open]:z-10 data-[state=open]:border-primary md:py-8 md:pl-8 md:pr-8">
                <Accordion.Header>
                  <Accordion.Trigger asChild>
                    <div className="flex w-full cursor-pointer items-center gap-x-10">
                      <div className="flex-1 text-left font-heading text-xl font-light uppercase leading-tight text-foreground sm:text-2xl md:text-4xl">
                        {accordion.title}
                      </div>

                      <svg
                        viewBox="0 0 28 28"
                        fill="none"
                        className="h-6 w-6 fill-foreground opacity-40 md:h-7 md:w-7"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="13"
                          className="h-7 w-0.5 origin-center transition-transform duration-300 group-data-[state=open]:rotate-90"
                        />
                        <rect y="13" className="h-0.5 w-7" />
                      </svg>
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="w-full overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
                  <div className="pt-4 font-body text-lg leading-relaxed text-foreground md:pt-5">
                    {accordion.body}
                  </div>
                </Accordion.Content>
              </li>
            </Accordion.Item>
          ))
        )}
      </ul>
    </Accordion.Root>
  )
})

export default Accordions
