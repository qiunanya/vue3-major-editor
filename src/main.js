import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import "@/assets/style/index.scss"

import {
    // create naive ui
    create,
    // component
    NButton
} from 'naive-ui'

// 测试组件
import Vue3MajorEditor from '../dist/vue3-major-editor.js';
import '../dist/style.css';

// 注入svgIcon组件
import SvgIcon from "@/components/svgIcon";

const app = createApp(App)

const naive = create({
    components: [NButton]
})
app.use(Vue3MajorEditor)
app.use(SvgIcon)
app.use(naive)
app.mount('#app')
