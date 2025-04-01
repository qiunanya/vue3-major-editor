<template>
    <div class="carrot-tiptap-editor major-editor">
        <Toolkit v-if="isShowToolbar" @onUploadImage="onUploadImageCall"></Toolkit>
        <EditorContent class="carrot-tiptap-editor__content" :editor="editor"></EditorContent>
        <BubbleMenu></BubbleMenu>
        <CharacterCountTool></CharacterCountTool>
    </div>
</template>

<script setup lang="ts" name="EditorTiptapVue3">
import { ref, nextTick, onBeforeUnmount, provide, watch, computed } from "vue";
import CharacterCount from '@tiptap/extension-character-count'
import StarterKit, { StarterKitOptions } from "@tiptap/starter-kit";
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Images from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Editor, useEditor, EditorContent } from "@tiptap/vue-3";
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Link from '@tiptap/extension-link';
// 顶部工具
import Toolkit from "./components/Toolkit.vue";
// 菜单
import BubbleMenu from "@/components/bubble-menu/index.vue"
import CharacterCountTool from '@/components/CharacterCount.vue'
import { Plugin, TextSelection } from '@tiptap/pm/state';
import { useEventListener } from "@/hooks/useEventListener"

// 引入核心类
import MajorEditor from "./core/MajorEditor";

// 插件
import TextPlugin from "./plugins/TextPlugin";
import TablePlugin from "./plugins/TablePlugin";
import ContextMenu from "./plugins/ContextMenu";

// 自定义扩展
import TiptapExtensions from './extensions'

// 导入props参数类型
import { EditorProps } from './typings';

// 过滤编辑器类容，防止xss攻击, 生产环境
import DOMPurify from 'dompurify';

const contents = defineModel<string>("content", {
    default: "",
    required: false,
});

// props
const props = withDefaults(defineProps<EditorProps>(), {
    imageInner: true,
    isEnable: true,
    isShowToolbar: true,
    characterCount: 10000
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

const CustomTaskItem = TaskItem.extend({
  content: 'inline*',
})

const majorEditor = new MajorEditor();

const editor:Editor = new Editor({
    // content: DOMPurify.sanitize(contents.value),
    content: contents.value,
    editable: props.isEnable,
    extensions: [
        ...TiptapExtensions,
        // TextStyle,
        // Color,
        StarterKit.configure({
            bold: false,
            italic: false,
            strike: false,
            code: false,
            codeBlock: false,
            history: false,
            orderedList: false,
            bulletList: false,
            horizontalRule: false,
            blockquote: false
        }),
        CharacterCount.configure({
          limit: props.characterCount,
        }),
        CustomTaskItem,
        TaskList,
        TextAlign.configure({
            types: ['heading','paragraph'],
        }),
        // Images.configure({
        //     inline: true,
        //     allowBase64: true,
        //     HTMLAttributes: {
        //         class: 'my-custom-img-class',
        //     },
        // }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Link.configure({
            openOnClick: true,
            // protocols: ['http', 'https', 'ftp'],
            validate: (text) => true,
        }),
        Placeholder.configure({
            placeholder: '请输入内容...',
        })
    ],
    onCreate({editor}) {
        const currentContent = editor.getHTML();
        const newContent = currentContent + '<p><br></p>';
        editor.commands.setContent(newContent, false);
    },
    onUpdate ({editor}) {
        emits('onUpdate', editor)
    }
});

useEventListener(editor)


// 实时更新内容
watch(contents,(n,o) => {
    const isSame = editor.getHTML() === contents.value
    if (isSame) return
    editor.commands.setContent(n, false)
}, { deep: true }) 

// init majorEditor
majorEditor.init(editor, props);

// init plugin
majorEditor.use(TextPlugin);
majorEditor.use(TablePlugin);
majorEditor.use(ContextMenu);

console.log(editor, majorEditor)

const onUploadImageCall = ({ file, formData }:{ file:FileList, formData:FormData }) => {
    emits('onUploadImage', { file, formData, editor: editor })
}

provide("majorEditor", majorEditor);
provide("editor", editor)
provide('props', props)

// expose
defineExpose({
    getHTML: () => editor.getHTML(),
    getJSON:() => editor.getJSON(),
    getTEXT: () => editor.getText(),
    destroy: () => editor && editor.destroy()
})

</script>

<style lang="scss" src="./style/index.scss"></style>