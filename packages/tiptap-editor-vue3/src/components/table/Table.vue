<template>
<NPopover ref="tablePopoverRef" content-class="toolbar-table-picker__popover" style="max-height: 340px;max-width: 335px;" trigger="click" placement="bottom" scrollable :on-update:show="doTable">
<template #trigger>
    <NTooltip placement="top" trigger="hover">
        <template #trigger>
            <button class="toolbar-icon--btn" data-editor-toolbar-btn="true">
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
<div class="table-drawing">
    <p style="margin: 5px 0; display: flex; align-items: center;">
        <strong>{{tbOptions.row}}</strong>行x<strong>{{tbOptions.column}}</strong>列, 
        表头: <input type="checkbox" v-model="tbOptions.isWithHeaderRow">
        <a href="#" class="confirm__btn" @click.stop="handleTable">确定</a>
    </p>
    <div ref="tableFilterWrapRef" class="table-drawing__area" 
        @mousedown.stop="onMousedown"
        @mousemove.stop="onMousemove"
        @mouseleave.stop="onMouseleave"
        @mouseup.stop="onMouseup">
        <span class="table-drawing-td__item" v-for="(item, index) in 100" :key="index"></span>
        <div ref="maskRef" class="table-mask__wrap"></div>
    </div>
</div>
</NPopover>
</template>

<script lang="ts" setup name="Table">
import { Editor } from '@tiptap/vue-3';
import { inject, reactive, ref } from 'vue';
import { NTooltip, NPopover } from "naive-ui";
import { useNaiveDiscrete } from '@/hooks/navie-ui';

const editor = inject('editor') as Editor
const { message, dialog, modal } = useNaiveDiscrete();

// 表格
const tbOptions = reactive({
    row: 0,
    column: 0,
    isWithHeaderRow: true
})
const tableFilterWrapRef = ref<HTMLElement | null>(null)
const maskRef = ref<HTMLElement | null>(null)
const tablePopoverRef = ref<InstanceType<typeof NPopover> | null>(null)

let startTop = 0, endTop = 0, startLeft = 0, endLeft = 0, selectedCells = [];
const isMouseDown = ref(false)

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

    if (!tablePopoverRef.value) return 
    tablePopoverRef.value.setShow(false)
}

const doTable = (val:boolean) => {
    if (val) {
        tbOptions.row = 0
        tbOptions.column = 0
    }
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
</script>

<style lang="scss" scoped>
.toolbar-table-picker__popover {
    .table-drawing {
        display: flex;
        flex-wrap: wrap;
        .confirm__btn {
            padding: 0;
            padding-inline: 0;
            margin-left: 0.5rem;
        }
        .table-drawing__area {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            column-gap: 0.15rem;
            row-gap: 0.15rem;
            position: relative;

            .table-drawing-td__item {
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
}
</style>