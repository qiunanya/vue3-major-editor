<template>
<div :class="[
        'carrot-tiptap-editor__toolbar',
        { 'is-edit-able': !editor.isEditable }
    ]" 
    data-major-editor="true"
>
    <!-- 测试图标 -->
    <!-- <ErrorImage></ErrorImage> -->
    <!-- 测试组件 -->
    <component v-for="(item, index) in cusComponentIcon" v-bind="item.componentProps" :is="item.component" :key="index"></component>

    <!-- 自定义行高会段落冲突，暂时注释 -->
    <!-- <ParagraphUI></ParagraphUI> -->
    
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button :class="[{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn" @click="handleTaskList()">
                <svg viewBox="0 0 1024 1024" width="200" height="200">
                    <path
                        d="M853.333333 0a170.666667 170.666667 0 0 1 170.666667 170.666667v682.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H170.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V170.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h682.666666zM213.333333 76.8H170.666667a93.866667 93.866667 0 0 0-93.610667 87.168L76.8 170.666667v682.666666a93.866667 93.866667 0 0 0 87.168 93.610667L170.666667 947.2h682.666666a93.866667 93.866667 0 0 0 93.610667-87.168L947.2 853.333333V170.666667a93.866667 93.866667 0 0 0-87.168-93.610667L853.333333 76.8h-42.666666V213.333333a42.666667 42.666667 0 0 1-42.666667 42.666667H256a42.666667 42.666667 0 0 1-42.666667-42.666667V76.8z m596.096 296.832a38.4 38.4 0 0 1 3.413334 50.389333l-3.413334 3.925334-307.712 307.754666a38.272 38.272 0 0 1-27.818666 11.221334 38.272 38.272 0 0 1-27.776-11.221334l-187.050667-187.050666a38.4 38.4 0 1 1 54.272-54.314667l160.554667 160.512 281.216-281.173333a38.4 38.4 0 0 1 54.314666 0zM733.866667 76.8H290.133333v102.4h443.733334V76.8z">
                    </path>
                </svg>
            </button>
        </template>
        <span>任务列表</span>
    </NTooltip>
</div>
</template>

<script lang="ts" setup name="Toolkit">
import { Editor } from '@tiptap/vue-3'
import { NTooltip} from "naive-ui";
import { useSelectCore } from "../hooks/useSelect";
// 段落
import ParagraphUI from './paragraph/index.vue';
import ErrorImage from "../icons/error-image.svg"; 

const editor = inject('editor') as Editor

const emits = defineEmits(['onUploadImage'])

// 创建任务列表
const handleTaskList = () => {
    if (editor) {
        // 查看是否存在任务
        const contentJSON = editor.getJSON();
        const hasTaskList = contentJSON.content?.some((item) => item.type === "taskList");
        if (hasTaskList) {
            editor
                .chain()
                .focus()
                .insertContent('<li data-type="taskItem" data-checked="false"><p>New Task</p></li>')
                .run();
        } else {
            // 如果没有任务列表，插入任务列表和任务项
            editor
                .chain()
                .focus()
                .insertContent(
                    '<ul data-type="taskList"><li data-type="taskItem" data-checked="false"><p>New Task</p></li></ul>'
                )
                .run();
        }
    }
};


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
</script>