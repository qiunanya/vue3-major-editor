<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <button class="toolbar_btn" :style="{ cursor: !isRedo ? 'not-allowed' : 'pointer' }"
                @click="editor.chain().focus().redo().run()" :disabled="!isRedo">
                <svg viewBox="0 0 1092 1024" width="200" height="200">
                    <path
                        d="M828.893867 220.091733H418.338133C203.844267 220.091733 29.969067 393.216 29.969067 606.890667c0 213.674667 173.8752 386.798933 388.369066 386.798933h517.802667a64.580267 64.580267 0 0 0 64.7168-64.443733 64.580267 64.580267 0 0 0-64.7168-64.443734H418.338133A258.389333 258.389333 0 0 1 159.402667 606.890667a258.389333 258.389333 0 0 1 258.935466-257.911467h415.1296l-74.888533 74.615467a64.3072 64.3072 0 0 0 28.672 108.7488 64.853333 64.853333 0 0 0 62.941867-17.6128l183.022933-182.272a64.375467 64.375467 0 0 0 0-91.272534L850.193067 58.914133a64.9216 64.9216 0 0 0-91.5456 0 64.3072 64.3072 0 0 0 0 91.136l70.314666 70.0416z"
                        :fill="!isRedo ? '#666' : ''"></path>
                </svg>
            </button>
        </template>
        <span>重做</span>
    </NTooltip>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NTooltip } from "naive-ui";
import { useSelectCore } from "../../hooks/useSelect";

const { majorEditor, editor } = useSelectCore();

const isRedo = computed(() => {
    return editor && editor.can().chain().focus().redo().run() || false
});
</script>

<style lang="scss">
@import "./css/common.scss";
</style>