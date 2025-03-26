import type { Editor } from '@tiptap/vue-3'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtHorizontalRule = HorizontalRule.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('horizontalRule'),
                        isReadonly: !editor.isEditable,
                        icons: 'horizontal-rule-icon',
                        tipText: '水平分隔符',
                        command: () => {
                            editor.commands.setHorizontalRule()
                        }
                    }
                }
            }
        }
    },
})


export { ExtHorizontalRule }
export default ExtHorizontalRule