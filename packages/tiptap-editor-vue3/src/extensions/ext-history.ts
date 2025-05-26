import type { Editor } from '@tiptap/vue-3'
import ExtensionHistory from '@tiptap/extension-history'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtHistory = ExtensionHistory.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return [
                    {
                        component: ButtonIcon,
                        componentProps: {
                            isActive: editor && editor.can().chain().focus().redo().run() || false,
                            isReadonly: !editor.isEditable,
                            icons: 'redo-icon',
                            tipText: '重做',
                            command: () => {
                                editor.commands.redo()
                            }
                        }
                    },
                    {
                        component: ButtonIcon,
                        componentProps: {
                            isActive: editor && editor.can().chain().focus().undo().run() || false,
                            isReadonly: !editor.isEditable,
                            icons: 'undo-icon',
                            tipText: '撤销',
                            command: () => {
                                editor.commands.undo()
                            }
                        }
                    }
                ]
            }
        }
    },
})


export { ExtHistory }