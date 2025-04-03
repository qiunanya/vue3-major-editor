<template>
<div :class="{'character-count': true, 'character-count--warning': editor.storage.characterCount.characters() === characterCount}">
    <svg
        style="width: 20;height: 20;flex: none;"
        height="20"
        width="20"
        viewBox="0 0 20 20">
        <circle
            r="10"
            cx="10"
            cy="10"
            fill="#e9ecef"
        />
        <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            stroke-width="10"
            :stroke-dasharray="`calc(${percentage} * 31.4 / 100) 31.4`"
            transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white"/>
    </svg>

    {{ editor.storage.characterCount.characters() }} / {{ characterCount }} characters
    <br>
    {{ editor.storage.characterCount.words() }} words
</div>
</template>
<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
import { computed, inject } from 'vue';

const editor = inject('editor') as Editor
const props = defineProps({
    characterCount: {
        type:Number,
        default: 10000
    }
})
const percentage = computed(() => {
    return Math.round((100 / props.characterCount) * editor.storage.characterCount.characters())
})
</script>