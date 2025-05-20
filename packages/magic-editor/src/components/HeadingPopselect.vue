<template>
<NPopselect v-model:value="selectHvalue" trigger="hover" :options="levels" :on-update:value="handleHeading">
    <NTooltip placement="top" trigger="hover">
        <template #trigger>
            <button :class="[{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn">
                <svg viewBox="0 0 1024 1024" width="200" height="200">
                    <path
                        d="M768 512v384c0 35.4 28.6 64 64 64s64-28.6 64-64V128c0-35.4-28.6-64-64-64s-64 28.6-64 64v256H256V128c0-35.4-28.6-64-64-64S128 92.6 128 128v768c0 35.4 28.6 64 64 64s64-28.6 64-64V512h512z">
                    </path>
                </svg>
                <svg viewBox="0 0 1024 1024" width="200" height="200">
                    <path d="M209.656 344.031l298.604 335.938 306.084-335.839-604.688-0.099z"></path>
                </svg>
            </button>
        </template>
        <span>{{ tipText }}</span>
    </NTooltip>
</NPopselect>
</template>

<script setup lang="ts">
import { Void } from "@/utils";
import { Editor } from "@tiptap/vue-3";
import { NPopselect, NTooltip, SelectOption } from "naive-ui";
import type { Level } from '@tiptap/extension-heading';

const props = defineProps({
    editor: {
        type: Editor,
        required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    levels: {
      type: Array<SelectOption>,
      default: []
    },
    tipText: {
      type: String,
      default: '暂无提示'
    },
    command: {
        type:Function,
        default:Void
    }
})

const selectHvalue = ref("4");

const handleHeading = (level: Level) => {
    console.log(level, 6666)
    // props.editor.commands.toggleHeading({ level })
    props.editor.chain().toggleHeading({ level }).run()
}

</script>