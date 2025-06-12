import TiptapHeading, { Level } from '@tiptap/extension-heading'
import HeadingPopselect from '@/components/text/HeadingPopselect.vue'
import { Editor } from '@tiptap/vue-3'

function getHeading () {
    let arr = [];
    let i = 0;
    while (i < 7) {
        if (i === 6) {
            arr.push({ label: `正文`, value: `${i + 1}`, disabled: false })
        } else {
            const num = i + 1
            arr.push({ label: `H${num} 标题 ${num}`, value: `${num}`, disabled: false })
        }
        i++;
    }
    return arr
}

export const ExtensionHeading = TiptapHeading.extend({
    name: 'extensionHeading',
    addOptions() {
        return {
            ...this.parent?.(),
            levels: [1, 2, 3, 4, 5, 6] as Level[],
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: HeadingPopselect,
                    componentProps: {
                        isActive: editor.isActive('extensionHeading'),
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
