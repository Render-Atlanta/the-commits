import { Checkbox, Group, Image, List, Number, Style, TextInput } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import Marquee from './Marquee'

export const props = {
  className: Style(),
  items: List({
    label: 'Items',
    type: Group({
      label: 'Logo',
      props: {
        logoImage: Image({
          label: 'Logo',
          format: Image.Format.WithDimensions,
        }),
        logoAlt: TextInput({
          label: 'Logo alt text',
          defaultValue: 'Image',
          selectAll: true,
        }),
        text: TextInput({
          label: 'Text',
          defaultValue: 'The Commits',
          selectAll: true,
        }),
      },
    }),
    getItemLabel(item) {
      return item?.text || 'Item'
    },
  }),
  fontSize: Number({
    label: 'Font size',
    defaultValue: 20,
    step: 1,
    suffix: 'vw',
  }),
  repeat: Number({
    label: 'Repeat',
    defaultValue: 4,
    step: 1,
  }),
  reverse: Checkbox({ label: 'Reverse', defaultValue: false }),
  pauseOnHover: Checkbox({ label: 'Pause on hover', defaultValue: false }),
  duration: Number({
    label: 'Animation duration',
    defaultValue: 20,
    suffix: 's',
  }),
  fadeEdges: Checkbox({ label: 'Fade edges', defaultValue: false }),
}

runtime.registerComponent(Marquee, {
  type: 'Marquee',
  label: 'Marquee',
  icon: 'carousel',
  props,
})
