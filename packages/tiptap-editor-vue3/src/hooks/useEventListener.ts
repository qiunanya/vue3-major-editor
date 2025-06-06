import { Editor } from "@tiptap/vue-3";
import { onMounted } from "vue";

export function useEventListener(editor?:Editor) {
    const editors = editor

    onMounted(() => {
        editors?.on('selectionUpdate', ({editor,transaction}) => {
            // The selection has changed.
            const { selection }  = editor.state
            if (selection.from !== selection.to) {
                // console.log('selectionUpdate:', editor)
            }
        })
        // setTimeout(() => {
        //     editor.commands.setTextSelection({ from: 36, to: 52})
        // editor.commands.focus(); // 确保编辑器获得焦点
        // 当常规方法失效时，强制创建新选区
            // const tr = editor.state.tr.setSelection(
            //     TextSelection.create(editor.state.doc, 36, 52)
            // );
            // editor.view.dispatch(tr);
            // editor.commands.focus()
        // }, 500)
    })
}