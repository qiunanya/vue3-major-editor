<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button :class="[
                'toolbar_btn',
                {
                    'is-cell_active': editor && editor.isActive('bold'),
                },
                { 'is-disable': !editor.isEditable }
            ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Bold')">
                <BoldIcon/>
            </button>
        </template>
        <span>加粗</span>
    </NTooltip>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui";
import { useSelectCore } from "../../hooks/useSelect";
import BoldIcon from "../../icons/bold-icon.svg"; 


const { majorEditor, editor } = useSelectCore();
const { isActive, command } = defineProps({
    isActive: Boolean,
    command: {
        type:Function,
        default: () => {
            return ''
        }
    }
})

// 设置文本样式
function handleTextStyle(key: string) {
    command()
    console.log(isActive)
    // if (!editor.isEditable) return
    // majorEditor.setTextStyle(key);
}
</script>