import { createApp } from "vue";
import App from "./App.vue";
import ImagesViewerVue3 from 'images-viewer-vue3';
import router from "./router";

const app = createApp(App)

app.use(ImagesViewerVue3)
app.use(router)

app.mount("#app")