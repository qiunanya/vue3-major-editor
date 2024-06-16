/**
 * TextPlugin
 */

import { Editor } from '@tiptap/vue-3';
import MajorEditor from '../core/MajorEditor';

type MajorEditors = MajorEditor

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
    setTextStyle (key?: string, _size?: number) {
        if (this.editor) {
            switch (key) {
                case 'Bold':
                    this.editor.chain().focus().toggleBold().run()
                    break;
                case 'Italic':
                    this.editor.chain().focus().toggleItalic().run()
                    break;
                case 'Strike':
                    this.editor.chain().focus().toggleStrike().run()
                    break;
                case 'Code':
                    this.editor.chain().focus().toggleCode().run()
                    break;
                case 'HorizontalRule':
                    this.editor.chain().focus().setHorizontalRule().run()
                    break;
                default:
                    break;
            }
        }
    }
}

export default TextPlugin