import type { Editor } from '@tiptap/vue-3'
import TiptapItalic from '@tiptap/extension-italic'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtensionItalic = TiptapItalic.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('italic'),
                        isReadonly: !editor.isEditable,
                        icons: 'italic-icon',
                        shortcutKeys: 'Ctrl+I',
                        tipText: '斜体',
                        command: () => {
                            editor.commands.toggleItalic()
                        }
                    }
                }
            }
        }
    },
})


export { ExtensionItalic }