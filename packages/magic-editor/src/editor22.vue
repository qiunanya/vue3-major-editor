<template>
<!-- <editor-content :editor="editor" /> -->
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

async function init () {
    // useEditor 钩子是异步的
    const editor = await useEditor({
        content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
        extensions: [StarterKit],
    })
    console.log(editor.value, 888)
}
init()
</script>
  