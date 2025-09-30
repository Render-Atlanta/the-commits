import { lazy } from 'react'

import { Group, List, Select, Slot, Style, TextInput } from '@makeswift/runtime/controls'

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
            title: TextInput({ label: 'Title', defaultValue: 'Title', selectAll: true }),
            body: Slot(),
          },
        }),
        getItemLabel(accordion) {
          return accordion?.title ?? 'Title'
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
