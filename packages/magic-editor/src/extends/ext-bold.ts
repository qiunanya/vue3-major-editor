import type { Editor } from '@tiptap/vue-3'
import ExtensionBold from '@tiptap/extension-bold'
import CBold from '../components/bold/index.vue'
import BoldIcon from "../icons/bold-icon.svg"; 

const CustomBold = ExtensionBold.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: CBold,
                    componentProps: {
                        isActive: editor.isActive('bold'),
                        isReadonly: !editor.isEditable,
                        icons: 'bold-icon',
                        command: () => {
                            editor.commands.toggleBold()
                            console.log(editor.isActive('blod'))
                        }
                    }
                }
            }
        }
    },
})


export { CustomBold }