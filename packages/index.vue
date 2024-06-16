<template>
    <div class="vue3-major-editor__root major-editor">
        <section class="cus-header">
            <h2 class="h2" style="margin-right: 0.2em;">Vue3MajorEditor</h2>
            <a href="https://github.com/qiunanya/vue3-major-editor.git" target="_blank">
                <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
            </a>
        </section>
        <!-- <n-button class="btn">Major-Editor777</n-button> -->
        <Toolkit></Toolkit>
        <!-- <editor-content :editor="editor" /> -->
        <RichEditor></RichEditor>
    </div>
</template>

<script setup lang="ts" name="Vue3MajorEditor">
import { ref, onBeforeUnmount, provide } from 'vue'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// 顶部工具
import Toolkit from './component/Toolkit.vue'
// 内容区域
import RichEditor from './component/RichEditor.vue'
// 引入核心类
import MajorEditor from './core/MajorEditor'
// 插件
import TextPlugin from './plugins/TextPlugin'

const editor = ref<any>(null);
// const contents = ref('<p>I’m running Tiptap with Vue.js. 🎉</p>')
const contents = defineModel<string>('content', { 
    default: '<p>I’m running Tiptap with Vue.js. 🎉</p>', 
    required: false 
})

const majorEditor = new MajorEditor()
editor.value = new Editor({
    content: contents.value,
    extensions: [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        // TextStyle,
        StarterKit,
    ],
})

// init majorEditor
majorEditor.init(editor.value)
// init plugin
majorEditor.registerPlugin(TextPlugin)

provide('majorEditor', majorEditor)
provide('editor', editor.value)
provide('content', contents.value)
onBeforeUnmount(() => {
    editor.value && editor.value.destroy()  
})

</script>

<style lang="scss" src="./css/index.scss"></style>