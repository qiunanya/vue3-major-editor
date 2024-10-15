import { createApp } from "vue";
import App from "./App.vue";
import ImagesViewerVue3 from 'images-viewer-vue3';

const app = createApp(App)
document.title = "Vue3MajorEditor"
app.use(ImagesViewerVue3)
app.mount("#app")