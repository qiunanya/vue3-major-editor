<template>
    <h3></h3>
    <!-- 指令绑定值1：v-image-viewer="'red'" -->
    <!-- 指令绑定值2：v-image-viewer:zoom="1.5" -->
    <!-- 指令方式打开组件 -->
    <!-- <div v-image-viewer:zoom="1.5" class="viewer-image-test">
        图片预览器
    </div> -->
    <h2 class="h2" style="margin-right: 0.2em;">ImagesViewerVue3</h2>
    <!-- 指令使用图片预览器 -->
    <div>
        <h5>指令使用图片预览器</h5>
        <img class="img-item" src="https://picsum.photos/id/10/2500/1667" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/11/2500/1667" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/20/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/19/2500/1667" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/22/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/26/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/24/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/29/4000/2670" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/23/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/23/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/24/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/25/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/26/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/27/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/28/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/29/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/30/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/31/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/32/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/33/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/34/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/35/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/36/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/37/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/23/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/23/367/267" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/19/2500/1667" v-image-viewer/>
        <img class="img-item" src="https://picsum.photos/id/11/2500/1667" v-image-viewer/>
    </div>
   
    <!-- 组件方式使用图片预览器 -->
    <div>
        <h5>组件方式使用图片预览器</h5>
        <ImagesViewerVue3>
            <img class="img-item" src="https://picsum.photos/id/6/5000/3333"/>
            <img class="img-item" src="https://picsum.photos/id/10/2500/1667"/>
            <img class="img-item" src="https://picsum.photos/id/11/2500/1667"/>
        </ImagesViewerVue3>
    </div>
    

    <!-- API 使用图片预览器 -->
    <div>
        <h5>API 调用图片预览器</h5>
        <img @click="open" class="img-item" src="https://picsum.photos/id/19/2500/1667" alt="" />
    </div>
</template>

<script setup lang="ts">
import { imageViewerApi, onUpdate } from 'images-viewer-vue3'

onUpdate((image:string, index: number) => {
    console.log(image, index)
})

const open = (evt:Event) => {
    if (!evt.target) return
    const iDom = evt.target as HTMLImageElement
    imageViewerApi({
        current: iDom.src,
        // Enable flip animation
        imageDom: iDom
    })
}
</script>

<style lang="scss">
.h2 {
    margin: 5px 0;
    color: #646cff;
}
.img-item {
    display: inline;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    margin: 0 10px;
}
</style>