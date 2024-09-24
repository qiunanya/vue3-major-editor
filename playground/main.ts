import { createApp } from "vue";
import App from "./App.vue";
import ImageViewerVue3 from 'image-viewer-vue3';

const app = createApp(App)
document.title = "Vue3MajorEditor"
app.use(ImageViewerVue3, {
    zoom: 1.3,
    roate: 90
})
app.mount("#app")