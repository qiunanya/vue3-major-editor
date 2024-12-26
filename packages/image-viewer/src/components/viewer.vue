<template>
    <div ref="viewerWrapRef" class="viewer-root">
        <slot ref="slotContent"></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, nextTick } from 'vue';
import type { ComponentInternalInstance } from 'vue';
import { imageViewerApi } from '../index';
import { ViewImageType } from '../types/image-viewer';

const emits = defineEmits(['on-click'])

const imageTempData = ref<ViewImageType[]>([])

const getSlotDom = () => {
    const instance = getCurrentInstance() as ComponentInternalInstance

    if (instance&&instance?.proxy) {
        // 通过访问 $el 来获取 slot 渲染的所有内容的 DOM
        const el = instance?.proxy.$el;
        nextTick().then(res => {
            const imageChildren = Array.from(el.children) as HTMLImageElement[]
            imageChildren.forEach((el:HTMLImageElement, index: number) => {
                // 建立唯一标识符data-index
                el.setAttribute('data-index', `${index}`)
                if (el.src) {
                    imageTempData.value.push({key:`${index}`, index, url:  el.src })
                }

                // 解决：动态监听src变化，当手动更新img的src时，也会触发
                const observer = new MutationObserver(() => {
                    if (el.src) {
                        // 只在src有值时添加
                        imageTempData.value.push({key:`${index}`, index, url:  el.src })
                        // 停止观察
                        observer.disconnect(); 
                    }
                });
                // 观察src属性的变化
                observer.observe(el, { attributes: true, attributeFilter: ['src'] });

                el.onclick = function (evt:Event) {
                    const { src } = evt.target as HTMLImageElement
                    const imageItems = imageTempData.value.sort((a, b) => {
                        return Number(a.key) - Number(b.key)
                    })

                    imageViewerApi({
                        specifyIndex: index,
                        current: src,
                        imageDom: el,
                        from: 'component',
                        images: imageItems.map(el => el.url).filter(el => el)
                    })

                    // 传递事件到外部
                    emits('on-click', { evt, image: src })
                }
            })
        })
    }
}

onMounted(() => {
    getSlotDom()
})
</script>