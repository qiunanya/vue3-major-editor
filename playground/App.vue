<template>
    
    <h3>图片预览器开发</h3>
    <!-- 指令绑定值1：v-image-viewer="'red'" -->
    <!-- 指令绑定值2：v-image-viewer:zoom="1.5" -->
    <!-- 指令方式打开组件 -->
    <!-- <div v-image-viewer:zoom="1.5" class="viewer-image-test">
        图片预览器
    </div> -->
    <!-- 指令使用图片预览器 -->
    <div>
        <h5>指令使用图片预览器</h5>
        <img v-image-viewer src="https://picsum.photos/id/19/2500/1667" alt="" />
    </div>
   
    <!-- 组件方式使用图片预览器 -->
    <div>
        <h5>组件方式使用图片预览器</h5>
        <ImageViewerVue3>
            <img src="https://picsum.photos/id/6/5000/3333"/>
            <img src="https://picsum.photos/id/10/2500/1667"/>
            <img src="https://picsum.photos/id/11/2500/1667"/>
        </ImageViewerVue3>
    </div>
    

    <!-- API 使用图片预览器 -->
    <div>
        <h5>API 调用图片预览器</h5>
        <button @click="open" style="display: block;">打开图片预览器</button>
        <img v-image-viewer src="https://picsum.photos/id/19/2500/1667" alt="" />
    </div>
   
</template>

<script setup>
import { imageViewerApi } from 'image-viewer-vue3'

const open = () => {
    imageViewerApi('https://picsum.photos/id/11/2500/1667')
}
</script>

<style lang="scss">
img {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    margin: 0 10px;
}
</style>