<template>
    <div ref="viewerWrapRef" class="viewer-root">
        <slot></slot>
    </div>
</template>

<script setup>
import { ref, onMounted, useSlots } from 'vue';
import { imageViewerApi } from '../index';

const imageList = ref([])
const viewerWrapRef = ref(null)

const slots = useSlots()

const emits = defineEmits(['on-click'])
onMounted(() => {
    const conents = slots.default()
    imageList.value = conents.map(mp => mp.props.src)
    if (viewerWrapRef.value) {
        const images = viewerWrapRef.value.querySelectorAll('img')
        images.forEach(el => {
            el.onclick = function (evt) {
                const { src } = evt.target
                imageViewerApi(src)
                // 传递事件到外部
                emits('on-click', { evt, image: src })
            }
        })
    }
})
</script>