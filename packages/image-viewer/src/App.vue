<template>
    <div>
        <h3 style="color: #646cff;">image-viewer-vue3 图片预览器</h3>
        <!-- <button @click="handleClose">手动关闭弹窗</button> -->
    </div>
    <div>
        <h5>指令使用图片预览器</h5>
        <img class="img-item" src="https://picsum.photos/id/10/2500/1667" alt="" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/11/2500/1667" alt="" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/20/367/267" alt="" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/19/2500/1667" alt="" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/22/367/267" alt="" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/26/367/267" alt="" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/24/367/267" alt="" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/29/4000/2670" alt="" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/23/367/267" alt="" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/19/2500/1667" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/11/2500/1667" v-image-viewer/>
    </div>

    <div>
        <h5>组件方式使用图片预览器</h5>
        <ImageViewerVue3>
            <img class="img-item" src="https://picsum.photos/id/6/5000/3333"/>
            <img class="img-item" src="https://picsum.photos/id/10/2500/1667"/>
            <img class="img-item" src="https://picsum.photos/id/11/2500/1667"/>
        </ImageViewerVue3>
    </div>

    <div>
        <h5>API 调用图片预览器</h5>
        <img class="img-item" @click="toggleApi" src="https://picsum.photos/id/64/2500/1667" alt="" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClose, imageViewerApi } from './index'
import ImageViewerVue3 from "./components/viewer.vue"

const visible = ref(false)
const handleClose = () => {
    onClose()
}
const toggleApi = (evt:Event) => {
    if (!evt.target) return
    const iDom = evt.target as HTMLImageElement
    imageViewerApi({
        current: iDom.src,
        imageDom: iDom
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