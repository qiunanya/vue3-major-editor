import type { Editor } from '@tiptap/vue-3'
import TiptapTextAlign from '@tiptap/extension-text-align'
import TextAlignPopselect from '@/components/text/TextAlignPopselect.vue'

const alignList = [
    {
        label: "左对齐",
        value: "left",
    },
    {
        label: "居中对齐",
        value: "center",
    },
    {
        label: "右对齐",
        value: "right",
    },
    {
        label: "两端对齐",
        value: "justify",
    },
]

const ExtensionTextAlign = TiptapTextAlign.extend({
    name: 'extensionTextAlign',
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: TextAlignPopselect,
                    componentProps: {
                        isActive: editor.isActive('extensionTextAlign'),
                        isReadonly: !editor.isEditable,
                        editor,
                        alignments: alignList,
                        tipText: '文本对齐方式',
                        command: (alignment:string) => {
                            editor.commands.setTextAlign(alignment)
                        }
                    }
                }
            }
        }
    }
})


export { ExtensionTextAlign }