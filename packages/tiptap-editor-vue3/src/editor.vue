<template>
    <div class="vue3-tiptap-editor major-editor">
        <Toolkit v-if="isShowToolbar" :characterCount="characterCount" @onUploadImageCallBack="onUploadImageCallBack"></Toolkit>
        <EditorContent class="vue3-tiptap-editor__content" :editor="editor" @contextmenu="onContextmenu"></EditorContent>
        <BubbleMenu></BubbleMenu>
        <ContextMenus ref="contextMenuRef"></ContextMenus>
    </div>
</template>

<script setup lang="ts" name="EditorTiptapVue3">
import { ref, nextTick, onBeforeUnmount, provide, watch, computed } from "vue";
import CharacterCount from '@tiptap/extension-character-count'
import StarterKit, { StarterKitOptions } from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align';
import { Editor, useEditor, EditorContent } from "@tiptap/vue-3";
import Placeholder from '@tiptap/extension-placeholder';
// 顶部工具
import Toolkit from "./components/Toolkit.vue";
// 菜单
import BubbleMenu from "@/components/bubble-menu/index.vue";
import { useEventListener } from "@/hooks/useEventListener";
import { useContextMenu } from "@/hooks/useContextMenu";
import ContextMenus from "./components/table/ContextMenu.vue";

// 自定义扩展
import TiptapExtensions from './extensions';

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
    customFileUpload: false,
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
    "update:content"
]);

const editor:Editor = new Editor({
    content: DOMPurify.sanitize(contents.value),
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
        TextAlign.configure({
            types: ['heading','paragraph'],
        }),
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
        const cleanHtml = DOMPurify.sanitize(editor.getHTML());
        emits('update:content', cleanHtml);
    }
});

useEventListener(editor)
const {contextMenuRef, onContextmenu} = useContextMenu(editor)

// 实时更新内容
watch(contents,(n,o) => {
    const isSame = editor.getHTML() === contents.value
    if (isSame) return
    editor.commands.setContent(n, false)
}, { deep: true })

const onUploadImageCallBack = (file: FileList) => {
    emits('onUploadImage', { file, editor })
}


provide("editor", editor)
provide('props', props)

// expose
defineExpose({
    getHTML: () => DOMPurify.sanitize(editor.getHTML()),
    getJSON:() => editor.getJSON(),
    getTEXT: () => editor.getText(),
    destroy: () => editor && editor.destroy()
})

</script>

<style lang="css" src="./style/index.css"></style>