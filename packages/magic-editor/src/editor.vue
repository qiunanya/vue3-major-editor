<template>
    <div class="vue3-major-editor__root major-editor">
        <Toolkit v-if="isShowToolbar" @onUploadImage="onUploadImageCall"></Toolkit>
        <div class="rich-content-editor__wrap">
            <bubble-menu
                :editor="editor"
                :tippy-options="{ duration: 100 }"
                v-if="editor"
                >
                <div class="magic-bubble-menu">
                    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                        <BoldIcon class="menu-icon"></BoldIcon>
                    </button>
                    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                        <ItalicIcon class="menu-icon"></ItalicIcon>
                    </button>
                    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                        <StrikeIcon class="menu-icon"></StrikeIcon>
                    </button>
                </div>
                </bubble-menu>
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
import Images from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Editor, EditorEvents, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import Placeholder from '@tiptap/extension-placeholder';
import { EditorState, Transaction } from '@tiptap/pm/state';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import BoldIcon from "./icons/bold-icon.svg";
import ItalicIcon from "./icons/italic-icon.svg";
import StrikeIcon from "./icons/strike-icon.svg";

// 顶部工具
import Toolkit from "./components/Toolkit.vue";

// 引入核心类
import MajorEditor from "./core/MajorEditor";

// 插件
import TextPlugin from "./plugins/TextPlugin";
import TablePlugin from "./plugins/TablePlugin";
import ContextMenu from "./plugins/ContextMenu";

// 自定义扩展
import CusLineHeightExt from "./extends/extension-lineHeight"; 
import BackgroundColorExt from "./extends/extension-bg-color";

// 导入props参数类型
import { EditorProps } from './typings/interfaces';

// 过滤编辑器类容，防止xss攻击, 生产环境
import DOMPurify from 'dompurify';

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
  content: 'inline*',
})

const majorEditor = new MajorEditor();

editor = new Editor({
    content: DOMPurify.sanitize(contents.value),
    extensions: [
        TextStyle,
        Color,
        StarterKit,
        Underline,
        CusLineHeightExt, // 自定义行高组件会影响setParagraph方法
        BackgroundColorExt,
        // CustomDocument,
        CustomTaskItem,
        TaskList,
        TextAlign.configure({
            types: ['heading','paragraph'],
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
        Link.configure({
            openOnClick: false,
            protocols: ['https']
        }),
        Placeholder.configure({
            placeholder: '请输入内容...',
        }),
        Subscript.configure({
            HTMLAttributes: {
                class: 'custom-subscript-class',
            },
        }),
        Superscript.configure({
            HTMLAttributes: {
                class: 'custom-superscript-class',
            },
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
console.log(majorEditor);

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