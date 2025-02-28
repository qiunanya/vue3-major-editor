<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button :class="[
                'toolbar_btn',
                {
                    'is-cell_active': editor && editor.isActive('codeBlock'),
                },
                { 'is-disable': !editor.isEditable }
            ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('CodeBlock')">
                <CodeBlockIcon/>
            </button>
        </template>
        <span>代码块</span>
    </NTooltip>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui";
import { useSelectCore } from "../../hooks/useSelect";
import CodeBlockIcon from '../../icons/code-block-icon.svg'

const { majorEditor, editor } = useSelectCore();

// 设置文本样式
function handleTextStyle(key: string) {
    if (!editor.isEditable) return
    majorEditor.setTextStyle(key);
}
</script>