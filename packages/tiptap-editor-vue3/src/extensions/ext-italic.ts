import type { Editor } from '@tiptap/vue-3'
import ExtensionItalic from '@tiptap/extension-italic'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtItalic = ExtensionItalic.extend({
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


export { ExtItalic }