<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button :class="[
                'toolbar_btn',
                {
                    'is-cell_active': editor&&editor.isActive('italic'),
                },
                { 'is-disable': !editor.isEditable }
            ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Italic')">
                <svg viewBox="0 0 1024 1024" width="200" height="200">
                    <path
                        d="M828.30933 0l-20.374574 89.671814h-133.856209l-195.453757 844.656372h133.856209l-20.374573 89.671814H195.927584l20.374573-89.671814H350.869108l195.453756-844.656372H411.755914L432.130488 0z">
                    </path>
                </svg>
            </button>
        </template>
        <span>斜体</span>
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