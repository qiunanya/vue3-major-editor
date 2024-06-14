import { inject } from 'vue'

export function useSelectCore() {
    const editor = inject("editor");
    const content = inject("content")
    return {
        editor,
        content
    };
}