import { Params } from 'next/dist/server/request/params'
import { Space_Mono } from 'next/font/google'
import localFont from 'next/font/local'

import { MakeswiftComponent } from '@makeswift/runtime/next'
import { getSiteVersion } from '@makeswift/runtime/next/server'
import clsx from 'clsx'

import { NAVIGATION_COMPONENT_TYPE } from '@/components/Navigation/Navigation.makeswift'
import { client } from '@/lib/makeswift/client'
import '@/lib/makeswift/components'
import { MakeswiftProvider } from '@/lib/makeswift/provider'

import './globals.css'

const nippo = localFont({
  src: '../public/Nippo-Variable.woff2',
  display: 'swap',
  variable: '--font-heading',
})

const supreme = localFont({
  src: '../public/Supreme-Variable.woff2',
  display: 'swap',
  variable: '--font-body',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Params
}>) {
  const langParam = params?.lang
  const lang = Array.isArray(langParam) ? langParam[0] : langParam
  const navigationSnapshot = await client.getComponentSnapshot(
    `navigation`, //id of the component rendered on the page
    { siteVersion: await getSiteVersion() }
  )

  return (
    <html lang={lang}>
      <body className={clsx(nippo.variable, supreme.variable, spaceMono.variable)}>
        <MakeswiftProvider siteVersion={await getSiteVersion()}>
          <MakeswiftComponent
            label="Navigation"
            snapshot={navigationSnapshot}
            type={NAVIGATION_COMPONENT_TYPE}
          />
          {children}
        </MakeswiftProvider>
      </body>
    </html>
  )
}
