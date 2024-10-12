import { createApp } from "vue";
import App from "./App.vue";
import ImageViewerVue3 from 'image-viewer-vue3';
import "image-viewer-vue3/dist/es/style.css";

const app = createApp(App)
document.title = "Vue3MajorEditor"
app.use(ImageViewerVue3)
app.mount("#app")