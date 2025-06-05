import { createVNode, render, App } from 'vue'
import PreviewImageWrapper from './components/PreviewImageWrapper.vue'
import PreviewImageModal from './components/PreviewImageModal.vue'
import VImageViewer from './directive/v-image-viewer'
import LazyLoadDirective from './directive/v-lazy-image'
import { ImageViewerOptions, ImageViewerType, ImageViewerInstallConfig } from './types/image-viewer'
import { 
    ImageViewerCore, 
    versions, 
    asyncVerifyIllegalImage, 
    PREVIEW_WRAPPER_ROOT_CLASS, 
    createElementNode, 
    setBodyStyle 
} from '@/utils'
import i18n from '@/langs'
// 这样导入package.json文件并使用内容，会导致vite-plugin-dts打包生成的声明文件错乱
// import pkg from '../package.json';


let vnode;
const viewerCore = ImageViewerCore.getInStance()
var callBack:Function = (image:string, index: number) => {}
export default function install(app:App, config?:ImageViewerInstallConfig) {
    // 这里可以注册指令，因为App对象
    if (config) {
        viewerCore.setConfigOptions(config as ImageViewerType)
        i18n.global.locale.value = config.language||'zh-cn'
    }

    // console.log(app, config, 'install');
    console.log(`%cimages-viewer-vue3_V${versions}`, "color: #eee;background:#646cff;padding:2px 5px;border-radius:4px;")
    app.directive("image-viewer", VImageViewer)
    app.directive("lazy-image", LazyLoadDirective)
    app.component('ImagesViewerVue3', PreviewImageWrapper)
    app.config.globalProperties.$imageViewerApi = imageViewerApi
}


// 导出图片预览 API 
async function imageViewerApi (opt:ImageViewerOptions) {
    var imageItems:string[]=[];

    await asyncVerifyIllegalImage(opt.images || []).then(res => {
        imageItems = res.data
    }).catch(err => {
        console.error('images-viewer-vue3:', JSON.stringify(err))
    })

    const config = viewerCore.getConfigOptions()
    var previewBox:HTMLElement | null = null;
    
    if (previewBox) {
        previewBox&&document.body.removeChild(previewBox);
    } else {
        const props = {
            visible: true,
            specifyIndex: opt.specifyIndex,
            current: opt.current,
            images: imageItems,
            zIndex: config.zIndex,
            image: opt.imageDom,
            from: opt.from || 'api',
            language: config.language || 'zh-cn',
            playSpeed: config.playSpeed,
            isDownLoad: config.isDownLoad,
            isHiddenSiderNav: config.isHiddenSiderNav,
            isHiddenSearch: config.isHiddenSearch,
            i18n: i18n.global,
            handleChange: ({ image, index }: { image:string, index: number}) => {
                callBack&&callBack(image, index)
            },
            handleClose: () => {
                onClose()
            }
        }

        vnode = createVNode(PreviewImageModal, props)

        previewBox = createElementNode()
        previewBox.style.zIndex = config.zIndex+'';
        render(vnode, previewBox)
        setBodyStyle(previewBox)

        // 更新外部组件，图片已加载
        callBack&&callBack(opt.current, opt.imageDom&&opt.imageDom.getAttribute('data-index'))
    }
}

// 手动关闭
function onClose () {
    const imageViewerDom = document.querySelector(`.${PREVIEW_WRAPPER_ROOT_CLASS}`)
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

const ImageViewerVue3 = PreviewImageWrapper

export {
    imageViewerApi,
    VImageViewer,
    ImageViewerVue3,
    onClose,
    onUpdate
}