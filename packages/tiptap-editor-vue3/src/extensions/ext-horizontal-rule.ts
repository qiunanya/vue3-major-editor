import type { Editor } from '@tiptap/vue-3'
import TipTapHorizontalRule from '@tiptap/extension-horizontal-rule'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtensionHorizontalRule = TipTapHorizontalRule.extend({
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


export { ExtensionHorizontalRule }