import {
  Group,
  Image,
  Link,
  List,
  Select,
  Style,
  TextArea,
  TextInput,
} from '@makeswift/runtime/controls'

import { AWARD_CATEGORIES, type AwardCategory } from '@/components/PastWinners/award-categories'
import { runtime } from '@/lib/makeswift/runtime'

import { PastWinnersCarousel } from './PastWinnersCarousel'

const categoryOptions = [...AWARD_CATEGORIES] as unknown as readonly [
  { readonly value: AwardCategory; readonly label: string },
  ...{ readonly value: AwardCategory; readonly label: string }[],
]

const description = `
A homepage carousel of past award winners. Cards stay in year order, newest first, then by category. Previous and next move one card at a time. The row also scrolls by swipe or trackpad.

**Add it to the homepage:** in the Makeswift builder, search for **Past Winners Carousel** and drop it on the page.

**Add a winner:** open the Winners list and add an item. The card links to the project URL. Social icons appear only when that URL is set.

Leave **Year filter** blank to include every year.

Placeholder winners for preview:

1. **Example Winner** — Example Library — Commit of the Year — 2026 — LinkedIn
2. **Example Collective** — Example Framework — Maintainer of the Year — 2026
3. **Example Contributor** — Example Docs — Documentation & Design Excellence — 2025 — X and Instagram
`.trim()

runtime.registerComponent(PastWinnersCarousel, {
  type: 'past-winners-carousel',
  label: 'Past Winners Carousel',
  icon: 'carousel',
  description,
  props: {
    className: Style(),
    heading: TextInput({
      label: 'Heading',
      defaultValue: 'Past Winners',
      selectAll: true,
    }),
    intro: TextArea({
      label: 'Intro',
      defaultValue: 'The builders, maintainers, and projects honored in previous years.',
      rows: 3,
    }),
    yearFilter: TextInput({
      label: 'Year filter',
      description: 'Optional. Leave blank to show every year, newest first.',
    }),
    winners: List({
      label: 'Winners',
      description:
        'Each item is one winner. The card links to the project URL. LinkedIn, X, and Instagram are optional.',
      type: Group({
        label: 'Winner',
        props: {
          name: TextInput({
            label: 'Winner name',
            defaultValue: 'Winner name',
            selectAll: true,
          }),
          project: TextInput({
            label: 'Project name',
            defaultValue: 'Project name',
            selectAll: true,
          }),
          category: Select({
            label: 'Award category',
            options: categoryOptions,
            defaultValue: 'commit-of-the-year',
          }),
          year: TextInput({
            label: 'Year',
            defaultValue: '2026',
            selectAll: true,
          }),
          image: Image({
            label: 'Image',
            format: Image.Format.WithDimensions,
          }),
          imageAlt: TextInput({
            label: 'Image alt text',
            defaultValue: 'Winner photo',
            selectAll: true,
          }),
          projectLink: Link({
            label: 'Project URL',
            description: 'Opens in a new tab when the card is clicked.',
          }),
          linkedin: Link({
            label: 'LinkedIn URL',
            description: 'Optional. The icon is hidden when this is empty.',
          }),
          x: Link({
            label: 'X URL',
            description: 'Optional. The icon is hidden when this is empty.',
          }),
          instagram: Link({
            label: 'Instagram URL',
            description: 'Optional. The icon is hidden when this is empty.',
          }),
        },
      }),
      getItemLabel(winner) {
        const name = winner?.name?.trim()
        const year = winner?.year?.trim()
        if (name && year) return `${name} · ${year}`
        return name || 'Winner'
      },
    }),
  },
})
