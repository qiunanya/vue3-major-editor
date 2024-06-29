<template>
    <div class="vue3-major-editor__root major-editor">
        <!-- <button class="btn" ref="btnRef">Major-Editor777</button> -->
        <Toolkit v-if="isShowToolbar" @onUploadImage="onUploadImageCall"></Toolkit>
        <div class="rich-content-editor__wrap">
            <EditorContent :editor="editor"></EditorContent>
        </div>
    </div>
</template>

<script setup lang="ts" name="Vue3MajorEditor">
import { ref, onBeforeUnmount, provide, nextTick } from "vue";
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
import { Editor, EditorEvents, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import Placeholder from '@tiptap/extension-placeholder';
import { EditorState, Transaction } from '@tiptap/pm/state';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

// 顶部工具
import Toolkit from "./components/Toolkit.vue";

// 引入核心类
import MajorEditor from "./core/MajorEditor";

// 插件
import TextPlugin from "./plugins/TextPlugin";
import TablePlugin from "./plugins/TablePlugin";
import ContextMenu from "./plugins/ContextMenu";

// 自定义扩展
import CusLineHeightExt from "./extends/CusLineHeightExt"; 

// 导入props参数类型
import { EditorProps } from './typings/interfaces';

let editor:Editor;
const contents = defineModel<string>("content", {
    default: "",
    required: false,
});

// props
const props = withDefaults(defineProps<EditorProps>(), {
    imageInner: true,
    isEnable: true,
    isShowToolbar: true
})

// emit
const emits = defineEmits([
    "onCreated",
    "onUpdate",
    "onSelectionUpdate",
    "onFocused",
    "onBlur",
    "onDestroyed",
    "onUploadImage",
    'onTransaction'
]);

const CustomDocument = Document.extend({
  content: 'taskList',
})

const CustomTaskItem = TaskItem.extend({
  content: 'inline',
})

const majorEditor = new MajorEditor();

editor = new Editor({
    content: contents.value,
    extensions: [
        TextStyle,
        Color,
        StarterKit,
        Underline,
        CusLineHeightExt,
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
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Placeholder.configure({
            placeholder: 'Write something ...',
        })
    ],
    onCreate({editor}) {
        const currentContent = editor.getHTML();
        const newContent = currentContent + '<p><br></p>';
        editor.commands.setContent(newContent);
    }
});

// init majorEditor
majorEditor.init(editor, props);
// init plugin
majorEditor.use(TextPlugin);
majorEditor.use(TablePlugin);
majorEditor.use(ContextMenu);
console.log(props);


const onUploadImageCall = ({ file, formData }:{ file:FileList, formData:FormData }) => {
    emits('onUploadImage', { file, formData, editor: editor })
}

provide("majorEditor", majorEditor);
provide("editor", editor);
provide("content", contents.value);
provide('props', props)

const getHTML = () => {
    return majorEditor.getHtml()
}
const getJSON = () => {
    return majorEditor.getJson()
}
const getTEXT = () => {
    return majorEditor.getText()
}
// expose
defineExpose({
    getHTML,
    getJSON,
    getTEXT
})

onBeforeUnmount(() => {
    editor && editor.destroy();
});
</script>

<style lang="scss" src="./style/index.scss"></style>
./typings/interfaces