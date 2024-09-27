import { createElementVNode, render, h, App } from 'vue'
import ImageViewer from './components/viewer.vue'
import ImageViewerUI from './components/index.vue'
import VImageViewer from './directive/v-image-viewer'
import { ImageViewerOptions, ImageViewerConfig } from './types/image-viewer'


// 默认配置
let defaultOptions:ImageViewerConfig = {};
let vnode;

/**
 * 通过use调用时挂载到vue实例
 * 
 * @param { Object | App } app
 * @param { ImageViewerConfig } config 
 */
export default function install(app:App, config:ImageViewerConfig={}) {
    // 这里可以注册指令，因为App对象
    defaultOptions = config
    console.log(app, config, 'install');
    app.directive("image-viewer", VImageViewer)
    app.component('ImageViewerVue3', ImageViewer)
    app.config.globalProperties.$imageViewerApi = imageViewerApi
}


// 导出图片预览 API 
function imageViewerApi (opt:ImageViewerOptions) {
    var previewBox:HTMLElement | null = null;
    if (previewBox) {
        previewBox&&document.body.removeChild(previewBox);
    } else {
        vnode = h(ImageViewerUI, {
            visible: true,
            current: opt.current,
            list: opt.images,
            onClose: () => {
                previewBox&&document.body.removeChild(previewBox);
            }
        })
        previewBox = document.createElement('div')
        previewBox.classList.add('viewer-box');
        render(vnode, previewBox)
        document.body.appendChild(previewBox)
    }
}

const ImageViewerVue3 = ImageViewer

export {
    imageViewerApi,
    VImageViewer,
    ImageViewerVue3
}