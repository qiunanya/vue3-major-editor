import type { Editor } from '@tiptap/core'
import ExtensionBold from '@tiptap/extension-bold'
import CBold from '../components/bold/index.vue'

const CustomBold = ExtensionBold.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: CBold,
                    componentProps: {
                        isActive: true,
                        command: () => {
                            editor.commands.toggleBold()
                        }
                    }
                }
            }
        }
    },
})


export { CustomBold }