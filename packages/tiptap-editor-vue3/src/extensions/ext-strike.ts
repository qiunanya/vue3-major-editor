import type { Editor } from '@tiptap/vue-3'
import TiptapStrike from '@tiptap/extension-strike'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtensionStrike = TiptapStrike.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('strike'),
                        isReadonly: !editor.isEditable,
                        icons: 'strike-icon',
                        tipText: '删除线',
                        shortcutKeys: 'Ctrl+Shift+S',
                        command: () => {
                            editor.commands.toggleStrike()
                        }
                    }
                }
            }
        }
    },
})


export { ExtensionStrike }