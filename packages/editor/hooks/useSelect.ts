import { inject } from 'vue'
import { Editor } from '@tiptap/vue-3'
import MajorEditor from '../core/MajorEditor'

type MajorEditors = MajorEditor
export interface UseSelectCoreType {
    majorEditor: MajorEditors,
    editor: Editor,
    content: string | undefined;
}
export const useSelectCore = ():UseSelectCoreType => {
    const majorEditor = inject('majorEditor') as MajorEditors;
    const editor = inject('editor') as Editor;
    const content = inject('content') as string;
    return {
        majorEditor,
        editor,
        content
    };
}