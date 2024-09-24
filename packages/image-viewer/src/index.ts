import { createElementVNode, render, h, App } from 'vue'
import ImageViewer from './components/viewer.vue'
import ImageViewerUI from './components/index.vue'
import VImageViewer from './directive/v-image-viewer'


// 默认配置
let defaultOptions = {} 
let vnode;

/**
 * 通过use调用时挂载到vue实例
 * 
 * @param {Object || App } app
 * @param {Object} options 
 */
export default function install(app:App, options = {}) {
    // 这里可以注册指令，因为App对象
    defaultOptions = options
    console.log(app, options, 'install');
    app.directive("image-viewer", VImageViewer)
    app.component('ImageViewerVue3', ImageViewer)
    app.config.globalProperties.$imageViewerApi = imageViewerApi
}


// 导出图片预览 API 
function imageViewerApi (current="", list = []) {
    var previewBox:HTMLElement | null = null;
    if (previewBox) {
        previewBox&&document.body.removeChild(previewBox);
    } else {
        vnode = h(ImageViewerUI, {
            visible: true,
            current,
            list,
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