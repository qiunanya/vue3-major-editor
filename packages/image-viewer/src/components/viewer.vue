<template>
    <div ref="viewerWrapRef" class="viewer-root">
        <slot ref="slotContent"></slot>
    </div>
</template>

<script setup>
import { ref, onMounted, useSlots, getCurrentInstance, nextTick } from 'vue';
import { imageViewerApi } from '../index';

const imageList = ref([])
const viewerWrapRef = ref(null)
const slots = useSlots()

const emits = defineEmits(['on-click'])

const getSlotDom = () => {
    const instance = getCurrentInstance()
    // 通过访问 $el 来获取 slot 渲染的所有内容的 DOM
    const el = instance?.proxy.$el;
    if (el && el.children) {
        const images = Array.from(el.children)
        images.forEach(img => {
            img.onclick = function (evt) {
                const { src } = evt.target
                imageViewerApi({
                    current: src,
                    imageDom: img,
                    from: 'component'
                })
                // 传递事件到外部
                emits('on-click', { evt, image: src })
            }
        })
    }
}

onMounted(() => {
    getSlotDom()

    // const conents = slots.default()
    // imageList.value = conents.map(mp => mp.props.src)
    // if (viewerWrapRef.value) {
    //     const images = viewerWrapRef.value.querySelectorAll('img')
    //     images.forEach(el => {
    //         el.onclick = function (evt) {
    //             const { src } = evt.target
    //             imageViewerApi({
    //                 current: src,
    //                 imageDom: el,
    //                 from: 'component'
    //             })
    //             // 传递事件到外部
    //             emits('on-click', { evt, image: src })
    //         }
    //     })
    // }
})
</script>