'use client'

import clsx from 'clsx'

import { Button, ButtonLinkProps as ButtonProps, LinkButton } from '@/components/Button'

interface Button {
  color?: ButtonProps['color']
  text?: ButtonProps['text']
  link?: ButtonProps['link']
}

export interface Props {
  className?: string
  buttons?: Button[]
  gap?: number
}

export function ButtonGroup({ className, buttons, gap }: Props) {
  return (
    <div className={clsx(className, 'flex items-center justify-center')} style={{ gap: gap }}>
      {buttons?.map(({ link, text, color }, index) => (
        <LinkButton key={index} link={link} text={text} color={color ?? 'black'} />
      ))}
    </div>
  )
}
