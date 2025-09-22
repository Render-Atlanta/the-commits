import { Color, Select, Style, TextInput } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { AnimatedEyebrowText } from './AnimatedEyebrowText'

export const props = {
  className: Style({ properties: [Style.Margin] }),
  text: TextInput({ label: 'Text', defaultValue: 'Heading', selectAll: true }),
  color: Color({
    label: 'Color',
    defaultValue: '#CC9933',
  }),
  align: Select({
    label: 'Align',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
    defaultValue: 'left',
  }),
}

runtime.registerComponent(AnimatedEyebrowText, {
  type: 'AnimatedEyebrowText',
  label: 'Animated Eyebrow Text',
  icon: 'text',
  props,
})
