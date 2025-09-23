import { Group, Link, List, Style, TextInput } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { LinkList } from './LinkList'

export const props = {
  className: Style(),
  links: List({
    label: 'Links',
    type: Group({
      props: {
        text: TextInput({ label: 'Text', defaultValue: 'Link', selectAll: true }),
        link: Link({ label: 'Link' }),
      },
    }),
    getItemLabel(link) {
      return link?.text ?? 'Link'
    },
  }),
}

runtime.registerComponent(LinkList, {
  type: 'LinkList',
  label: 'Link List',
  icon: 'button',
  props,
})
