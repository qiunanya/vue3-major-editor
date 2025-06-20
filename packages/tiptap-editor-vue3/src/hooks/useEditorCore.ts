import { inject } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { EditorProps } from '../typings';

export interface UseEditorCoreType {
    editor: Editor
    props: EditorProps
}
export const useEditorCore = ():UseEditorCoreType => {
    const editor = inject('editor') as Editor;
    const props = inject('props') as EditorProps;
    
    return {
        editor,
        props
    };
}