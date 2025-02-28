<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button :class="[
                'toolbar_btn',
                {
                    'is-cell_active': editor&&editor.isActive('strike'),
                },
                { 'is-disable': !editor.isEditable }
            ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Strike')">
                <StrikeIcon/>
            </button>
        </template>
        <span>删除线</span>
    </NTooltip>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui";
import { useSelectCore } from "../../hooks/useSelect";
import StrikeIcon from '../../icons/strike-icon.svg'

const { majorEditor, editor } = useSelectCore();

// 设置文本样式
function handleTextStyle(key: string) {
    if (!editor.isEditable) return
    majorEditor.setTextStyle(key);
}
</script>