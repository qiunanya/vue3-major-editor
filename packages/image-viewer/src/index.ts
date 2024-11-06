import { createVNode, render, h, App } from 'vue'
import ImageViewer from './components/viewer.vue'
import ImageViewerUI from './components/index.vue'
import VImageViewer from './directive/v-image-viewer'
import LazyLoadDirective from './directive/v-lazy-image'
import { ImageViewerOptions, ImageViewerType, ImageViewerInstallConfig, ImageObjectTypes } from './types/image-viewer'
import ImageViewerCore from './utils/ViewerCore'
import { versions, asyncVerifyIllegalImage } from './utils/index'
// 这样导入package.json文件并使用内容，会导致vite-plugin-dts打包生成的声明文件错乱
// import pkg from '../package.json';


let vnode;
const viewerCore = ImageViewerCore.getInStance()
var callBack:Function = (image:string, index: number) => {}

export default function install(app:App, config?:ImageViewerInstallConfig) {
    // 这里可以注册指令，因为App对象
    if (config) {
        viewerCore.setConfigOptions(config as ImageViewerType)
    }

    // console.log(app, config, 'install');
    console.log(`%cimages-viewer-vue3_V${versions}`, "color: #eee;background:#646cff;padding:2px 5px;border-radius:4px;")
    app.directive("image-viewer", VImageViewer)
    app.directive("lazy-image", LazyLoadDirective)
    app.component('ImagesViewerVue3', ImageViewer)
    app.config.globalProperties.$imageViewerApi = imageViewerApi
}


// 导出图片预览 API 
async function imageViewerApi (opt:ImageViewerOptions) {
    var imageItems:string[]=[];

    await asyncVerifyIllegalImage(opt.images || []).then(res => {
        imageItems = res.data
        // console.log(res.data, 5555)
    }).catch(err => {
        console.error('images-viewer-vue3:', JSON.stringify(err))
    })

    const config = viewerCore.getConfigOptions()
    // console.log(config, 6666)
    var previewBox:HTMLElement | null = null;
    if (previewBox) {
        previewBox&&document.body.removeChild(previewBox);
    } else {
        vnode = createVNode(ImageViewerUI, {
            visible: true,
            current: opt.current,
            images: imageItems,
            zIndex: config.zIndex,
            image: opt.imageDom,
            from: opt.from || 'api',
            language: config.language || 'zh',
            playSpeed: config.playSpeed,
            handleChange: ({ image, index }: { image:string, index: number}) => {
                callBack&&callBack(image, index)
            },
            handleClose: () => {
                onClose()
            }
        })

        previewBox = document.createElement('div')
        previewBox.style.zIndex = config.zIndex+'';
        previewBox.classList.add('image-viewer-vue3__root');
        render(vnode, previewBox)
        document.body.style.overflow = 'hidden'
        document.body.style.margin = '0px'
        document.body.style.padding = '0px'
        document.body.appendChild(previewBox)
    }
}

// 手动关闭
function onClose () {
    const imageViewerDom = document.querySelector('.image-viewer-vue3__root')
    if (imageViewerDom) {
        document.body.style.removeProperty('overflow')
        document.body.style.removeProperty('margin')
        document.body.style.removeProperty('padding')
        document.body.removeChild(imageViewerDom);
    }
    viewerCore.destroyed()
}

function onUpdate (fn?:Function) {
    fn&&(callBack=fn)
}

const ImageViewerVue3 = ImageViewer

export {
    imageViewerApi,
    VImageViewer,
    ImageViewerVue3,
    onClose,
    onUpdate
}