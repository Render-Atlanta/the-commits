import { Group, Link, List, Number, Select, Style, TextInput } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { ButtonGroup } from './ButtonGroup'

export const props = {
  className: Style(),
  buttons: List({
    label: 'Buttons',
    type: Group({
      props: {
        text: TextInput({ label: 'Text', defaultValue: 'Button', selectAll: true }),
        link: Link({ label: 'Link' }),
        color: Select({
          label: 'Color',
          options: [
            { label: 'Black', value: 'black' },
            { label: 'White', value: 'white' },
          ],
          defaultValue: 'black',
        }),
      },
    }),
    getItemLabel(button) {
      return button?.text ?? 'Button'
    },
  }),
  gap: Number({ label: 'Gap', defaultValue: 20, step: 1, suffix: 'px' }),
}

runtime.registerComponent(ButtonGroup, {
  type: 'ButtonGroup',
  label: 'Button Group',
  icon: 'button',
  props,
})
