import { createApp } from "vue";
import App from "./App.vue";
import ImagesViewerVue3 from 'images-viewer-vue3';
import router from "./router";

const app = createApp(App)

app.use(ImagesViewerVue3, {
    zIndex: 999, // Default 999
    language: 'zh', // Default language 'zh'
    scaleRatio: 1, // Default 1
    rotateRatio: 90, // Default 90 degrees
    isEnableDrag: true, // Enabled by default
    isEnableWheel: true, // Enabled by default
    playSpeed: 2000, // Default 2000 ms
})
app.use(router)

app.mount("#app")