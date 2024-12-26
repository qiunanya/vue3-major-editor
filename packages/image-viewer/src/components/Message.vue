<template>
<div :class="['hotkey-tip__wrap', {'is-active_key': isActive }, { 'is-mobile': getUserAgent()}, { 'is-pc': !getUserAgent()}]">
    <p class="item-key">⚠&nbsp;已经是最后一张图片了</p>
</div>
</template>
<script setup lang="ts">
import { watch } from 'vue';
import { getUserAgent } from '../utils';

const props = defineProps({
    isActive: {
        type: Boolean, 
        default: () => {
            return false
        }
    }
})

watch(() => props.isActive, (newValue, oldValue) => {
    if (newValue) {
        setTimeout(() => {

        }, 2000)
    }
})

</script>
<style lang="scss" scoped>
.hotkey-tip__wrap {
    padding: 0.5rem 1rem;
    border-radius: .66rem;
    background: tomato;
    position: fixed;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
    &.is-pc {
        left: 50%;
        top: 10px;
    }
    &.is-mobile {
        bottom: 0px;
        left: 30%;
    }
    &.is-active_key {
        opacity: 1;
    }
    .item-key {
        border-radius: 0.2rem;
        // border-top: 1px solid #f5f5f5;
        display: inline-block;
        // text-shadow: 0 1px 0 #f5f5f5;
        text-transform: capitalize;
        margin-inline-start: 0.2em;
        margin-inline-end: 0.2em;
        margin-block-start: 0.2em;
        margin-block-end: 0.2em;
        color: #fff;
    }
}
</style>