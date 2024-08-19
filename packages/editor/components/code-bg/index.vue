<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button :class="[
                'toolbar_btn',
                {
                    'is-cell_active': editor && editor.isActive('code'),
                },
                { 'is-disable': !editor.isEditable }
            ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Code')">
                <svg viewBox="0 0 1024 1024" width="200" height="200">
                    <path
                        d="M500.6336 124.6208L107.6736 512h776.6528L500.6336 124.6208z m434.432 362.0352a51.2 51.2 0 0 1 0 72.448l-398.2336 398.2336a51.2 51.2 0 0 1-72.3968 0L66.2016 559.104a51.2 51.2 0 0 1 0-72.448L464.384 88.4224a52.224 52.224 0 0 1 0.512-0.512l-0.512-0.512a51.1488 51.1488 0 0 1 72.3456 0l398.336 399.2576zM947.2 921.6c-42.3936 0-76.8-38.1952-76.8-85.3504 0-31.3856 25.6-88.2688 76.8-170.6496 51.2 82.3808 76.8 139.264 76.8 170.6496 0 47.104-34.4064 85.3504-76.8 85.3504z">
                    </path>
                </svg>
            </button>
        </template>
        <span>代码标签</span>
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