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
                <svg viewBox="0 0 1024 1024" width="200" height="200">
                    <path d="M238.762667 170.666667L448 423.594667 657.237333 170.666667H768l-264.618667 319.872L768 810.410667V810.666667h-110.506667l-209.493333-253.184L238.506667 810.666667H128v-0.256l264.618667-319.872L128 170.666667h110.762667zM919.466667 707.413333a34.133333 34.133333 0 1 0-56.32-15.36l-49.28 14.08a85.333333 85.333333 0 1 1 140.714666 38.570667L885.077333 810.666667H981.333333v42.666666h-170.666666v-42.666666l108.8-103.253334z"></path>
                </svg>
            </button>
        </template>
        <span>下标</span>
    </NTooltip>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui";
import { useSelectCore } from "../../hooks/useSelect";

const { majorEditor, editor } = useSelectCore();

// 设置文本样式
function handleTextStyle(key: string) {
    if (!editor.isEditable) return
    majorEditor.setTextStyle(key);
}
</script>