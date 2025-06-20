import type { Editor } from '@tiptap/vue-3'
import TiptapSubscript from '@tiptap/extension-subscript'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtensionSubscript = TiptapSubscript.extend({
    name: 'Subscript',
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('Subscript'),
                        isReadonly: !editor.isEditable,
                        icons: 'subscript-icon',
                        tipText: '下标',
                        command: () => {
                            editor.commands.toggleSubscript()
                        }
                    }
                }
            }
        }
    },
    addAttributes(){
        return {
            class:{
                default: 'custom-subscript-class'
            }
        }
    }
})


export { ExtensionSubscript }