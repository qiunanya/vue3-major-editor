<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button class="toolbar_btn" :style="{ cursor: !isUndo ? 'not-allowed' : 'pointer' }"
                @click="editor.chain().focus().undo().run()" :disabled="!isUndo">
                <svg viewBox="0 0 1024 1024" width="200" height="200">
                    <path
                        d="M223.300267 221.320533h410.555733c214.493867 0 388.437333 173.192533 388.437333 386.798934 0 213.674667-173.943467 386.8672-388.437333 386.8672H116.053333a64.580267 64.580267 0 0 1-64.7168-64.512c0-35.566933 29.013333-64.443733 64.7168-64.443734h517.802667a258.389333 258.389333 0 0 0 258.935467-257.911466 258.389333 258.389333 0 0 0-258.935467-257.8432h-415.061333L293.546667 424.823467a64.3072 64.3072 0 0 1-28.672 108.7488 64.853333 64.853333 0 0 1-62.941867-17.6128L19.114667 333.687467a64.375467 64.375467 0 0 1 0-91.204267L201.9328 60.074667a64.9216 64.9216 0 0 1 91.613867 0c25.258667 25.122133 25.258667 65.9456 0 91.136l-70.314667 70.0416z"
                        :fill="!isUndo ? '#666' : ''"></path>
                </svg>
            </button>
        </template>
        <span>撤销</span>
    </NTooltip>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NTooltip } from "naive-ui";
import { useSelectCore } from "../../hooks/useSelect";

const { majorEditor, editor } = useSelectCore();

const isUndo = computed(() => {
    return editor && editor.can().chain().focus().undo().run() || false
});
</script>