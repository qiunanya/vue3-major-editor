import { withInstall } from './tools/install';
import EditorTiptapVue3 from "./editor.vue";
import { App } from 'vue';

// export const EditorTiptapVue3 = withInstall(editor)
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
    // app.config.globalProperties.$imageViewerApi = imageViewerApi
}

export { 
    EditorTiptapVue3
}

