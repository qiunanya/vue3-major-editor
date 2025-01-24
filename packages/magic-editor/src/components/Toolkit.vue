<template>
    <div class="vue3-major-editor__toolbar" data-major-editor="true">
        <ErrorImage></ErrorImage>
        <UndoUI></UndoUI>
        <RedoUI></RedoUI>
        <ClearUI></ClearUI>
        <BoldUI></BoldUI>
        <ItalicUI></ItalicUI>
        
        <NPopover ref="npopoverCLRef" style="max-height: 270px;max-width: 300px;" trigger="click" placement="bottom" scrollable>
            <template #trigger>
                <NTooltip placement="top" trigger="hover">
                    <template #trigger>
                        <button :class="[{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn">
                            <svg viewBox="0 0 1024 1024" width="200" height="200">
                                <path
                                    d="M0.239888 1024 0.239888 896.059972 1023.760112 896.059972 1023.760112 1024 0.239888 1024ZM677.762299 538.531563 340.22452 538.531563 246.924254 768.775636 127.444261 768.775636 451.420397 0.031985 582.990723 0.031985 895.244354 768.775636 767.576199 768.775636 677.762299 538.531563ZM512.223895 114.122505 374.59241 453.73931 644.689802 453.73931 512.223895 114.122505Z">
                                </path>
                            </svg>
                            <svg viewBox="0 0 1024 1024" width="200" height="200">
                                <path d="M209.656 344.031l298.604 335.938 306.084-335.839-604.688-0.099z"></path>
                            </svg>
                        </button>
                    </template>
                    <span>字体颜色</span>
                </NTooltip>
            </template>
            <div data-color-picker="major-color-picker" class="major-color-picker__wrap">
                <p style="margin: 5px 0;">
                    <span>颜色面板</span>
                </p>
                <div style="display: flex;flex-wrap: wrap;">
                    <span v-for="(item, index) in colorList" :key="index" :style="{
                        background: item.value,
                        width: '1.5rem',
                        height: '1.5rem',
                        margin: '0.2rem',
                        borderRadius: '0.2rem'
                    }" @click.stop="handleColorPicker(item.value)"></span>

                </div>
                <p style="margin: 5px 0;">颜色选择器</p>
                <input class="color-input__picker cursor" v-model="selectColor" type="color" list=""
                    @input="onChangeColor" />
                <button style="color: blue;margin-left: 12px;" @click.stop="handleColorPicker('')">取消字体颜色</button>
            </div>
        </NPopover>
        <NPopover ref="npopoverBgRef" style="max-height: 270px;max-width: 300px;" trigger="click" placement="bottom" scrollable>
            <template #trigger>
                <NTooltip placement="top" trigger="hover">
                    <template #trigger>
                        <button :class="[{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn">
                            <svg viewBox="0 0 1024 1024" width="200" height="200">
                                <path d="M0 0m56.888889 0l910.222222 0q56.888889 0 56.888889 56.888889l0 910.222222q0 56.888889-56.888889 56.888889l-910.222222 0q-56.888889 0-56.888889-56.888889l0-910.222222q0-56.888889 56.888889-56.888889Z" fill="#05AFC8"></path>
                                <path d="M284.444444 853.333333H227.555556L483.555556 170.666667h56.888888L284.444444 853.333333z" fill="#FFFFFF"></path>
                                <path d="M540.444444 170.666667h-56.888888L739.555556 853.333333h56.888888L540.444444 170.666667z" fill="#FFFFFF"></path>
                                <path d="M341.333333 625.777778h341.333334v56.888889H341.333333z" fill="#FFFFFF"></path>
                            </svg>
                        </button>
                    </template>
                    <span>字体背景颜色</span>
                </NTooltip>
            </template>
            <div data-color-picker="major-color-picker" class="major-color-picker__wrap">
                <p style="margin: 5px 0;">
                    <span>颜色面板</span>
                </p>
                <div style="display: flex;flex-wrap: wrap;">
                    <span v-for="(item, index) in colorList" :key="index" :style="{
                    background: item.value,
                    width: '1.5rem',
                    height: '1.5rem',
                    margin: '0.2rem',
                    borderRadius: '0.2rem'
                }" @click.stop="handlebColorPicker(item.value)"></span>

                </div>
                <p style="margin: 5px 0;">颜色选择器</p>
                <input class="color-input__picker cursor" v-model="selectColor" type="color" list=""
                    @input="onChangeColor" />
                <button style="color: blue;margin-left: 12px;" @click.stop="handlebColorPicker('')">取消背景色</button>
            </div>
        </NPopover>

        <UnderlineUI></UnderlineUI>
        <StrikeUI></StrikeUI>
        <CodeBgUI></CodeBgUI>
        <CodeBlockUI></CodeBlockUI>
        <BlockquoteUI></BlockquoteUI>
        <SubscriptUI></SubscriptUI>
        <SuperscriptUI></SuperscriptUI>
        
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button :class="[
                    { 'is-disable': !editor.isEditable },
                    {
                        'is-cell_active': editor.isActive('link')
                    }]" data-toolbar-type="toolbar-btn" @click="handleLink">
                    <svg viewBox="0 0 1024 1024" width="200" height="200"><path d="M402.090667 279.893333l169.984-183.159466A224.4608 224.4608 0 0 1 737.6896 22.9376c62.532267 0 121.309867 26.2144 165.410133 73.591467 90.453333 97.621333 90.453333 255.1808 0 352.802133L825.344 533.026133c-20.343467 22.459733-56.251733 26.965333-86.6304-3.072-25.668267-25.463467-27.921067-63.624533-3.754667-90.248533l77.687467-83.626667a124.245333 124.245333 0 0 0 0-166.229333 101.853867 101.853867 0 0 0-75.025067-33.518933c-28.330667 0-54.954667 11.8784-75.229866 33.655466L492.407467 373.213867c-40.618667 44.8512-35.566933 127.112533 10.24 177.834666 20.48 29.013333 15.086933 53.589333-11.264 82.3296-27.648 26.897067-69.905067 20.616533-89.429334-0.682666C311.637333 535.074133 311.637333 377.514667 402.090667 279.893333zM117.418667 585.796267l80.213333-91.136c19.114667-20.753067 56.1152-20.957867 86.4256 8.6016 23.620267 27.170133 25.3952 58.5728 2.116267 84.036266L208.0768 678.638933a124.245333 124.245333 0 0 0-0.136533 166.024534c20.2752 21.845333 46.830933 33.723733 75.1616 33.723733 28.535467-0.068267 55.842133-12.288 75.3664-33.723733l169.984-183.227734c41.301333-45.4656 37.888-125.7472-6.5536-174.830933-22.1184-27.170133-15.496533-58.914133 11.195733-85.128533 24.712533-24.098133 61.576533-29.696 85.742933-6.007467 90.453333 97.621333 90.453333 261.7344 0 359.287467l-169.984 183.296a224.529067 224.529067 0 0 1-165.6832 73.864533 224.4608 224.4608 0 0 1-165.341866-73.728C27.4432 840.704 27.306667 683.349333 117.418667 585.728z"></path></svg>
                </button>
            </template>
            <span>超链接</span>
        </NTooltip>

        <OrderedListUI></OrderedListUI>
        <BulletListUI></BulletListUI>
        <HorizontalRuleUI></HorizontalRuleUI>
        <!-- 自定义行高会段落冲突，暂时注释 -->
        <!-- <ParagraphUI></ParagraphUI> -->
        
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
        <NPopover style="max-height: 340px;max-width: 335px;" trigger="click" placement="bottom" scrollable :on-update:show="doTable">
            <template #trigger>
                <NTooltip placement="top" trigger="hover">
                    <template #trigger>
                        <button :class="[{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn">
                            <svg viewBox="0 0 1024 1024">
                                <path
                                    d="M938.666667 42.666667H85.333333C38.4 42.666667 0 81.066667 0 128v768c0 46.933333 38.4 85.333333 85.333333 85.333333h853.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V128c0-46.933333-38.4-85.333333-85.333333-85.333333zM298.666667 896H85.333333v-213.333333h213.333334v213.333333z m0-298.666667H85.333333V384h213.333334v213.333333z m341.333333 298.666667H384v-213.333333h256v213.333333z m0-298.666667H384V384h256v213.333333z m298.666667 298.666667h-213.333334v-213.333333h213.333334v213.333333z m0-298.666667h-213.333334V384h213.333334v213.333333z m0-298.666666H85.333333V128h853.333334v170.666667z">
                                </path>
                            </svg>
                        </button>
                    </template>
                    <span>表格</span>
                </NTooltip>
            </template>
            <div class="major-table-picker__wrap">
                <p style="margin: 5px 0; display: flex; align-items: center;">
                    <strong>{{tbOptions.row}}</strong>行x<strong>{{tbOptions.column}}</strong>列, 
                    表头: <input type="checkbox" v-model="tbOptions.isWithHeaderRow">
                    <a href="#" class="confirm__btn" @click.stop="handleTable">确定</a>
                </p>
                <div ref="tableFilterWrapRef" class="table-filter__wrap" 
                    @mousedown.stop="onMousedown"
                    @mousemove.stop="onMousemove"
                    @mouseleave.stop="onMouseleave"
                    @mouseup.stop="onMouseup">
                    <span class="table-column-item" v-for="(item, index) in 100" :key="index"></span>
                    <div ref="maskRef" class="table-mask__wrap"></div>
                </div>
            </div>
        </NPopover>
    </div>

    <UploadImage ref="UploadImageRef" @uploadImageSuccess="uploadImageSuccess"></UploadImage>

    <Links ref="linksRef"></Links>

</template>

<script lang="ts" setup name="Toolkit">
import { ref, h, computed, reactive } from "vue";
import { NPopselect, NTooltip, NPopover, NModal } from "naive-ui";
import type { SelectOption } from "naive-ui";
import { useSelectCore } from "../hooks/useSelect";
import { useNaiveDiscrete } from "../hooks/navie-ui";
import { v4 as uuidV4 } from 'uuid';
import UploadImage from "./UploadImage.vue";
import Links from "./Links.vue";
import { colorList, alignList, lineHeighList } from '../tools/config';

// 导入工具组件
import UndoUI from "./undo/index.vue";
import RedoUI from "./redo/index.vue";
// 清除工具
import ClearUI from './clear/index.vue';
// 加粗
import BoldUI from './bold/index.vue';
// 斜体
import ItalicUI from './italic/index.vue';
// 下划线
import UnderlineUI from './underline/index.vue';
// 删除线
import StrikeUI from './strike/index.vue';
// 代码背景
import CodeBgUI from './code-bg/index.vue';
// 代码块
import CodeBlockUI from './code-block/index.vue';
//  引用
import BlockquoteUI from './blockquote/index.vue';
// 有序列表
import OrderedListUI from './ordered-list/index.vue';
// 无序列表
import BulletListUI from './bullet-list/index.vue';
// 水平分隔符
import HorizontalRuleUI from './horizontal-rule/index.vue';
// 段落
import ParagraphUI from './paragraph/index.vue';
// 上标
import SuperscriptUI from './superscript/index.vue';
// 下标
import SubscriptUI from './subscript/index.vue';

import ErrorImage from "../icons/error-image.svg"; 

const { majorEditor, editor } = useSelectCore();
const { message, dialog, modal } = useNaiveDiscrete();
// const dialog = useDialog()

const npopoverCLRef = ref<InstanceType<typeof NPopover> | null>(null)
const npopoverBgRef = ref<InstanceType<typeof NPopover> | null>(null)

const emits = defineEmits(['onUploadImage'])

// 超链接
interface LinkType {
    toggle: () => void;
}
const linksRef = ref<LinkType | null>(null)
const handleLink = () => {
    linksRef.value&&linksRef.value.toggle()
}

// 表格
const tbOptions = reactive({
    row: 0,
    column: 0,
    isWithHeaderRow: true
})
const tableFilterWrapRef = ref<HTMLElement | null>(null)
const maskRef = ref<HTMLElement | null>(null)
let startTop = 0, endTop = 0, startLeft = 0, endLeft = 0, selectedCells = [];
const isMouseDown = ref(false)
const doTable = (val:boolean) => {
    if (val) {
        tbOptions.row = 0
        tbOptions.column = 0
    }
}
const handleTable = () => {
    if (!editor.isEditable) return
    if (tbOptions.column == 0) return
    if (editor.isActive('table')) {
        message.info('表格暂时不支持嵌套')
        return
    }
    editor
    .chain()
    .focus()
    .insertTable({
        rows: tbOptions.row,
        cols: tbOptions.column,
        withHeaderRow: tbOptions.isWithHeaderRow
    }).run()
}
const onMousedown = (evt: MouseEvent) => {
    if (tableFilterWrapRef.value) {
        isMouseDown.value = true
        // const { top, left } = tableFilterWrapRef.value.getBoundingClientRect();
        // 动态获取鼠标按下起点坐标, 不设置，则起点坐标是父元素的左上角坐标值
        // startTop = evt.y - top
        // startLeft = evt.x - left
        
        // 恢复子元素样式
        const childrenList = tableFilterWrapRef.value.children
        for (let i = 0; i < childrenList.length; i++) {
            const child = childrenList[i] as HTMLElement
            if (child.className!=='table-mask__wrap') {
                child.style.background = '#f0f0f0'
                child.style.color = "#333"
            }
        }
    }
}
const onMousemove = (evt: MouseEvent) => {
    if (isMouseDown.value) {
        calculateSelectedCells(evt)
    }
}
const onMouseleave = (evt: MouseEvent) => {
    resetPosition()
} 
const onMouseup = (evt: MouseEvent) => {
    resetPosition()
}
function resetPosition () {
    isMouseDown.value = false
    if (maskRef.value && tableFilterWrapRef.value) {
        maskRef.value.style.width = '0px';
        maskRef.value.style.height = '0px';
        maskRef.value.style.border = 'none';
        startLeft = 0;
        startTop = 0;
        endLeft = 0;
        endTop = 0;
    }
}
function calculateSelectedCells(evt:MouseEvent) {
    if (maskRef.value && tableFilterWrapRef.value) {
        const { top, left } = tableFilterWrapRef.value.getBoundingClientRect();
        const childrenList = tableFilterWrapRef.value.children
    
        // 鼠标移动触发时，先清空数据
        selectedCells = []
        let minRow = 10, maxRow = 0, minCol = 10, maxCol = 0;
        // 获取移动中的鼠标位置
        endTop = evt.y - top;
        endLeft = evt.x - left;

        // 设置遮罩层的位置
        maskRef.value.style.top = Math.min(startTop, endTop) + 'px'
        maskRef.value.style.left = Math.min(startLeft, endLeft) + 'px'

        // 计算遮罩层宽高
        const maskWidth = Math.abs(startLeft - endLeft)
        const maskHeight = Math.abs(startTop - endTop)
        maskRef.value.style.width = maskWidth + 'px'
        maskRef.value.style.height = maskHeight + 'px'
        maskRef.value.style.border = '1px solid #18a058'

        // 获取遮罩层位置信息
        const maskPosition = maskRef.value.getBoundingClientRect()
        
        for (let i = 0; i < childrenList.length; i++) {
            // 获取每个子元素的位置信息
            const { left, top, right, bottom } = childrenList[i].getBoundingClientRect()

            // 判断子元素和遮罩是否有重叠
            if (
                right > maskPosition.left && 
                bottom > maskPosition.top && 
                left < maskPosition.right && 
                top < maskPosition.bottom
            ) {
                const child = childrenList[i] as HTMLElement
                
                if(child.className!=='table-mask__wrap') {
                    child.style.background = 'rgba(24, 160, 88, 0.1)'
                    // child.style.color = "#18a058"
                    // 获取选中的子元素索引
                    // selectedCells.push(i+1)
                    // console.log(selectedCells);
                    // 行索引
                    const row = Math.floor(i / 10);
                    // 列索引
                    const col = i % 10;
                    minRow = Math.min(minRow, row);
                    maxRow = Math.max(maxRow, row);
                    minCol = Math.min(minCol, col);
                    maxCol = Math.max(maxCol, col);
                }
            } else {
                const child = childrenList[i] as HTMLElement
                // child.style.color = "#333"
                child.style.background = '#f0f0f0'
            }
        }

        tbOptions.row = maxRow - minRow + 1;
        tbOptions.column = maxCol - minCol + 1;
    }
}

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

// 设置文本样式
function handleTextStyle(key: string) {
    if (!editor.isEditable) return
    majorEditor.setTextStyle(key);
}

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

// 是否允许撤销|重做
const isRedo = computed(() => {
    return editor && editor.can().chain().focus().redo().run() || false
});
const isUndo = computed(() => {
    return editor && editor.can().chain().focus().undo().run() || false
});


function getHList() {
    optionsHT.value = [];
    let i = 0;
    while (i < 6) {
        optionsHT.value.push({ label: `H${i + 1}`, value: `${i + 1}`, disabled: false });
        i++;
    }
}

// 设置字体颜色
const selectColor = ref('#94ddde')
const onChangeColor = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    majorEditor.setTextStyle('Color', {
        color: target.value
    });
}
const handleColorPicker = (color: string) => {
    majorEditor.setTextStyle('Color', {
        color
    });
    
    if (!npopoverCLRef.value) return 
    npopoverCLRef.value.setShow(false)
}

// 设置字体背景色
const handlebColorPicker = (color: string) => {
    if (!npopoverBgRef.value) return 
    npopoverBgRef.value.setShow(false)
    majorEditor.setTextStyle("backgroundColor", { color })
}

function initialize() {
    getHList();
}

initialize();
</script>

<style lang="scss" scoped>
.major-table-picker__wrap {
    display: flex;
    flex-wrap: wrap;
    .confirm__btn {
        padding: 0;
        padding-inline: 0;
        margin-left: 0.5rem;
    }
    .table-filter__wrap {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        column-gap: 0.15rem;
        row-gap: 0.15rem;
        position: relative;

        .table-column-item {
            text-align: center;
            width: 1.8rem;
            height: 1.5rem;
            // margin: 0.2rem;
            border-radius: 0.1rem;
            background: #f0f0f0;
            // border: 1px solid #18a058;
            user-select: none;
        }

        .table-mask__wrap {
            position: absolute;
            width: 0px;
            height: 0px;
            // background-color: #000;
            // border: 1px solid #18a058;
            // opacity: 0.4;
        }
    }
}

.vue3-major-editor__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    // background: rgba(24, 160, 88, 0.1);
    background: #f0f0f0;

    .is-cell_active {

        // background:rgba(24, 160, 88, 0.1);
        svg {
            fill: #18a058;
        }
    }

    svg:focus,
    svg:active {
        border: 0;
        outline: none;
    }

    svg {
        width: 1.3em;
        flex: 0 0 1.3em;
        height: 1.2em;
        // fill: rgb(51, 54, 57);
    }

    button[data-toolbar-type="toolbar-btn"] {
        display: flex;
        align-items: center;
        padding: 0.5em 0.5em;
        outline: none;
        border: none;
        border-radius: 0.2em;
        // background: transparent;
        cursor: pointer;
        height: 3em;
        &.is-disable {
            cursor: not-allowed;
            svg {
                fill: #666;
            }
        }
    }
    
}
</style>