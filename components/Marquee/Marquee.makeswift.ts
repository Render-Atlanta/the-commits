import { Checkbox, Group, Image, List, Number, Style, TextInput } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import Marquee from './Marquee'

export const props = {
  className: Style(),
  logos: List({
    label: 'Logos',
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
        logoWidth: Number({
          label: 'Width',
          defaultValue: 96,
          step: 4,
          suffix: 'px',
        }),
        mobileLogoWidth: Number({
          label: 'Mobile width',
          defaultValue: 64,
          step: 4,
          suffix: 'px',
        }),
      },
    }),
    getItemLabel(logo) {
      return logo?.logoAlt || 'Image'
    },
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
  gap: Number({
    label: 'Gap',
    defaultValue: 48,
    suffix: 'px',
    step: 4,
  }),
  fadeEdges: Checkbox({ label: 'Fade edges', defaultValue: false }),
}

runtime.registerComponent(Marquee, {
  type: 'Marquee',
  label: 'Marquee',
  icon: 'carousel',
  props,
})
