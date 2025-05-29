import { ImageViewerCore, downloadExe } from '@/utils';
import { ref, nextTick } from 'vue';
import { useFullscreen } from '@vueuse/core'

export const useToolbar = (images: string[], cb:Function) => {
    // const bodyRect = document.body.getBoundingClientRect()
    const imageVieverWidgetRef = ref<HTMLElement | null>(null)
    const imageRef = ref<HTMLImageElement|null>(null)
    const loadImageErrorText = ref('')
    const loading = ref(true)
    const imageCore = ImageViewerCore.getInStance()
    const currentIndex = ref(-1)
    const activeIndex = ref(-1)
    const updateImageSrc = ref('')
    const imageInfo = ref({
        naturalRatio:'',
        renderRatio: '',
        size: '',
        fixedAspectRatio:''
    })
    // 开启左侧导航栏,多图片生效
    const isMultipleImage = ref(images.length > 0 ? true:false)

    function inevrtY(evt?:Event) {
        // evt.preventDefault();
        // evt.stopPropagation();
        imageCore.horizontalInvert()
    }
    function inevrtX(evt?:Event) {
        // evt.preventDefault();
        // evt.stopPropagation();
        imageCore.verticalInvert()
    }
    
    function zoomIn(evt?:Event) {
        // evt.preventDefault();
        // evt.stopPropagation();

        imageCore.zoomIn()
    }
    function zoomOut(evt?:Event) {
        // evt.preventDefault();
        // evt.stopPropagation();
        imageCore.zoomOut()
    }
    function clockwise (evt?:Event) {
        // evt.preventDefault();
        // evt.stopPropagation();
        imageCore.rotate('+')
    }
    function counterclockwise (evt?:Event) {
        // evt.preventDefault();
        // evt.stopPropagation();
        imageCore.rotate('-')
    }

    const onWheelListener = (evt:WheelEvent) => {
        imageCore.onWheel(evt)
    }

    const downloads = (evt:Event) => {
        const url = imageRef.value?.src as string;
        downloadExe (url)
    }

    const destroyedExe = () => {
        imageVieverWidgetRef.value = null
        imageRef.value = null
        loadImageErrorText.value = ''
        loading.value = true
        currentIndex.value = -1
        activeIndex.value = -1
        imageCore.destroyed()
    }

    const resetStyle = () => {
        imageCore.removeStyleProperty()
    }

    const loadImage = (evt:Event) => {
        imageCore.setImage(imageRef.value)
        const createImage = new Image()
        createImage.src = (imageRef.value&&imageRef.value.src) as string

        // 计算图片大小
        // 将像素大小转换为KB
        createImage.onload = () => {
            const { width, height, naturalWidth, naturalHeight } = createImage
            const fileSizeInKB = Number(naturalWidth * naturalHeight / 1024).toFixed(2)
            imageInfo.value = {
                naturalRatio: `${naturalWidth} x ${naturalHeight} px`,
                renderRatio: `${width} x ${height} px`,
                size: `${fileSizeInKB} KB`,
                fixedAspectRatio: `${naturalWidth}:${naturalHeight}`
            }
        }
        
        if (imageRef.value && imageVieverWidgetRef.value) {
            // 重置上一张图片样式，避免样式污染
            imageRef.value.style.transform = ''
            imageRef.value.style.removeProperty('position')
            // 设置图片最大宽高比，获取最好的预览效果
            imageRef.value.style.maxHeight = '100%'
            imageRef.value.style.maxWidth = '100%'
        }
        
        loadImageErrorText.value = ""
        loading.value = false
    }

    const errorImage = (evt:Event) => {
        loading.value = false
        loadImageErrorText.value = "加载图片失败，请仔细检测图片访问路径！"
        // console.log('图片加载错误：',evt)
    }

    // 切换到下一张图片
    const nextImage = () => {
        // 判断是否是最后一张图片
        if (currentIndex.value === images.length - 1) {
            // console.log("已经是最后一张图片了:", currentIndex.value);
            return;
        }
        currentIndex.value++;
        setUpdateImage()
    };

    // 切换到上一张图片
    const previousImage = () => {
        // 判断是否是第一张图片
        if (currentIndex.value === 0) {
            // console.log("已经是第一张图片了:", currentIndex.value);
            return;
        }
        currentIndex.value--;
        setUpdateImage()
    };

    const setUpdateImage = () => {
        // console.log(currentIndex.value, imageRef.value)
        if (!imageRef.value) return
        
        const activeImage =  images[currentIndex.value]
        
        if (activeImage) {
            updateImageSrc.value = imageRef.value.src = activeImage
            cb({image:imageRef.value.src, index: currentIndex.value })
        }
    }

    const fullScreen = () => {
        const imageViewerVue3Root = document.querySelector('.image-viewer-vue3__root') as HTMLElement;
        const { enter, exit, toggle } = useFullscreen(imageViewerVue3Root)
        toggle()
    }

    return {
        updateImageSrc,
        isMultipleImage,
        onWheelListener,
        imageInfo,
        nextImage,
        previousImage,
        destroyedExe,
        resetStyle,
        downloads,
        loadImageErrorText,
        loading,
        errorImage,
        loadImage,
        imageRef,
        imageVieverWidgetRef,
        inevrtY,
        inevrtX,
        zoomIn,
        zoomOut,
        clockwise,
        counterclockwise,
        currentIndex,
        fullScreen
    }
}