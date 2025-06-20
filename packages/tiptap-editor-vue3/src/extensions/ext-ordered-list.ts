import type { Editor } from '@tiptap/vue-3'
import TiptapOrderedList from '@tiptap/extension-ordered-list'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtensionOrderedList = TiptapOrderedList.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('orderedList'),
                        isReadonly: !editor.isEditable,
                        icons: 'ordered-list-icon',
                        tipText: '有序列表',
                        command: () => {
                            editor.commands.toggleOrderedList()
                        }
                    }
                }
            }
        }
    },
})


export { ExtensionOrderedList }