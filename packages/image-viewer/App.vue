<template>
    <div>
        <h3 style="color: #646cff;">image-viewer-vue3 图片预览器</h3>
        <button @click="handleClose">手动关闭弹窗</button>
    </div>
    <!-- 指令使用图片预览器 -->
    <div>
        <h5>指令使用图片预览器</h5>
        <img class="img-item" src="https://picsum.photos/id/19/2500/1667" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/11/2500/1667" v-image-viewer/>
    </div>
</template>

<script setup>
import { onClose } from './src/index'

const handleClose = () => {
    onClose()
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