import { VueNodeViewRenderer, type Editor } from '@tiptap/vue-3'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import ButtonIcon from '../components/ButtonIcon.vue'
import CodeBlockComponent from '@/components/CodeBlockLowlight.vue'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'

// create a lowlight instance
const lowlights = createLowlight(all)

// you can also register languages
lowlights.register('html', html)
lowlights.register('css', css)
lowlights.register('js', js)
lowlights.register('ts', ts)

const ExtCodeBlockLowlight = CodeBlockLowlight.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('codeBlock'),
                        isReadonly: !editor.isEditable,
                        icons: 'code-block-icon',
                        tipText: '代码块',
                        command: () => {
                            editor.commands.toggleCodeBlock()
                        }
                    }
                }
            }
        }
    },
    addNodeView() {
        return VueNodeViewRenderer(CodeBlockComponent)
    }
}).configure({lowlight:lowlights})


export { ExtCodeBlockLowlight }