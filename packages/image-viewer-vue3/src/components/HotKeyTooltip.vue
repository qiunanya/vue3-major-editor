<template>
<div :class="['hotkey-tip__wrap', {'is-active_key': isActiveKey }]">
    <p class="item-key">{{ hotkey }}</p>
</div>
</template>
<script setup lang="ts" name="HotKeyTooltip">

const props = defineProps({
    isActiveKey: {
        type: Boolean, 
        default: () => {
            return false
        }
    }
})

const hotkey = defineModel('hotkey', { type: String, default: "Ctrl+S" })
// console.log(hotkey.value, 8888);

</script>
<style lang="scss" scoped>
.hotkey-tip__wrap {
    padding: 0.5rem;
    border-radius: .66rem;
    background: rgba(0, 0, 0, 0.8);
    bottom: 10px;
    right: 10px;
    position: fixed;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    // box-shadow: inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9, 0 2px 3px #333;
    &.is-active_key {
        opacity: 0.8;
    }
    .item-key {
        border-radius: 0.2rem;
        // border-top: 1px solid #f5f5f5;
        display: inline-block;
        // text-shadow: 0 1px 0 #f5f5f5;
        padding: 0.2em 0.5em;
        text-transform: capitalize;
        margin-inline-start: 0.2em;
        margin-inline-end: 0.2em;
        margin-block-start: 0.2em;
        margin-block-end: 0.2em;
        color: #eee;
    }
}
</style>