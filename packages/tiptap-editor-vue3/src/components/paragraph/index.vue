<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button :class="[
                'toolbar_btn',
                {
                    'is-cell_active': editor && editor.isActive('paragraph'),
                },
                { 'is-disable': !editor.isEditable }
            ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Paragraph')">
                <svg viewBox="0 0 1024 1024" width="200" height="200">
                    <path
                        d="M128 224C128 206.336 142.336 192 160 192l704 0C881.664 192 896 206.336 896 224l0 0C896 241.664 881.664 256 864 256l-704 0C142.336 256 128 241.664 128 224L128 224zM384 416C384 433.664 398.336 448 416 448l448 0C881.664 448 896 433.664 896 416l0 0C896 398.336 881.664 384 864 384l-448 0C398.336 384 384 398.336 384 416L384 416zM384 608C384 625.664 398.336 640 416 640l448 0c17.664 0 32-14.336 32-32l0 0C896 590.336 881.664 576 864 576l-448 0C398.336 576 384 590.336 384 608L384 608zM384 800C384 817.664 398.336 832 416 832l448 0c17.664 0 32-14.336 32-32l0 0c0-17.664-14.336-32-32-32l-448 0C398.336 768 384 782.336 384 800L384 800zM164.352 765.312 313.6 616C317.888 611.776 320 606.72 320 601.024S317.888 590.272 313.6 585.984L164.352 436.672C160.064 432.384 155.136 430.336 149.248 430.336c-5.696 0-10.624 2.048-14.976 6.336C130.048 440.896 128 445.888 128 451.648l0 298.688c0 5.76 2.048 10.752 6.272 14.912 4.352 4.288 9.344 6.4 14.976 6.4C155.136 771.712 160.064 769.6 164.352 765.312z"
                        fill="#020202"></path>
                </svg>
            </button>
        </template>
        <span>段落</span>
    </NTooltip>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui";
import { useEditorCore } from "@/hooks/useEditorCore";

const { editor } = useEditorCore();

// 设置文本样式
function handleTextStyle(key: string) {
    // editor.chain().focus().setParagraph().run()
    if (!editor.isEditable) return
}
</script>