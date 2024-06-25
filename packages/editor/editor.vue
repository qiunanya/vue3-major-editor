<template>
    <div class="vue3-major-editor__root major-editor">
        <!-- <n-button class="btn">Major-Editor777</n-button> -->
        <Toolkit @onUploadImage="onUploadImageCall"></Toolkit>
        <div class="rich-content-editor__wrap">
            <EditorContent :editor="editor"></EditorContent>
        </div>
    </div>
</template>

<script setup lang="ts" name="Vue3MajorEditor">
import { ref, onBeforeUnmount, provide } from "vue";
import type { PropType } from 'vue';
import { Color } from "@tiptap/extension-color";
import Document from '@tiptap/extension-document';
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Images from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align';
import { Editor, EditorEvents, EditorContent } from "@tiptap/vue-3";

// 顶部工具
import Toolkit from "./components/Toolkit.vue";

// 引入核心类
import MajorEditor from "./core/MajorEditor";

// 插件
import TextPlugin from "./plugins/TextPlugin";

// 自定义扩展
import LineHeightExtension from "./extends/LineHeightExtension"; 

// 导入props参数类型
import { EditorProps } from './typings/config';

const editor = ref<any>(null);
// const contents = ref('<p>I’m running Tiptap with Vue.js. 🎉</p>')
const contents = defineModel<string>("content", {
    default: "请输入内容",
    required: false,
});

// props
const props = withDefaults(defineProps<EditorProps>(), {
    imageInner: true
})

// emit
const emits = defineEmits([
    "onCreated",
    "onUpdate",
    "onSelectionUpdate",
    "onFocused",
    "onBlur",
    "onDestroyed",
    "onContentError",
    "onUploadImage"
]);

const CustomDocument = Document.extend({
  content: 'taskList',
})

const CustomTaskItem = TaskItem.extend({
  content: 'inline',
})

const majorEditor = new MajorEditor();
editor.value = new Editor({
    content: contents.value,
    extensions: [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        StarterKit,
        Underline,
        LineHeightExtension,
        // CustomDocument,
        CustomTaskItem.configure({
            nested: true // 任务允许嵌套
        }),
        TaskList,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Images.configure({
            inline: true,
            allowBase64: true,
            HTMLAttributes: {
                class: 'my-custom-img-class',
            },
        })
    ],
});
const onUploadImageCall = ({ file, formData }:{ file:FileList, formData:FormData }) => {
    emits('onUploadImage', { file, formData, editor: editor.value })
}
const onCreated = (editor: Editor) => {
    emits("onCreated", editor);
};
const onUpdate = (editor: Editor) => {
    emits("onUpdate", editor);
};
const onSelectionUpdate = (editor: Editor) => {
    emits("onSelectionUpdate", editor);
};
const onFocused = ({ editor, event }: { editor: Editor; event: EditorEvents }) => {
    emits("onFocused", { editor: event });
};
const onBlur = ({ editor, event }: { editor: Editor; event: EditorEvents }) => {
    emits("onBlur", { editor: event });
};
const onDestroyed = () => {
    emits("onDestroyed", "destroyed");
};
const onContentError = ({ editor, event }: { editor: Editor; event: EditorEvents }) => {
    emits("onContentError", { editor: event });
};
// The editor is ready.
editor.value.on("create", onCreated);
// The content has changed.
editor.value.on("update", onUpdate);
// The selection has changed.
editor.value.on("selectionUpdate", onSelectionUpdate);
// The editor is focused.
editor.value.on("focus", onFocused);
// The editor isn’t focused anymore.
editor.value.on("blur", onBlur);
// The editor is being destroyed.
editor.value.on("destroy", onDestroyed);
// The editor content does not match the schema.
editor.value.on("contentError", onContentError);

// init majorEditor
majorEditor.init(editor.value);
// init plugin
majorEditor.registerPlugin(TextPlugin);

provide("majorEditor", majorEditor);
provide("editor", editor.value);
provide("content", contents.value);
provide('props', props)
onBeforeUnmount(() => {
    editor.value.off("create", onCreated);
    editor.value.off("update", onUpdate);
    editor.value.off("selectionUpdate", onSelectionUpdate);
    editor.value.off("focus", onFocused);
    editor.value.off("blur", onBlur);
    editor.value.off("destroy", onDestroyed);
    editor.value.off("contentError", onContentError);
    editor.value && editor.value.destroy();
});
</script>

<style lang="scss" src="./style/index.scss"></style>
