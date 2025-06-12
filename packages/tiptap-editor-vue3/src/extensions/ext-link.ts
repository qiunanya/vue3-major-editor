import { getMarkRange } from "@tiptap/core";
import type { Editor } from "@tiptap/core";
import TiptapLink from "@tiptap/extension-link";
import { Plugin, TextSelection } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import AddLink from "@/components/link/AddLinkButton.vue";

const ExtensionLink = TiptapLink.extend({
    // link默认优先级最高，默认1000，这回导致扩展优先加载并显示在最前面
    priority: 100,
    addOptions() {
        return {
            ...this.parent?.(),
            onClick: ({ editor }: { editor: Editor }) => {
                return {
                    component: AddLink,
                    componentProps: {
                        editor,
                        isActive: editor.isActive("link"),
                        isReadonly: !editor.isEditable,
                        icons: "bold-icon",
                        tipText: "超链接",
                    },
                };
            },
        };
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleClick(view: EditorView, pos: number) {
                        const { schema, doc, tr } = view.state;

                        const range = getMarkRange(doc.resolve(pos), schema.marks.link);

                        if (!range) return false;

                        const $start = doc.resolve(range.from);
                        const $end = doc.resolve(range.to);

                        const transaction = tr.setSelection(new TextSelection($start, $end));

                        view.dispatch(transaction);
                        return true;
                    },
                },
            }),
        ];
    },
}).configure({
    openOnClick: true,
    // protocols: ['http', 'https', 'ftp'],
    validate: (text) => true,
})

export { ExtensionLink };
