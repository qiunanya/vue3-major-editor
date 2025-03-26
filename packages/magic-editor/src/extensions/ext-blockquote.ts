import type { Editor } from '@tiptap/vue-3'
import Blockquote from '@tiptap/extension-blockquote'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtBlockquote = Blockquote.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('blockquote'),
                        isReadonly: !editor.isEditable,
                        icons: 'blockquote-icon',
                        tipText: '引用',
                        command: () => {
                            editor.commands.toggleBlockquote()
                        }
                    }
                }
            }
        }
    },
})


export { ExtBlockquote }