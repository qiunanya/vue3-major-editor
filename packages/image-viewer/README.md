[![npm version](https://img.shields.io/npm/v/images-viewer-vue3.svg)](https://npmjs.org/package/images-viewer-vue3)
[![NPM Download](https://img.shields.io/npm/dm/images-viewer-vue3.svg)](https://www.npmjs.com/package/images-viewer-vue3)
[![npm type definitions](https://img.shields.io/npm/types/images-viewer-vue3)](https://npmjs.org/package/images-viewer-vue3)

# images-viewer-vue3
A lightweight image viewer for Vue3, it is based on `flip animation` technology, Support PC and h5 mobile web page preview photos, if it is a product developed by vue3.

[images-viewer-vue3 demo](https://github.com/qiunanya/vue3-major-editor/tree/main/packages/image-viewer)(https://github.com/qiunanya/vue3-major-editor/tree/main/packages/image-viewer)

# Features
* Component preview image
* Command preview image
* API preview image

# Function
* Rotate image
* Zoom image
* Flip image
* Drag image
* Download image

# Install 

```js
npm install images-viewer-vue3
--or
pnpm install images-viewer-vue3
--or
yarn add images-viewer-vue3
```

# Usage

## Component preview image
The component wraps the image element, click directly to preview.
```js
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import ImagesViewerVue3 from 'images-viewer-vue3';

const app = createApp(App)
// Image preview directive will be automatically injected here
app.use(ImagesViewerVue3, {
    zIndex: 999, // Default 999
    language: 'zh', // Default language 'zh'
    scaleRatio: 1, // Default 1
    rotateRatio: 90, // Default 90 degrees
    isEnableDrag: true, // Enabled by default
    isEnableWheel: true, // Enabled by default
})
app.mount("#app")

// demo.vue
<ImagesViewerVue3>
    <img src="https://picsum.photos/id/6/5000/3333"/>
    <img src="https://picsum.photos/id/10/2500/1667"/>
    <img src="https://picsum.photos/id/11/2500/1667"/>
</ImagesViewerVue3>
```
## Options
Initialize the configuration in `app.use(ImagesViewerVue3,options)` of the `main.ts` file.

| Option | Allowed Value | Default  | Description |
| ------------- |-------------| -----| -------- |
| scaleRatio | number in percentage | 1 | It defines the initial zoom value of the image. |
| zIndex | number in percentage | 999 | Initial value of the previewer stacking order property. |
| rotateRatio | number in percentage | 90 | It defines the initial value of the image rotation angle. |
| isEnableDrag | boolean | true | Defines whether to enable the drag and drop function. |
| isEnableWheel | boolean | true | Defines whether to enable mouse scrolling to zoom the image. |
| language | 'zh' or 'en' | 'zh' | Define the prompt text display language.|

## Command preview image
Add v-image-viewer to the image tag that needs to be previewed. All imgs with added instructions will be automatically added to the preview list.
```js
<img v-image-viewer src="https://picsum.photos/id/19/2500/1667"/>
<img v-image-viewer src="https://picsum.photos/id/63/2500/1667"/>
```

## API preview image
```js
<img @click="previewImage" src="https://picsum.photos/id/19/2500/1667"/>

<script setup lang="ts">
import { imageViewerApi } from 'images-viewer-vue3'

const previewImage = (evt) => {
    if (!evt.target) return
    const iDom = evt.target as HTMLImageElement
    imageViewerApi({
        current: iDom.src,
        // Enable flip animation
        imageDom: iDom,
        // Preview more pictures
        // images: ['src', ...],
    })
}
</script>
```

# Keyboard-shortcuts-windows
The `images-viewer-vue3` has built-in commonly used shortcut keys.

| Shortcut Key | Function Description |
| ------------- |-------------|
| Right(→) | Next |
| Left(←) | Previous |
| Ctrl+Right(→) | Next Page |
| Ctrl+Left(←) | Previous page |
| Ctrl+I+Y | Flip Vertically |
| Ctrl+I+X | Flip Horizontal |
| Ctrl+C+R | Rotate 90 degrees clockwise |
| Ctrl+C+L | Rotate 90 degrees counterclockwise |
| Ctrl+Z | Restore initial value |
| Ctrl+'+' | Zoom |
| Ctrl+'-' | Zoom out |
| ESC | Close Preview |