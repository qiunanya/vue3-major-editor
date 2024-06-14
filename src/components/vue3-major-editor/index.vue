<template>
    <div class="vue3-major-editor__root major-editor">
        <h2 class="h2">Vue3MajorEditor 1.0</h2>
        <!-- <n-button class="btn">Major-Editor777</n-button> -->
        <Toolkit></Toolkit>
        <editor-content :editor="editor" />
        <!-- <RichEditor></RichEditor> -->
    </div>
</template>

<script setup name="Vue3MajorEditor">
import { nextTick, onMounted, ref, onBeforeUnmount, provide } from 'vue'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// 顶部工具
import Toolkit from './component/Toolkit.vue'
// 内容区域
import RichEditor from './component/RichEditor.vue'

const editor = ref(null)
const contents = ref('<p>I’m running Tiptap with Vue.js. 🎉</p>')

editor.value = new Editor({
    content: contents.value,
    extensions: [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit,
    ],
})


provide('editor', editor.value)
provide('content', contents.value)
onBeforeUnmount(() => {
   editor.value.destroy()  
})

</script>

<style lang="scss" src="./style.scss"></style>