<template>
<NPopover content-class="toolbar-color-picker__popover" ref="npopoverCLRef" style="max-height: 270px;max-width: 300px;" trigger="click" placement="bottom" scrollable>
<template #trigger>
    <NTooltip placement="top" trigger="hover">
        <template #trigger>
            <button :class="[{ 'is-disable': ''}]" data-toolbar-type="toolbar-btn">
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
        <span>{{ tipText }}</span>
    </NTooltip>
</template>
<div class="color-picker__wrap">
    <p class="color-picker-name flex-wrap">
        <span>颜色面板</span>
        <button class="color-default__button" @click.stop="handleColorPicker('')">恢复默认</button>
    </p>
    
    <div class="color-picker-list">
        <span 
            class="color-list-item" 
            v-for="(item, index) in colors" 
            :key="index" 
            :style="{background: item}"
            @click.stop="handleColorPicker(item)">
        </span>
        <span class="color-list-item disabled-icon" @click.stop="handleColorPicker('')">
            <DisabledIcon></DisabledIcon>
        </span>
    </div>
    <p class="color-picker-name">颜色选择器</p>
    <!-- <input class="color-picker__input" v-model="selectColor" type="color" list="" @input="onChangeColor" /> -->
    <n-color-picker v-model:value="selectColor" :on-update:value="colorPickerUpdate" :swatches="[
        '#FFFFFF',
        '#18A058',
        '#2080F0',
        '#F0A020',
        'rgba(208, 48, 80, 1)',
        ]" :show-alpha="true" />
</div>
</NPopover>
</template>
<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import { NTooltip, NPopover, NColorPicker } from "naive-ui";
import { inject, ref, unref } from "vue";
import DisabledIcon from "@/icons/disabled-icon.svg"; 

const editor = inject('editor') as Editor
const npopoverCLRef = ref<InstanceType<typeof NPopover> | null>(null)
 
const props = defineProps({
    isActive: {
        type: Boolean,
        default: false,
    },
    isReadonly: {
        type: Boolean,
        default: false,
    },
    colors: {
        type: Array<string>,
        default: []
    },
    tipText: {
        type: String,
        default: '暂无提示'
    }
})

const selectColor = ref('#94ddde')
const colorPickerUpdate = (value: string):void => {
    editor.commands.setColor(value)
}
const onChangeColor = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    handleColorPicker(target.value)
}

const handleColorPicker = (color: string) => {
    if (color) editor.commands.setColor(color)
    else {
        editor.commands.unsetColor()
    }
    if (!npopoverCLRef.value) return 
    npopoverCLRef.value.setShow(false)
    // unref(npopoverCLRef.value).hide();
}
</script>

<style lang="scss" scoped>
.toolbar-color-picker__popover {
    .flex-wrap {
        display: flex;
        justify-content: space-between;
    }
    .color-picker__wrap {
        .color-picker-name {
            margin: 5px 0;
        }
        .color-picker__input {
            border: none;
            border-radius: 4px;
        }
        .color-default__button {
            // height: 27px;
            background-color: #f0f0f0;
            border: none;
            color: #18a058;
            border-radius: 4px;
        }
        .color-picker-list {
            display: flex;
            flex-wrap: wrap;
            .color-list-item {
                width: 25px;
                height: 25px;
                margin: 2px;
                border-radius: 0.2rem;
                &.disabled-icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #eee;
                    color: #ff4500;
                }
            }
        }
    }
}
</style>