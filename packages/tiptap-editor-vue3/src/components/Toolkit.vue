<template>
<div :class="[
        'vue3-tiptap-editor__toolbar',
        { 'vue3-tiptap-editor-enabled': !editor.isEditable }
    ]" 
    data-vue3-tiptap-editor-btn="true"
>
    <!-- 测试图标 -->
    <!-- <ErrorImage></ErrorImage> -->
     
    <component 
        v-for="(item, index) in cusComponentIcon" 
        v-bind="item.componentProps" 
        :is="item.component" 
        :key="index"
        @onUploadImageCallBack="onUploadImageCallBack">
    </component>
    <button class="toolbar-icon--btn" data-editor-toolbar-btn="true">
        <span style="color: var(--theme-color);font-weight: bold;">{{ editor.storage.characterCount.characters()}}</span>
        <span>&nbsp;/&nbsp;{{ characterCount }}</span>
    </button>
    <!-- 自定义行高会段落冲突，暂时注释 -->
    <!-- <ParagraphUI></ParagraphUI> -->
</div>
</template>

<script lang="ts" setup name="Toolkit">
import { Editor } from '@tiptap/vue-3'
// 段落
import ParagraphUI from './paragraph/index.vue';
import ErrorImage from "../icons/error-image.svg"; 

const editor = inject('editor') as Editor
const emits = defineEmits(['onUploadImageCallBack'])
const props = defineProps({
    characterCount: {
        type:Number,
        default: 10000
    }
})

interface CusIconType {
    componentProps: Object,
    component: Object
}

const cusComponentIcon = computed(() => {
    const extensions = editor.extensionManager.extensions
    const tiptapExtensions = extensions.reduce<CusIconType[]>((pre, cur) => {
        const { onClick } = cur.options;
        if (typeof onClick !== 'function') return pre;
        const extensionData = onClick({ editor: editor });
        return Array.isArray(extensionData)
        ? [...pre, ...extensionData]
        : [...pre, extensionData];
    },[]);
    return tiptapExtensions
})

const onUploadImageCallBack = (file: FileList) => {
    emits('onUploadImageCallBack', file)
}

</script>