<template>
<NPopover content-class="toolbar-color-picker__popover" ref="npopoverCLRef" style="max-height: 270px;max-width: 300px;" trigger="click" placement="bottom" scrollable>
<template #trigger>
    <NTooltip placement="top" trigger="hover">
        <template #trigger>
            <button class="toolbar-icon--btn" data-editor-toolbar-btn="true">
                <svg viewBox="0 0 1024 1024" width="200" height="200">
                    <path d="M0 0m56.888889 0l910.222222 0q56.888889 0 56.888889 56.888889l0 910.222222q0 56.888889-56.888889 56.888889l-910.222222 0q-56.888889 0-56.888889-56.888889l0-910.222222q0-56.888889 56.888889-56.888889Z" fill="#05AFC8"></path>
                    <path d="M284.444444 853.333333H227.555556L483.555556 170.666667h56.888888L284.444444 853.333333z" fill="#FFFFFF"></path>
                    <path d="M540.444444 170.666667h-56.888888L739.555556 853.333333h56.888888L540.444444 170.666667z" fill="#FFFFFF"></path>
                    <path d="M341.333333 625.777778h341.333334v56.888889H341.333333z" fill="#FFFFFF"></path>
                </svg>
            </button>
        </template>
        <span>{{ tipText }}</span>
    </NTooltip>
</template>
<div class="color-picker__wrap">
    <p class="color-picker-name flex-wrap">
        <span>颜色面板</span>
        <button class="color-default__button" @click.stop="handlebgColorPicker('')">恢复默认</button>
    </p>
    
    <div class="color-picker-list">
        <span 
            class="color-list-item" 
            v-for="(item, index) in colors" 
            :key="index" 
            :style="{background: item}"
            @click.stop="handlebgColorPicker(item)">
        </span>
        <span class="color-list-item disabled-icon" @click.stop="handlebgColorPicker('')">
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
<script setup lang="ts" name="BackgroundColorPopover">
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
    handlebgColorPicker(target.value)
}

const handlebgColorPicker = (color: string) => {
    if (color) editor.commands.setBackgroundColor(color)
    else {
        editor.commands.unsetBackgroundColor()
    }
    // const { selection }  = editor.state
    // if (selection.from !== selection.to) {
    //     editor.commands.setTextSelection({ from: selection.from, to: selection.to})
    //     editor.commands.focus();
    // }
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