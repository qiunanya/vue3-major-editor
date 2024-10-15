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
        <img v-image-viewer src="https://picsum.photos/id/19/2500/1667"/>
        <img v-image-viewer src="https://picsum.photos/id/63/2500/1667"/>
    </div>
   
    <!-- 组件方式使用图片预览器 -->
    <div>
        <h5>组件方式使用图片预览器</h5>
        <ImagesViewerVue3>
            <img src="https://picsum.photos/id/6/5000/3333"/>
            <img src="https://picsum.photos/id/10/2500/1667"/>
            <img src="https://picsum.photos/id/11/2500/1667"/>
        </ImagesViewerVue3>
    </div>
    

    <!-- API 使用图片预览器 -->
    <div>
        <h5>API 调用图片预览器</h5>
        <img @click="open" src="https://picsum.photos/id/19/2500/1667" alt="" />
    </div>
   
</template>

<script setup lang="ts">
import { imageViewerApi } from 'images-viewer-vue3'

const open = (evt) => {
    imageViewerApi({
        current: evt.target.src,
        // Enable flip animation
        imageDom: evt.target
    })
}
</script>

<style lang="scss">
img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    margin: 0 10px;
}
</style>