import type { Editor } from '@tiptap/vue-3'
import TiptapSuperscript from '@tiptap/extension-superscript'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtensionSuperscript = TiptapSuperscript.extend({
    name: 'Superscript',
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('Superscript'),
                        isReadonly: !editor.isEditable,
                        icons: 'superscript-icon',
                        tipText: '上标',
                        command: () => {
                            editor.commands.toggleSuperscript()
                        }
                    }
                }
            }
        }
    },
    addAttributes(){
        return {
            // class:{
            //     default: 'custom-superscript-class'
            // }
        }
    }
})


export { ExtensionSuperscript }