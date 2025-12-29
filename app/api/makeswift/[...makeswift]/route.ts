import { MakeswiftApiHandler } from '@makeswift/runtime/next/server'
import { strict } from 'assert'

import '@/lib/makeswift/components'
import { runtime } from '@/lib/makeswift/runtime'

strict(process.env.MAKESWIFT_SITE_API_KEY, 'MAKESWIFT_SITE_API_KEY is required')

const handler = MakeswiftApiHandler(process.env.MAKESWIFT_SITE_API_KEY, {
  runtime,
  apiOrigin: process.env.NEXT_PUBLIC_MAKESWIFT_API_ORIGIN,
  appOrigin: process.env.NEXT_PUBLIC_MAKESWIFT_APP_ORIGIN,
  getFonts() {
    return [
      {
        family: 'var(--font-heading)',
        label: 'Nippo',
        variants: [
          { weight: '300', style: 'normal' },
          { weight: '400', style: 'normal' },
        ],
      },
      {
        family: 'var(--font-body)',
        label: 'Supreme',
        variants: [
          { weight: '300', style: 'normal' },
          { weight: '400', style: 'normal' },
        ],
      },
    ]
  },
})

export { handler as GET, handler as POST, handler as OPTIONS }
