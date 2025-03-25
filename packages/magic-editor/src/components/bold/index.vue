<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <!-- <button :class="[
                'toolbar_btn',
                {
                    'is-cell_active': isActive,
                },
                { 'is-disable': !editor.isEditable }
            ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Bold')">
                <BoldIcon/>
                {{ isActive }}
            </button> -->
            <button :class="iconClass" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Bold')">
                <BoldIcon/>
            </button>
        </template>
        <span>加粗</span>
    </NTooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NTooltip } from "naive-ui";
import { useSelectCore } from "../../hooks/useSelect";
import BoldIcon from "../../icons/bold-icon.svg"; 
import { Void } from '@/utils'

const { majorEditor, editor } = useSelectCore();
// 此处不能解构，解构后computed无法监听属性变化
// { isActive, command } = props
const props = defineProps({
    isActive: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    icons: {
      type: String,
      required: false,
    },
    command: {
        type:Function,
        default:Void
    }
})

const iconClass = computed(() => ({
    'toolbar_btn': true,
    'is-cell_active': props.isActive,
    'is-disable':  props.isReadonly
}))



// 设置文本样式
function handleTextStyle(key: string) {
    props.command()
    console.log(props.isActive)
    // if (!editor.isEditable) return
    // majorEditor.setTextStyle(key);
}
</script>