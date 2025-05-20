import Heading, { Level } from '@tiptap/extension-heading'
import HeadingPopselect from '@/components/HeadingPopselect.vue'
import { Editor } from '@tiptap/vue-3'

function getHeading () {
    let arr = [];
    let i = 0;
    while (i < 7) {
        if (i === 6) {
            arr.push({ label: `正文`, value: `${i + 1}`, disabled: false })
        } else {
            arr.push({ label: `H${i + 1}`, value: `${i + 1}`, disabled: false })
        }
        i++;
    }
    return arr
}

export const ExtHeading = Heading.extend({
    name: 'extHeading',
    addOptions() {
        return {
            ...this.parent?.(),
            levels: [1, 2, 3, 4, 5, 6] as Level[],
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: HeadingPopselect,
                    componentProps: {
                        isActive: editor.isActive('heading'),
                        isReadonly: !editor.isEditable,
                        editor,
                        levels: getHeading(),
                        tipText: '设置标题',
                    }
                }
            }
        }
    },
})
