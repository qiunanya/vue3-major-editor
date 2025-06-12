import { createApp } from "vue";
import { createPinia } from 'pinia';

import App from "./App.vue";
// 引入组件
import EditorTiptapVue3 from "./src/index";
import "./src/style/index.css";

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(EditorTiptapVue3)
document.title = "Vue3图片预览器组件"
app.mount("#app")