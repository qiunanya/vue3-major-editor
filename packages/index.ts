import type { App } from "vue"
import Vue3MajorEditor from "./index.vue";

// 使用install方法，在app.use挂载
Vue3MajorEditor.install = (app:App) => {
    app.component('Vue3MajorEditor', Vue3MajorEditor)
    return app;
}

export { Vue3MajorEditor }

export default Vue3MajorEditor;