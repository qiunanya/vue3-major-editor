<template>
<bubble-menu
    :editor="editor"
    :tippy-options="{ duration: 100 }"
    :should-show="shouldShowBubbleMenu">
    <div class="magic-bubble-menu">
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            <BoldIcon class="menu-icon"></BoldIcon>
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
            <ItalicIcon class="menu-icon"></ItalicIcon>
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
            <StrikeIcon class="menu-icon"></StrikeIcon>
        </button>
        
        <NTooltip placement="bottom" trigger="hover" v-if="editor.isActive('link')">
            <template #trigger>
                <button @click="openLinkUrl" :class="{ 'is-active': editor.isActive('strike') }">
                    <OpenLinkIcon class="menu-icon"></OpenLinkIcon>
                </button>
            </template>
            <span>打开链接</span>
        </NTooltip> 
        <NTooltip placement="bottom" trigger="hover" v-if="editor.isActive('link')">
            <template #trigger>
                <button @click="cancelLinkUrl" :class="{ 'is-active': editor.isActive('strike') }">
                    <CancelLinkIcon class="menu-icon"></CancelLinkIcon>
                </button>
            </template>
            <span>删除链接</span>
        </NTooltip>
    </div>
</bubble-menu>
</template>
<script setup lang="ts">
import { BubbleMenu, Editor } from "@tiptap/vue-3";
import { NTooltip } from "naive-ui";
import { inject } from "vue";
import BoldIcon from "@/icons/bold-icon.svg";
import ItalicIcon from "@/icons/italic-icon.svg";
import StrikeIcon from "@/icons/strike-icon.svg";
import OpenLinkIcon from '@/icons/open-link-icon.svg';
import CancelLinkIcon from '@/icons/cancel-link-icon.svg';

const editor:Editor = inject('editor') as Editor

// 打开链接
const openLinkUrl = () => {
    const link = editor.getAttributes('link')
    window.open(link.href)
}

// 取消链接
const cancelLinkUrl = () => {
    editor.commands.unsetLink()
}
// 隐藏菜单
const shouldShowBubbleMenu = (val:any) => {
    if (val.state) {
        const { from, to } = val.state.selection;
        // console.log(val.state.selection)
        // return from !== to && !editor.isActive("customize-image")||false
        return (from !== to) && val.editor.isActive('paragraph')
    }
    return false
};

</script>