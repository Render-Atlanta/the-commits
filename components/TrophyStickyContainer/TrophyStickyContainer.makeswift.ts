import { Group, List, Slot, Style, TextInput } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { TrophyStickyContainer } from './TrophyStickyContainer'

export const props = {
  className: Style(),
  sections: List({
    label: 'Sections',
    type: Group({
      props: {
        children: Slot(),
        label: TextInput({ label: 'Label', defaultValue: 'Section' }),
      },
    }),
    getItemLabel(item) {
      return item?.label ?? 'Section'
    },
  }),
}

runtime.registerComponent(TrophyStickyContainer, {
  type: 'TrophyStickyContainer',
  label: 'Trophy Sticky Container',
  icon: 'layout',
  props,
})
