import type { Editor } from '@tiptap/vue-3'
import ExtensionStrike from '@tiptap/extension-strike'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtStrike = ExtensionStrike.extend({
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
                        command: () => {
                            editor.commands.toggleStrike()
                        }
                    }
                }
            }
        }
    },
})


export { ExtStrike }