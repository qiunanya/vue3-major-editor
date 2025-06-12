import { defineStore } from "pinia"
import { Extensions } from '@tiptap/vue-3'

export const useExtensionStore = defineStore('custExtension', {
    state: () => {
        return {
            extensions: [] as Extensions[],
        }
    },
    getters: {
        getExtensionse: (state): Extensions[] => {
            return state.extensions
        },
        
    },
    actions: {
        setExtensionse (extension:Extensions[] = []) {
            console.log(extension, 111)
            // Storage.setItem('auth_type', auth)
            this.extensions = extension
        },
    }
})