import type { Editor } from '@tiptap/vue-3'
import ExtensionBold from '@tiptap/extension-bold'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtBold = ExtensionBold.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('bold'),
                        isReadonly: !editor.isEditable,
                        icons: 'bold-icon',
                        tipText: '加粗',
                        shortcutKeys: 'Ctrl+B',
                        command: () => {
                            editor.commands.toggleBold()
                        }
                    }
                }
            }
        }
    },
})


export { ExtBold }