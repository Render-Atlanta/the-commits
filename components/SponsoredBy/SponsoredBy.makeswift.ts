import { Style, TextInput } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { SponsoredBy } from './SponsoredBy'

const description = `
A sponsor wall for the companies behind The Commits. Logos stay in the site's white-on-black type color and wrap instead of widening the page.

**Add it to the page:** in the Makeswift builder, search for **Sponsored by** and drop it on the page.

The heading defaults to "Sponsored by".
`.trim()

runtime.registerComponent(SponsoredBy, {
  type: 'sponsored-by',
  label: 'Sponsored by',
  icon: 'image',
  description,
  props: {
    className: Style(),
    heading: TextInput({
      label: 'Heading',
      defaultValue: 'Sponsored by',
      selectAll: true,
    }),
  },
})
