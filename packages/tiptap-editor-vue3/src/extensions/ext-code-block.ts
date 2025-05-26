import type { Editor } from '@tiptap/vue-3'
import ExtensionCodeBlock from '@tiptap/extension-code-block'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtCodeBlock = ExtensionCodeBlock.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('codeBlock'),
                        isReadonly: !editor.isEditable,
                        icons: 'code-block-icon',
                        tipText: '代码块',
                        shortcutKeys: 'Ctrl+Alt+C',
                        command: () => {
                            editor.commands.toggleCodeBlock()
                        }
                    }
                }
            }
        }
    },
})


export { ExtCodeBlock }