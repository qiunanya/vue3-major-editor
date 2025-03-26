import type { Editor } from '@tiptap/vue-3'
import ExtensionUnderline from '@tiptap/extension-underline'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtUnderline = ExtensionUnderline.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('underline'),
                        isReadonly: !editor.isEditable,
                        icons: 'underline-icon',
                        tipText: '下划线',
                        command: () => {
                            editor.commands.toggleUnderline()
                        }
                    }
                }
            }
        }
    },
})


export { ExtUnderline }