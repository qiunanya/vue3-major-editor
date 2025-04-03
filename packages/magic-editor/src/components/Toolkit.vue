<template>
    <div class="carrot-tiptap-editor__toolbar" data-major-editor="true">
        <!-- 测试图标 -->
        <!-- <ErrorImage></ErrorImage> -->
        <!-- 测试组件 -->
        <component v-for="(item, index) in cusComponentIcon" v-bind="item.componentProps" :is="item.component" :key="index"></component>
    
        <NPopselect v-model:value="selectHvalue" trigger="hover" :options="optionsHT" :on-update:value="handleHeading">
            <NTooltip placement="top" trigger="hover">
                <template #trigger>
                    <button :class="[{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn">
                        <svg viewBox="0 0 1024 1024" width="200" height="200">
                            <path
                                d="M768 512v384c0 35.4 28.6 64 64 64s64-28.6 64-64V128c0-35.4-28.6-64-64-64s-64 28.6-64 64v256H256V128c0-35.4-28.6-64-64-64S128 92.6 128 128v768c0 35.4 28.6 64 64 64s64-28.6 64-64V512h512z">
                            </path>
                        </svg>
                        <svg viewBox="0 0 1024 1024" width="200" height="200">
                            <path d="M209.656 344.031l298.604 335.938 306.084-335.839-604.688-0.099z"></path>
                        </svg>
                    </button>
                </template>
                <span>标题</span>
            </NTooltip>
        </NPopselect>

        <!-- 自定义行高会段落冲突，暂时注释 -->
        <!-- <ParagraphUI></ParagraphUI> -->
        
        <NPopselect v-model:value="selectLineHeight" trigger="hover" :options="lineHeightOptions"
            :on-update:value="handleLineHeight">
            <NTooltip placement="top" trigger="hover">
                <template #trigger>
                    <button :class="[{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn">
                        <svg viewBox="0 0 1097 1024" width="200" height="200">
                            <path
                                d="M37.888 155.355429v-109.714286h1024.219429v109.714286H37.888zM476.891429 445.952v-109.714286h584.265142v109.714286H476.891429z m0.877714 225.718857v-109.714286h582.656v109.714286H477.622857zM40.228571 958.025143v-109.714286h1018.587429v109.714286H40.228571z m-40.301714-514.925714l181.833143-172.690286L363.52 443.172571H-0.073143z m1.974857 148.772571h363.300572L183.588571 762.660571 1.901714 591.872z">
                            </path>
                        </svg>
                        <svg viewBox="0 0 1024 1024" width="200" height="200">
                            <path d="M209.656 344.031l298.604 335.938 306.084-335.839-604.688-0.099z"></path>
                        </svg>
                    </button>
                </template>
                <span>行间距</span>
            </NTooltip>
        </NPopselect>
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
        <NPopselect v-model:value="selectTextAlign" trigger="hover" :options="textAlignOptions"
            :on-update:value="handleTextAlign">
            <NTooltip placement="top" trigger="hover">
                <template #trigger>
                    <button :class="[{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn">
                        <svg viewBox="0 0 1024 1024" width="200" height="200">
                            <path
                                d="M114.259 124.62h795.48c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-795.48c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26zM114.259 798.86h456.6c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-456.6c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26zM114.259 349.37h456.6c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-456.6c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26zM114.259 574.16h795.48c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-795.48c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26z">
                            </path>
                        </svg>
                        <svg viewBox="0 0 1024 1024" width="200" height="200">
                            <path d="M209.656 344.031l298.604 335.938 306.084-335.839-604.688-0.099z"></path>
                        </svg>
                    </button>
                </template>
                <span>文本对齐方式</span>
            </NTooltip>
        </NPopselect>
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button :class="[{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn" @click="handleUploadImg()">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M896 626.592a16 16 0 0 0-7.68-13.664l-172.448-105.088a16 16 0 0 0-20.704 3.52l-76 92.608-1.024 1.152a16 16 0 0 1-22.624 0.032l-252.832-252.064a16.032 16.032 0 0 0-22.08-0.512l-187.36 170.656a15.936 15.936 0 0 0-5.248 11.84V800h768v-173.408z">
                        </path>
                        <path d="M800 320m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"></path>
                        <path d="M32 128v768h960V128H32z m896 704H96V192h832v640z"></path>
                    </svg>
                </button>
            </template>
            <span>添加图片</span>
        </NTooltip>
    </div>

    <UploadImage ref="UploadImageRef" @uploadImageSuccess="uploadImageSuccess"></UploadImage>

    <Links ref="linksRef"></Links>

</template>

<script lang="ts" setup name="Toolkit">
import { ref, h, computed, reactive, inject } from "vue";
import { Editor, Extension } from '@tiptap/vue-3'
import { NPopselect, NTooltip, NPopover, NModal } from "naive-ui";
import type { SelectOption } from "naive-ui";
import { useSelectCore } from "../hooks/useSelect";
import { useNaiveDiscrete } from "../hooks/navie-ui";
import { v4 as uuidV4 } from 'uuid';
import UploadImage from "./UploadImage.vue";
import Links from "./Links.vue";
import { colorList, alignList, lineHeighList } from '../utils/config';

// 段落
import ParagraphUI from './paragraph/index.vue';

import ErrorImage from "../icons/error-image.svg"; 

// type IconType = Array<Mark|Node>
// const cusComponentIcon = ref<IconType>([])

const editors = inject('editor') as Editor
const { majorEditor, editor } = useSelectCore();
const { message, dialog, modal } = useNaiveDiscrete();
// const dialog = useDialog()

const emits = defineEmits(['onUploadImage'])

// 对齐
const selectTextAlign = ref("left");
const textAlignOptions = ref<Array<SelectOption>>(alignList);
const handleTextAlign = (val: string) => {
    selectTextAlign.value = val;
    if (majorEditor.editor) {
        majorEditor.editor.chain().focus().setTextAlign(val).run();
    }
};

// 设置行高
const selectLineHeight = ref("1.5");
const lineHeightOptions = ref<Array<SelectOption>>(lineHeighList);
const handleLineHeight = (val: string) => {
    selectLineHeight.value = val;
    majorEditor.setTextStyle("lineHeight", { lineHeight: val });
};

// 设置标题
const optionsHT = ref<Array<SelectOption>>([]);
const selectHvalue = ref("4");
const handleHeading = (val: string) => {
    majorEditor.setTextStyle("Heading", {
        level: +val,
    });
};

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

// 上传图片
interface UploadImageType {
    initialize: () => void;
}
const UploadImageRef = ref<UploadImageType | null>(null)
const handleUploadImg = () => {
    if (!editor.isEditable) return
    UploadImageRef.value && UploadImageRef.value.initialize()
}
const uploadImageSuccess = ({ file, formData }: { file: FileList, formData: FormData }) => {
    emits('onUploadImage', { file, formData })
}


function getHList() {
    optionsHT.value = [];
    let i = 0;
    while (i < 6) {
        optionsHT.value.push({ label: `H${i + 1}`, value: `${i + 1}`, disabled: false });
        i++;
    }
}

interface CusIconType {
    componentProps: Object,
    component: Object
}

const cusComponentIcon = computed(() => {
    const extensions = editors.extensionManager.extensions
    const tiptapExtensions = extensions.reduce<CusIconType[]>((pre, cur) => {
        const { onClick } = cur.options;
        if (typeof onClick !== 'function') return pre;
        const extensionData = onClick({ editor: editors });
        return Array.isArray(extensionData)
        ? [...pre, ...extensionData]
        : [...pre, extensionData];
    },[]);
    return tiptapExtensions
})

function initialize() {
    getHList();
}

initialize();
</script>