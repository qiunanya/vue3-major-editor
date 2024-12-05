<template>
    <div>
        <h3 style="color: #646cff;">image-viewer-vue3 图片预览器</h3>
        <button @click="handleClose">手动关闭弹窗</button>
        <button @click="changeSrc">更换src</button>
        {{  currentSrc  }}
    </div>
    <div>
        <h5>指令使用图片预览器</h5>
        <img class="img-item" v-for="(item, index) in dataList" :key="index" :src="item" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/10/2500/1667" v-image-viewer/>
        <img class="img-item" v-image-viewer v-lazy-image="'https://picsum.photos/id/11/2500/1667'"/>
        <img class="img-item" v-image-viewer v-lazy-image="currentSrc"/>
    </div>

    <div>
        <h5>组件方式使用图片预览器</h5>
        <ImageViewerVue3>
            <img class="img-item" v-lazy-image="'https://picsum.photos/id/6/5000/3333'"/>
            <img class="img-item" src="https://picsum.photos/id/10/2500/1667"/>
            <img class="img-item" src="https://picsum.photos/id/11/2500/1667"/>
        </ImageViewerVue3>
    </div>

    <div>
        <h5>API 调用图片预览器</h5>
        <img class="img-item" v-for="(item, index) in dataList.slice(0, 3)" :key="index" @click="toggleApi($event, index)" :src="item" alt="" />
        <!-- <img class="img-item" @click="toggleApi" src="https://picsum.photos/id/11/2500/1667"/> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClose, imageViewerApi, onUpdate } from './src/index'
import ImageViewerVue3 from "./src/components/viewer.vue"

const dataList = ref([
        "https://picsum.photos/id/10/2500/1667",
        "https://picsum.photos/id/64/2500/1667",
        "https://picsum.photos/id/11/2500/1667",
        "https://picsum.photos/id/20/367/267",
        "https://example.com/protected-image.jpg",
        "https://example.com/protected-image.jpg",
        "https://picsum.photos/id/19/2500/1667",
        "https://picsum.photos/id/22/367/267",
        "https://picsum.photos/id/26/367/267",
        "https://picsum.photos/id/27/367/267",
        "https://picsum.photos/id/28/367/267",
        "https://picsum.photos/id/24/367/267",
        "https://picsum.photos/id/29/4000/2670",
        "https://picsum.photos/id/23/367/267",
        "https://picsum.photos/id/24/367/267",
        "https://picsum.photos/id/25/367/267",
        "https://picsum.photos/id/26/367/267",
        "https://picsum.photos/id/27/367/267",
        "https://picsum.photos/id/28/367/267",
        "https://picsum.photos/id/29/367/267",
        "https://picsum.photos/id/30/367/267",
        "https://picsum.photos/id/31/367/267",
        "https://picsum.photos/id/32/367/267",
        "https://picsum.photos/id/33/367/267",
        "https://picsum.photos/id/34/367/267",
        "https://picsum.photos/id/35/367/267",
        // "https://picsum.photos/id/36/367/267",
        // "https://picsum.photos/id/37/367/267",
        // "https://picsum.photos/id/38/367/267",
        // "https://picsum.photos/id/10/367/267",
        // "https://picsum.photos/id/11/367/267",
        // "https://picsum.photos/id/12/367/267",
        // "https://picsum.photos/id/13/367/267",
        // "https://picsum.photos/id/15/367/267",
        // "https://picsum.photos/id/19/2500/1667",
        // "https://picsum.photos/id/16/2500/1667",
        // "https://picsum.photos/id/11/2500/1667",
])

const currentSrc = ref('https://picsum.photos/id/13/367/267')

onUpdate((image:string, index: number) => {
    console.log(image, index)
})

const changeSrc = () => {
    currentSrc.value = 'https://picsum.photos/id/15/367/267'
}
const handleClose = () => {
    onClose()
}
const toggleApi = (evt:Event, index: number) => {
    if (!evt.target) return
    const iDom = evt.target as HTMLImageElement
    imageViewerApi({
        specifyIndex: 0,
        current: iDom.src,
        imageDom: iDom,
        images: dataList.value.slice(0, 3)
    })
}
</script>

<style>
.img-item {
    width: 120px;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    margin: 0 10px;
}
</style>