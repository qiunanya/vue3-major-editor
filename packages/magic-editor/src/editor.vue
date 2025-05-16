<template>
    <div class="carrot-tiptap-editor major-editor">
        <Toolkit v-if="isShowToolbar" @onUploadImage="onUploadImageCall"></Toolkit>
        <EditorContent class="carrot-tiptap-editor__content" :editor="editor" @contextmenu="onContextmenu"></EditorContent>
        <BubbleMenu></BubbleMenu>
        <CharacterCountTool :characterCount="characterCount"></CharacterCountTool>
        <ContextMenus ref="contextMenuRef"></ContextMenus>
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
import Link from '@tiptap/extension-link';
// 顶部工具
import Toolkit from "./components/Toolkit.vue";
// 菜单
import BubbleMenu from "@/components/bubble-menu/index.vue"
import CharacterCountTool from '@/components/CharacterCount.vue'
import { Plugin, TextSelection } from '@tiptap/pm/state';
import { useEventListener } from "@/hooks/useEventListener"
import { useContextMenu } from "@/hooks/useContextMenu"
import ContextMenus from "./components/table/ContextMenu.vue";

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
    isEnable: true,
    isShowToolbar: true,
    characterCount: 10000,
    placeholder: '请输入内容...'
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
            blockquote: false,
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
        CharacterCount.configure({
          limit: props.characterCount,
        }),
        Placeholder.configure({
            placeholder: props.placeholder,
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
console.log(editor, 666)
useEventListener(editor)
const {contextMenuRef, onContextmenu} = useContextMenu(editor)

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