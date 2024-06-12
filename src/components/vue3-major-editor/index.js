import Vue3MajorEditor from "./index.vue";

// 使用install方法，在app.use挂载
Vue3MajorEditor.install = app => {
    app.component('Vue3MajorEditor', Vue3MajorEditor)
}

export { Vue3MajorEditor }

export default Vue3MajorEditor;