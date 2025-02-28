<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button :class="['toolbar_btn',{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn" @click="handleClearContent">
                <ClearIcon/>
            </button>
        </template>
        <span>清空文档</span>
    </NTooltip>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui"
import { useSelectCore } from "../../hooks/useSelect"
import { useNaiveDiscrete } from "../../hooks/navie-ui"
import ClearIcon from '../../icons/clear-icon.svg'

const { majorEditor, editor } = useSelectCore()
const { message, dialog } = useNaiveDiscrete()

function handleClearContent () {
    const texts = editor.getText();
    if (!texts) {
        message.info("暂无内容可清空");
        return;
    }
    dialog.warning({
        title: "警告",
        content: "你确定要清空全部文档内容吗？",
        positiveText: "确定",
        negativeText: "取消",
        maskClosable: false,
        onPositiveClick: () => {
            if (editor) {
                editor.commands.clearContent();
            }
        },
        onMaskClick: () => {
            // message.success('不能关闭')
        },
        onEsc: () => {
            // message.success('通过 esc 关闭')
        },
    });
}
</script>