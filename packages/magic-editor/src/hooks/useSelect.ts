import { inject } from 'vue'
import { Editor } from '@tiptap/vue-3'
import MajorEditor from '../core/MajorEditor'
import { EditorProps } from '../typings';

type MajorEditors = MajorEditor
export interface UseSelectCoreType {
    majorEditor: MajorEditors
    editor: Editor
    props: EditorProps
}
export const useSelectCore = ():UseSelectCoreType => {
    const majorEditor = inject('majorEditor') as MajorEditors;
    const editor = inject('editor') as Editor;
    const props = inject('props') as EditorProps;
    
    return {
        majorEditor,
        editor,
        props
    };
}