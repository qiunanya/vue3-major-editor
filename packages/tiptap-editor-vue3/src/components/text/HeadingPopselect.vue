<template>
<NPopselect 
    v-model:value="selectHvalue" 
    trigger="click" 
    :options="levels" 
    :on-update:value="handleHeading"
    :render-label="renderLabel"
    >
    <NTooltip placement="top" trigger="hover">
        <template #trigger>
            <button  class="toolbar-icon--btn" data-editor-toolbar-btn="true">
                <span v-if="selectedData.label" style="font-size: medium;">标题 {{ selectedData.value }}</span>
                <svg v-else viewBox="0 0 1024 1024" width="200" height="200">
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

<script setup lang="ts" name="HeadingPopselect">
import { DEFAULT_TITLE_COLOR, PRIMARY_COLOR, Void } from "@/utils";
import { Editor } from "@tiptap/vue-3";
import { NPopselect, NTooltip, SelectOption } from "naive-ui";
import type { Level } from '@tiptap/extension-heading';
import { VNodeChild } from "vue";
import { DEFAULT_TITLE, FONT_SIZE_TITLE } from '@/utils'

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

const selectHvalue = ref(DEFAULT_TITLE);
const selectedData = ref<SelectOption>({})
const handleHeading = (level: Level) => {
    selectHvalue.value = level+''
    selectedData.value = props.levels.find((el:SelectOption) => el.value === level) as SelectOption
    if (+level===7) {
        props.editor.commands.setParagraph()
    } else {
        props.editor.commands.toggleHeading({ level: +level as Level })
    }
}



const renderLabel = (option: SelectOption, selected: boolean):VNodeChild => {
    return[
        h('span', {
            style: {
                color: selected ? PRIMARY_COLOR : DEFAULT_TITLE_COLOR,
                fontSize: FONT_SIZE_TITLE[Number(option.value)],
                marginBlockStart: '0.67em',
                marginBlockEnd: '0.67em',
                marginInlineStart: '0px',
                marginInlineEnd: '0px',
                fontWeight: 'bold',
                unicodeBidi: 'isolate'
            }
        }, option.label as string)
    ]
}
</script>