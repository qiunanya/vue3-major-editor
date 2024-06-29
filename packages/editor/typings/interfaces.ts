export interface EditorProps {
    imageInner?: boolean;
    isEnable: boolean;
    isShowToolbar: boolean;
}

export interface ContextMenuItem {
    label: string;
    action: string;
}

export interface ContextMenuOptions {
    type: string;
    tipText: string;
    children: Array<ContextMenuItem>;
    event: MouseEvent;
    click: Function;
}
