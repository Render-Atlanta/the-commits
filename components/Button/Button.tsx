'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes, Ref } from 'react'

import clsx from 'clsx'

export interface ButtonLinkProps {
  className?: string
  link?: { href: string; target?: string }
  color?: 'black' | 'white'
  size?: 'large' | 'medium' | 'small'
  text?: string
  ref?: Ref<HTMLAnchorElement>
}

export function LinkButton({ className, link, color = 'black', text = 'Button' }: ButtonLinkProps) {
  return (
    <Link
      className={clsx(
        className,
        'group/button relative z-0 inline-flex h-14 items-stretch overflow-hidden border border-foreground text-center font-heading text-xl uppercase leading-none outline-none transition-colors duration-300 hover:border-primary sm:h-16',
        {
          black: 'border-foreground text-foreground',
          white: 'bg-foreground text-background',
        }[color]
      )}
      href={link?.href ?? '#'}
      target={link?.target}
    >
      <div className="absolute inset-y-0 left-0 grid aspect-square -translate-x-16 place-items-center bg-primary text-background transition-transform duration-300 group-hover/button:translate-x-0">
        <svg
          className="size-4 transition-transform duration-300 group-hover/button:rotate-45"
          fill="none"
        >
          <path fill="#000" d="M16 14h-2V3.414L1.707 15.707.293 14.293 12.586 2H2V0h14v14Z" />
        </svg>
      </div>
      <div className="flex h-full items-stretch transition-transform duration-300 group-hover/button:translate-x-16">
        <span className="self-center px-6 sm:px-8">{text}</span>
        <div className="grid aspect-square place-items-center bg-primary text-background">
          <svg
            className="size-4 transition-transform duration-300 group-hover/button:rotate-45"
            fill="none"
          >
            <path fill="#000" d="M16 14h-2V3.414L1.707 15.707.293 14.293 12.586 2H2V0h14v14Z" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  className?: string
  color?: 'black' | 'white'
  loading?: boolean
  text?: string
  ref?: Ref<HTMLButtonElement>
}

export function Button({
  className,
  color = 'black',
  text = 'Button',
  loading = false,
  onClick,
  ref,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={loading}
      ref={ref}
      className={clsx(
        className,
        'group/button relative z-0 inline-flex h-14 items-stretch overflow-hidden border border-foreground text-center font-heading text-xl uppercase leading-none outline-none sm:h-16',
        {
          black: 'border-foreground text-foreground',
          white: 'bg-foreground text-background',
        }[color]
      )}
    >
      <div className="absolute inset-y-0 left-0 grid aspect-square -translate-x-16 place-items-center bg-primary text-background transition-transform duration-300 group-hover/button:translate-x-0">
        <svg
          className="size-4 transition-transform duration-300 group-hover/button:rotate-45"
          fill="none"
        >
          <path fill="#000" d="M16 14h-2V3.414L1.707 15.707.293 14.293 12.586 2H2V0h14v14Z" />
        </svg>
      </div>
      <div className="flex h-full items-stretch transition-transform duration-300 group-hover/button:translate-x-16">
        <span className="self-center px-6 sm:px-8">{text}</span>
        <div className="grid aspect-square place-items-center bg-primary text-background">
          <svg
            className="size-4 transition-transform duration-300 group-hover/button:rotate-45"
            fill="none"
          >
            <path fill="#000" d="M16 14h-2V3.414L1.707 15.707.293 14.293 12.586 2H2V0h14v14Z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
