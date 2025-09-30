import { lazy } from 'react'

import { Group, List, RichText, Select, Slot, Style } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  lazy(() => import('./Accordions')),
  {
    type: 'accordions',
    label: 'Accordions',
    props: {
      className: Style(),
      accordions: List({
        label: 'Accordions',
        type: Group({
          props: {
            title: RichText({ mode: RichText.Mode.Inline }),
            body: Slot(),
          },
        }),
        getItemLabel() {
          return 'Slot'
        },
      }),
      type: Select({
        label: 'Type',
        options: [
          { label: 'Single', value: 'single' },
          { label: 'Multiple', value: 'multiple' },
        ],
        defaultValue: 'multiple',
      }),
    },
  }
)
