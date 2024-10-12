<template>
    <div>
        <h3 style="color: #646cff;">image-viewer-vue3 图片预览器</h3>
        <!-- <button @click="handleClose">手动关闭弹窗</button> -->
    </div>
    <!-- 指令使用图片预览器 -->
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

    <!-- 组件方式使用图片预览器 -->
    <div>
        <h5>组件方式使用图片预览器</h5>
        <ImageViewerVue3>
            <img class="img-item" src="https://picsum.photos/id/6/5000/3333"/>
            <img class="img-item" src="https://picsum.photos/id/10/2500/1667"/>
            <img class="img-item" src="https://picsum.photos/id/11/2500/1667"/>
        </ImageViewerVue3>
    </div>
    
</template>

<script setup>
import { ref } from 'vue'
import { onClose } from './src/index'
import ImageViewerVue3 from "./src/components/viewer.vue"

const visible = ref(false)
const handleClose = () => {
    onClose()
}
const toggleVisibility = () => {
    visible.value = !visible.value
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