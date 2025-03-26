import type { Editor } from '@tiptap/vue-3'
import BulletList from '@tiptap/extension-bullet-list'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtBulletList = BulletList.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('bulletList'),
                        isReadonly: !editor.isEditable,
                        icons: 'bullet-list-icon',
                        tipText: '无序列表',
                        command: () => {
                            editor.commands.toggleBulletList()
                        }
                    }
                }
            }
        }
    },
})


export { ExtBulletList }