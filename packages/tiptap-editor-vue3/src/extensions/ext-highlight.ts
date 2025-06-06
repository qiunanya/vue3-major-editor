import type { Editor } from '@tiptap/vue-3'
import Highlight from '@tiptap/extension-highlight'
import ButtonIcon from '../components/ButtonIcon.vue'

const ExtHighlight = Highlight.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('highlight'),
                        isReadonly: !editor.isEditable,
                        icons: 'highlight-icon',
                        tipText: '高亮',
                        command: () => {
                            editor.commands.toggleHighlight()
                        }
                    }
                }
            }
        }
    },
    addAttributes() {
        return {
            ...this.parent?.(),
            // 不直接渲染，仅存储值
            myColor: {
                default: '#fafa27',
                renderHTML: () => ({}) 
            },
            color: {
                renderHTML:(attributes:Record<string, any>) => {
                    return {
                        style: `color:#333;background-color:#fafa27;`
                    }
                }
            },
            // 这样添加属性会自动与其他属性合并渲染到当前标签                                                                                                                              
            padding: {
                renderHTML(attributes:Record<string, any>) {
                    return {
                        style: `padding: 1px;`
                    }
                }
            },
        }
    },
})


export { ExtHighlight }