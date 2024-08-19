<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button :class="[
                'toolbar_btn',
                {
                    'is-cell_active': editor && editor.isActive('blockquote'),
                },
                { 'is-disable': !editor.isEditable }
            ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Blockquote')">
                <svg viewBox="0 0 1025 1024" width="200" height="200">
                    <path
                        d="M224.992 448c123.712 0 224 100.288 224 224s-100.288 224-224 224-224-100.288-224-224l-0.992-32c0-247.424 200.576-448 448-448l0 128c-85.472 0-165.824 33.28-226.272 93.728-11.648 11.648-22.24 24.032-31.84 37.024 11.424-1.792 23.168-2.752 35.104-2.752zM800.992 448c123.712 0 224 100.288 224 224s-100.288 224-224 224-224-100.288-224-224l-0.992-32c0-247.424 200.576-448 448-448l0 128c-85.472 0-165.824 33.28-226.272 93.728-11.648 11.648-22.24 24.032-31.84 37.024 11.456-1.792 23.168-2.752 35.104-2.752z"
                        ></path>
                </svg>
            </button>
        </template>
        <span>引用</span>
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