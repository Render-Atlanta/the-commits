import { Link, Select, Style, TextInput } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { LinkButton } from './Button'

export const props = {
  className: Style({ properties: [Style.Margin] }),
  link: Link({ label: 'Link' }),
  text: TextInput({ label: 'Text', defaultValue: 'Button', selectAll: true }),
  color: Select({
    label: 'Color',
    options: [
      { label: 'Black', value: 'black' },
      { label: 'White', value: 'white' },
    ],
    defaultValue: 'black',
  }),
}

runtime.registerComponent(LinkButton, { type: 'Button', label: 'Button', icon: 'button', props })
