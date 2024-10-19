import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./langs";

// 图片查看器
import ImageViewerVue3 from './index'
import './styles/index.scss'

const app = createApp(App)
document.title = "Vue3图片预览器组件"

app.use(i18n)
app.use(ImageViewerVue3)
app.mount("#app")