<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button :class="[
                'toolbar_btn',
                {
                    'is-cell_active': editor&&editor.isActive('subscript'),
                },
                { 'is-disable': !editor.isEditable }
            ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Subscript')">
                <SubscriptIcon/>
            </button>
        </template>
        <span>下标</span>
    </NTooltip>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui"
import { useSelectCore } from "../../hooks/useSelect"
import SubscriptIcon from '../../icons/subscript-icon.svg'

const { majorEditor, editor } = useSelectCore();

// 设置文本样式
function handleTextStyle(key: string) {
    if (!editor.isEditable) return
    majorEditor.setTextStyle(key);
}
</script>