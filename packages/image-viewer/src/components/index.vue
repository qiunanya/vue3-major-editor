<template>
    <div v-if="visible" class="images-viewer-container__root">
        图片预览器弹窗
        <button @click="close">点击关闭</button>
        <img :src="current" alt="">
    </div>
</template>
<script setup>
import { watch } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    current: {
        type: String,
        default: () => {
            return ''
        }
    },
    list: {
        type: Array,
        default: () => {
            return []
        }
    },
    onClose: {
        type: Function,
        default: () => {
            return () => {}
        }
    }
})

const emits = defineEmits(['on-close'])

watch(() => props.visible, (newValue, oldValue) => {
//   console.log(`visible 从 ${oldValue} 变为了 ${newValue}`);
}, {
    deep: true,
    immediate: true
});

function close () {
    // props.visible = false
    props.onClose()
    emits('on-close')
}

</script>

<style lang="scss" src="../style/index.scss"></style>