import { JSONContent } from '@tiptap/vue-3'
interface EditorProps {
    imageInner?: boolean;
    isEnable?: boolean;
    isShowToolbar?: boolean;
}

interface ContextMenuItem {
    label: string;
    action: string;
}

interface ContextMenuOptions {
    type: string;
    tipText: string;
    children: Array<ContextMenuItem>;
    event: MouseEvent;
    click: Function;
}

interface HTMLVue3TiptapEditorElement {
    getHTML: () => string
    getJSON: () => JSONContent
    getTEXT: () => string
    destroy: () => void
}

export type {
    EditorProps,
    ContextMenuItem,
    ContextMenuOptions,
    HTMLVue3TiptapEditorElement
}
