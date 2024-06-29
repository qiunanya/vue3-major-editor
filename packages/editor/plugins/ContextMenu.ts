/**
 * ContextMenu
 */

import { Editor } from '@tiptap/vue-3';
import MajorEditor from '../core/MajorEditor';
// 导入props参数类型
import { ContextMenuOptions } from '../typings/interfaces';

type MajorEditors = MajorEditor
import '../style/ctxmenu.scss'

class ContextMenu {
    public majorEditor: MajorEditors | null = null;
    public editor: Editor;
    public callBack!: Function;
    static pluginName = "ContextMenu";
    static apis = ['showContextMenu', 'hideContextMenu']
    static events = []
    public ctxmenu: HTMLElement | null = null;
    constructor(majorEditor:MajorEditors, editor:Editor) {
        this.majorEditor = majorEditor;
        this.editor = editor;
    }

    showContextMenu (menu: ContextMenuOptions,callBack:Function) {
        this.callBack = callBack
        this.hideContextMenu()
        this._renderMenu(menu)
    }

    hideContextMenu(event?: MouseEvent) {
        if (this.ctxmenu) {
            document.body.removeChild(this.ctxmenu)
            this.ctxmenu = null
        }
    }

    _renderMenu (menu:ContextMenuOptions) {
        const { clientX, clientY } = menu.event
        this.ctxmenu = document.createElement('div')
        this.ctxmenu.style.left = `${clientX}px`;
        this.ctxmenu.style.top = `${clientY}px`;
        this.ctxmenu.classList.add('cus-contextmenu__body')
        const p = document.createElement('p')
        p.innerHTML = menu.tipText
        this.ctxmenu.appendChild(p)
        // 创建操作菜单
        this.ctxmenu.append(this._getItem(menu.children, menu))
        document.body.append(this.ctxmenu)
    }
    _getItem (items: Array<Record<string, any>>, menu:ContextMenuOptions) {
        // 创建操作菜单
        const UL = document.createElement('ul')
        for (let i = 0; i < items.length; i++) {
            const el = items[i]
            const li = document.createElement('li');
            li.classList.add('item')
            li.innerHTML = el.label;
            li.onclick= (ev:MouseEvent) => {
                menu.click(ev, el)
                this.hideContextMenu()
            }
            UL.appendChild(li)
        }
        return UL;
    }
    destroy () {

    }
}

export default ContextMenu