import type { Editor } from '@tiptap/vue-3'
import ExtensionSuperscript from '@tiptap/extension-superscript'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtSuperscript = ExtensionSuperscript.extend({
    name: 'Superscript',
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('superscript'),
                        isReadonly: !editor.isEditable,
                        icons: 'superscript-icon',
                        tipText: '上标',
                        command: () => {
                            editor.commands.toggleSuperscript()
                        }
                    }
                }
            }
        }
    },
})


export { ExtSuperscript }