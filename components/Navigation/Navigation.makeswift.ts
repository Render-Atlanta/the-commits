import { Group, Image, Link, Number, TextInput } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { props as ButtonProps } from '../Button/Button.makeswift'
import { Navigation } from './Navigation'

export const NAVIGATION_COMPONENT_TYPE = 'navigation'

runtime.registerComponent(Navigation, {
  label: 'Navigation',
  type: NAVIGATION_COMPONENT_TYPE,
  icon: 'navigation',
  hidden: true,
  props: {
    logo: Group({
      label: 'Logo',
      preferredLayout: Group.Layout.Popover,
      props: {
        image: Image({
          label: 'Image',
          format: Image.Format.WithDimensions,
        }),
        alt: TextInput({
          label: 'Alt text',
          defaultValue: 'Image',
          selectAll: true,
        }),
        width: Number({ label: 'Width', defaultValue: 140, step: 4, suffix: 'px' }),
        link: Link({ label: 'Link' }),
      },
    }),
    text: TextInput({ label: 'Text', defaultValue: 'August 25, 2025', selectAll: true }),
    cta: Group({
      label: 'CTA',
      preferredLayout: Group.Layout.Popover,
      props: {
        text: ButtonProps.text,
        link: ButtonProps.link,
        color: ButtonProps.color,
      },
    }),
  },
})
