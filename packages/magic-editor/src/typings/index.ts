import { JSONContent } from '@tiptap/vue-3'
interface EditorProps {
    imageInner?: boolean;
    isEnable?: boolean;
    isShowToolbar?: boolean;
    characterCount?: number
    placeholder?: string
}

interface ContextMenuItem {
    label: string;
    action: string;
}

interface ContextMenuOptions {
    type?: string;
    tipText: string;
    children?: Array<ContextMenuItem>;
    event: MouseEvent;
    click: Function;
    label?: string
}

type TableContextMenuItem = Pick<ContextMenuOptions, "type"|"children"|"label"> & { key: string,command?:Function, render?:Function}

interface ITableContextMenuItem {
    children?: ITableContextMenuItem[]
    label?: string
    type?: string
    key: string
    command?:Function
    render?:Function
}

interface HTMLVue3TiptapEditorElement {
    getHTML: () => string
    getJSON: () => JSONContent
    getTEXT: () => string
    destroy: () => void
}

export type {
    TableContextMenuItem,
    ITableContextMenuItem,
    EditorProps,
    ContextMenuItem,
    ContextMenuOptions,
    HTMLVue3TiptapEditorElement
}
