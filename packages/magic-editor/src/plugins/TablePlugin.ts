/**
 * TablePlugin
 */

import { Editor } from '@tiptap/vue-3';
import MajorEditor from '../core/MajorEditor';
import { ContextMenuItem } from '../typings';

type MajorEditors = MajorEditor
import '../style/ctxmenu.scss'

class TablePlugin {
    public majorEditor: MajorEditors | null = null;
    public editor: Editor;
    static pluginName = "TablePlugin";
    static apis = []
    static events = []
    constructor(majorEditor:MajorEditors, editor:Editor) {
        this.majorEditor = majorEditor;
        this.editor = editor;
        this.init()
    }
    init () {
        // this.editor.view.dom.addEventListener('contextmenu', this.contextListener.bind(this))
    }
    contextListener(event: MouseEvent) {
        if (this.editor.isActive('table') && event.button === 2 && this.majorEditor) {
            event.preventDefault()
            this.majorEditor.showContextMenu({
                type: 'Table',
                tipText: '表格操作',
                event,
                click: this._onMenuClick.bind(this),
                children: this._getCtxMenuItem()
            }, this.callBack)
        }
    }
    _getCtxMenuItem () {
        return [
            {
                label: '删除表格',
                action: 'deleteTable'
            },
            {
                label: '向前添加一行',
                action: 'addRowBefore',
            },
            {
                label: '向后添加一行',
                action: 'addRowAfter',
            },
            {
                label: '向前添加一列',
                action: 'addColumnBefore',
            },
            {
                label: '向后添加一列',
                action: 'addColumnAfter',
            },
            {
                label: '删除当前列',
                action: 'deleteColumn',
            },
            {
                label: '合并列',
                action: 'mergeCells',
            },
            {
                label: '分割列',
                action: 'splitCell',
            }
        ]
    }

    _onMenuClick(evt: MouseEvent, el:ContextMenuItem) {
        this._actionTable(evt, el)
    }

    _actionTable(evt: MouseEvent, el:ContextMenuItem) {
        const chian = this.editor.chain().focus()
        const filterArr = this._getCtxMenuItem()
        if (typeof el.action == 'string' && filterArr.some(e => e.action === el.action)) {
            (chian as any)[el.action]().run()
        }
    }

    callBack () {
        console.log('callBack');
        
    }

    destroy () {
        this.editor.view.dom.removeEventListener('contextmenu', this.contextListener)
    }
}

export default TablePlugin