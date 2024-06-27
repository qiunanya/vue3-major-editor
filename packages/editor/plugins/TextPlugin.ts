/**
 * TextPlugin
 */

import { Editor } from '@tiptap/vue-3';
import MajorEditor from '../core/MajorEditor';
import { Level } from "@tiptap/extension-heading";

type MajorEditors = MajorEditor
interface TextStyleOptions {
    level?: Level;
    color?: string;
    lineHeight?: string | number;
}
type keyOptins = 
| 'Bold'
| 'Italic'
| 'Underline'
| 'Strike'
| 'Code'
| 'HorizontalRule'
| 'Blockquote'
| 'BulletList'
| 'OrderedList'
| 'Paragraph'
| 'CodeBlock'
| 'lineHeight'
| 'Color'
| 'Heading'
| 'backgroundColor';

class TextPlugin {
    public majorEditor: MajorEditors | null = null;
    public editor: Editor;
    static pluginName = "TextPlugin";
    static apis = ['setTextStyle']
    constructor(majorEditor:MajorEditors, editor:Editor) {
        this.majorEditor = majorEditor;
        this.editor = editor;
        this.init()
    }
    init () {
        // this.editor?.on('focus', ({ editor, event}) => {
        //     console.log(this.editor.isActive('code'), event, 'focus');
        // })
        // 监听选择事件
        // this.editor?.on('selectionUpdate', ({ editor }) => {

        //     console.log(this.editor.isActive('code'), 'selectionUpdate');
        // })
    }
    setTextStyle (key?: keyOptins, _opts?: TextStyleOptions) {
        if (this.editor) {
            const chain = this.editor.chain().focus()
            switch (key) {
                case 'Bold':
                    // 该命令会失去focus，需要重新选择才能设置效果
                    // this.editor.commands.setBold()
                    // 链式调用比单个函数更端，不会失去focus，设置后可以继续编辑内容
                    chain.toggleBold().run()
                    break;
                case 'Italic':
                    chain.toggleItalic().run()
                    break;
                case 'Underline':
                    chain.toggleUnderline().run()
                    break;
                case 'Strike':
                    chain.toggleStrike().run()
                    break;
                case 'Code':
                    chain.toggleCode().run()
                    break;
                case 'HorizontalRule':
                    chain.setHorizontalRule().run()
                    break;
                case 'Blockquote':
                    chain.toggleBlockquote().run()
                    break;
                case 'BulletList':
                    chain.toggleBulletList().run()
                    break;
                case 'OrderedList':
                    chain.toggleOrderedList().run()
                    break;
                case 'Paragraph':
                    chain.setParagraph().run()
                    break;
                case 'CodeBlock':
                    chain.toggleCodeBlock().run()
                    break;
                case 'lineHeight':
                    if (_opts?.lineHeight) {
                        chain.setLineHeight(_opts?.lineHeight).run()
                    }
                    break;
                case 'Color':
                    if (_opts?.color) {
                        chain.setColor(_opts?.color).run()
                    }
                    break;
                case 'Heading':
                    if (_opts?.level) {
                        chain.toggleHeading({ level: _opts.level }).run()
                    }
                    break;
                default:
                    break;
            }
        }
    }

}

export default TextPlugin