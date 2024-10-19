import { createVNode, render, h, App } from 'vue'
import ImageViewer from './components/viewer.vue'
import ImageViewerUI from './components/index.vue'
import VImageViewer from './directive/v-image-viewer'
import { ImageViewerOptions, ImageViewerType, ImageViewerInstallConfig } from './types/image-viewer'
import ImageViewerCore from './components/core'
import pkg from '../package.json';


let vnode;
const viewerCore = ImageViewerCore.getInStance()

export default function install(app:App, config?:ImageViewerInstallConfig) {
    // 这里可以注册指令，因为App对象
    if (config) {
        viewerCore.setConfigOptions(config as ImageViewerType)
    }

    // console.log(app, config, 'install');
    console.log(`images-viewer-vue3_v${pkg.version}`)
    app.directive("image-viewer", VImageViewer)
    app.component('ImagesViewerVue3', ImageViewer)
    app.config.globalProperties.$imageViewerApi = imageViewerApi
}


// 导出图片预览 API 
function imageViewerApi (opt:ImageViewerOptions) {
    const config = viewerCore.getConfigOptions()
    // console.log(config, 6666)
    var previewBox:HTMLElement | null = null;
    if (previewBox) {
        previewBox&&document.body.removeChild(previewBox);
    } else {
        vnode = createVNode(ImageViewerUI, {
            visible: true,
            current: opt.current,
            images: opt.images || [],
            zIndex: config.zIndex,
            image: opt.imageDom,
            from: opt.from || 'api',
            language: config.language || 'zh',
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