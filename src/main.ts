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
import Vue3MajorEditor from '../lib';
import '../lib/style.css';


const app = createApp(App)

const naive = create({
    components: [NButton]
})
app.use(Vue3MajorEditor as any)
app.use(naive)
app.mount('#app')
