import { ComponentPublicInstance, createVNode, h, nextTick, ref, render, RendererElement, RendererNode, VNode, VNodeRef } from "vue";
import { Editor } from "@tiptap/core";
import ExtensionTable from "@tiptap/extension-table";
import Table from "@/components/table/Table.vue";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

const ExtTable = ExtensionTable.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }: { editor: Editor }) => {
                return {
                    component: Table,
                    componentProps: {
                        editor,
                        isReadonly: !editor.isEditable,
                        tipText: "表格",
                    },
                };
            },
        };
    },

    addExtensions() {
        return [TableCell, TableHeader, TableRow];
    },
    addProseMirrorPlugins() {
        // 访问内部实例
        const editor = this.editor;
        return [
            new Plugin({
                key: new PluginKey("eventHandler"),
                props: {
                    handleClick(view: EditorView, pos: number, event: MouseEvent) {
                        
                        // return true
                    },
                    handleDoubleClick(view, pos, event) {
                        /* … */
                    },
                    handlePaste(view, event, slice) {
                        /* … */
                    },
                    // 处理其他事件
                    handleDOMEvents: {
                        // 点击文本区域事件
                        click: (view, event) => {
                            // console.log('click:', view, event)
                           
                        },
                    },
                },
            }),
        ];
    },
}).configure({
    resizable: true,
});

export { ExtTable };
