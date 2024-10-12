import { createElementVNode, render, h, App } from 'vue'
import ImageViewer from './components/viewer.vue'
import ImageViewerUI from './components/index.vue'
import VImageViewer from './directive/v-image-viewer'
import { ImageViewerOptions, ImageViewerConfig, ImageViewerInstallConfig } from './types/image-viewer'
import ImageViewerCore from './components/core'

let vnode;
const viewerCore = ImageViewerCore.getInStance()

export default function install(app:App, config?:ImageViewerInstallConfig) {
    // 这里可以注册指令，因为App对象
    if (config) {
        viewerCore.setConfigOptions(config as ImageViewerConfig)
    }

    // console.log(app, config, 'install');
    console.log('image-viewer-vue3 success!')
    app.directive("image-viewer", VImageViewer)
    app.component('ImageViewerVue3', ImageViewer)
    app.config.globalProperties.$imageViewerApi = imageViewerApi
}


// 导出图片预览 API 
function imageViewerApi (opt:ImageViewerOptions) {
    const config = viewerCore.getConfigOptions()
    var previewBox:HTMLElement | null = null;
    if (previewBox) {
        previewBox&&document.body.removeChild(previewBox);
    } else {
        vnode = h(ImageViewerUI, {
            visible: true,
            current: opt.current,
            images: opt.images,
            zIndex: config.zIndex,
            onClose: () => {
                previewBox&&document.body.removeChild(previewBox);
            }
        })
        previewBox = document.createElement('div')
        previewBox.style.zIndex = config.zIndex+'';
        previewBox.classList.add('image-viewer-vue3__root');
        render(vnode, previewBox)
        document.body.appendChild(previewBox)
    }
}

// 手动关闭
function onClose () {
    const imageViewerDom = document.querySelector('.image-viewer-vue3__root')
    if (imageViewerDom) {
        document.body.removeChild(imageViewerDom);
    }
    viewerCore.destroyed()
}

const ImageViewerVue3 = ImageViewer

export {
    imageViewerApi,
    VImageViewer,
    ImageViewerVue3,
    onClose
}