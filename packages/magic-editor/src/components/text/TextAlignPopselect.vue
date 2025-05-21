<template>
<NPopselect 
    v-model:value="selectTextAlign" 
    trigger="hover" 
    :options="alignments"
    :on-update:value="handleTextAlign"
    >
    <NTooltip placement="top" trigger="hover">
        <template #trigger>
            <button :class="[{ 'is-disable': !editor.isEditable }]" data-toolbar-type="toolbar-btn">
                <svg viewBox="0 0 1024 1024" width="200" height="200">
                    <path
                        d="M114.259 124.62h795.48c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-795.48c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26zM114.259 798.86h456.6c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-456.6c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26zM114.259 349.37h456.6c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-456.6c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26zM114.259 574.16h795.48c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-795.48c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26z">
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
    alignments: {
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

const selectTextAlign = ref("left");
const textAlignOptions = ref<Array<SelectOption>>();
const handleTextAlign = (val: string) => {
    selectTextAlign.value = val;
    props.command(val)
}
</script>