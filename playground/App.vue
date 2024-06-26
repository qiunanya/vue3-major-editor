<template>
    <div class="app_wrapper">
        <section class="cus-header">
            <h2 class="h2" style="margin-right: 0.2em;">Vue3TiptapEditor</h2>
            <a href="https://github.com/qiunanya/vue3-major-editor.git" target="_blank">
                <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
            </a>
        </section>
        <!-- v-model:content="htmlContent" -->
        <Vue3TiptapEditor 
            v-model:content="htmlContent" 
            :imageInner="imageInner" 
            @onCreated="onCreated" 
            @onUpdate="onUpdate" 
            @onBlur="onBlur" 
            @onUploadImage="onUploadImage">
        </Vue3TiptapEditor>
        <!-- <CustomEditor :message="'CustomEditor'" @onBold="onBold"></CustomEditor> -->
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { Editor, EditorEvents } from "@tiptap/vue-3";
    import CustomEditor from './src/test/CustomEditor';

    // true:图片内部处理，默认转化为base64, false: 不自动转化数据，需要外部处理后添加到编辑器
    const imageInner = ref(false)

    // 按需引入Button组件
    // import { Button } from '@majoreditor/ui'

    // 引入组件
    import { Vue3TiptapEditor } from "vue3-tiptap-editor";

    // const htmlContent = ref(`<p>欢迎使用vue3-major-editor编辑器 🎉</p>欢迎订阅交流,<img src='https://placehold.co/800x400'/>`)
    const htmlContent = ref("")

    const onCreated = (editor:Editor) => {
        console.log(editor, 'onCreated');
    }
    const onUpdate = (editor:Editor) => {
        // console.log(editor, 'onUpdate');
    }
    const onBlur = (editor:Editor) => {
        // console.log(editor, 'onBlur');
    }
    function onBold(val:any) {
        console.log(val, 4444);
        
    }
    // 仅支持base64和URL两种模式
    const onUploadImage = ({ file, formData, editor }:{ file:FileList, formData:FormData, editor: Editor }) => {
        for (let i = 0; i < file.length; i++) {
            if (file[i]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target?.result as string;
                    editor.commands.setImage({ src: base64 });
                };
                reader.readAsDataURL(file[i]);
            }
        }
        console.log(file, formData, editor, 'onUploadImage');
        
    }
</script>

<style lang="scss">
    .app_wrapper {
        padding:15px;
        .h2 {
            margin: 5px 0;
            color: #646cff;
        }
        .cus-header {
            display: flex;
            align-items: center;
        }
    }
</style>