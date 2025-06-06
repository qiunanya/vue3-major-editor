import { createApp } from "vue";
import App from "./App.vue";

import i18n from "./src/langs";

// 图片查看器
import ImageViewerVue3 from './src/index'
import './src/styles/index.scss'

const app = createApp(App)
document.title = "Vue3图片预览器组件"

app.use(ImageViewerVue3, {
    zIndex: 999, // Default 999
    language: 'zh-cn', // Default language 'zh'
    scaleRatio: 1, // Default 1
    rotateRatio: 90, // Default 90 degrees
    isEnableDrag: true, // Enabled by default
    isEnableWheel: true, // Enabled by default
    playSpeed: 2000, // Default 2000 ms
    isDownLoad: true, // Enabled by default
    isHiddenSiderNav: false, // Enabled by default
    isHiddenSearch: false, // Disable by default
})
app.use(i18n)
app.mount("#app")