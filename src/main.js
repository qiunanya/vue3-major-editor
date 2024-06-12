import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 测试组件
import Vue3MajorEditor from '../dist/vue3-major-editor.js';
import '../dist/style.css';

const app = createApp(App)

app.use(Vue3MajorEditor)
app.mount('#app')
