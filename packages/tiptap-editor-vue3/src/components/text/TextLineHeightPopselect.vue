<template>
<NPopselect v-model:value="selectLineHeight" trigger="click" :options="lineHeightOptions"
    :on-update:value="handleLineHeight">
    <NTooltip placement="top" trigger="hover">
        <template #trigger>
            <button class="toolbar-icon--btn" :disabled="isActive" data-editor-toolbar-btn="true">
                <svg viewBox="0 0 1097 1024" width="200" height="200">
                    <path
                        d="M37.888 155.355429v-109.714286h1024.219429v109.714286H37.888zM476.891429 445.952v-109.714286h584.265142v109.714286H476.891429z m0.877714 225.718857v-109.714286h582.656v109.714286H477.622857zM40.228571 958.025143v-109.714286h1018.587429v109.714286H40.228571z m-40.301714-514.925714l181.833143-172.690286L363.52 443.172571H-0.073143z m1.974857 148.772571h363.300572L183.588571 762.660571 1.901714 591.872z">
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

<script setup lang="ts" name="TextLineHeightPopselect">
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
    lineHeightOptions: {
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

const selectLineHeight = ref("1.5");
const handleLineHeight = (val: string) => {
    selectLineHeight.value = val
    props.command(val)
};

</script>