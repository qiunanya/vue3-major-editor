import EditorTiptapVue3 from "./editor.vue";
import { App } from 'vue';
import { Editor, JSONContent } from "@tiptap/vue-3";
import { HTMLVue3TiptapEditorElement } from './typings'
import Icons from './icons'

export default function install(app:App) {
    // 这里可以注册指令，因为App对象
    // if (config) {
    //     viewerCore.setConfigOptions(config as ImageViewerType)
    // }

    // // console.log(app, config, 'install');
    // console.log(`%cimages-viewer-vue3_V${versions}`, "color: #eee;background:#646cff;padding:2px 5px;border-radius:4px;")
    // app.directive("image-viewer", VImageViewer)
    // app.directive("lazy-image", LazyLoadDirective)
    app.component('EditorTiptapVue3', EditorTiptapVue3)
    Icons(app)
    // app.config.globalProperties.$imageViewerApi = imageViewerApi
}

export { 
    EditorTiptapVue3,
    Editor,
}
export type {
    HTMLVue3TiptapEditorElement,
    JSONContent
}
