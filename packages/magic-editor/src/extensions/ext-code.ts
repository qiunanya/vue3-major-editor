import type { Editor } from '@tiptap/vue-3'
import ExtensionCode from '@tiptap/extension-code'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtCode = ExtensionCode.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('code'),
                        isReadonly: !editor.isEditable,
                        icons: 'code-bg-icon',
                        tipText: '文本标签',
                        command: () => {
                            editor.commands.toggleCode()
                        }
                    }
                }
            }
        }
    },
})


export { ExtCode }