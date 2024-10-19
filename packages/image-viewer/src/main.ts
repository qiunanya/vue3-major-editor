import { createApp } from "vue";
import App from "./App.vue";

// 图片查看器
import ImageViewerVue3 from './index'
import './styles/index.scss'

const app = createApp(App)
document.title = "Vue3图片预览器组件"

app.use(ImageViewerVue3, {
    language: 'zh'
})
app.mount("#app")