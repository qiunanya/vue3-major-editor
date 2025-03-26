import Heading, { Level } from '@tiptap/extension-heading'

export const ExtHeading = Heading.extend({
    name: 'customHeading',
    addOptions() {
        return {
            ...this.parent?.(),
            levels: [1, 2, 3, 4] as Level[]
        }
    },
})
