import ImageViewerCore from '../utils/ViewerCore';
import { downloadExe } from '../utils/index';
import { ref, nextTick, reactive, toRefs } from 'vue';

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
    const imageInfo = reactive({
        width: 0,
        height: 0
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
        const img = new Image()
        img.src = (imageRef.value&&imageRef.value.src) as string

        const { width, height } = toRefs(imageInfo)
        width.value = img.width
        height.value = img.height

        // console.log('图片信息：', img.width, img.height)
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
        // console.log('图片加载成功：',evt)
        // console.log('图片信息：', im.height, im.width)
    }

    const errorImage = (evt:Event) => {
        loading.value = false
        loadImageErrorText.value = "加载图片失败，请仔细检测图片访问路径！"
        // console.log('图片加载错误：',evt)
    }

    // onLoad
    const onLoad = () => {
        
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


    nextTick(() => {
        onLoad()
    })

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
        currentIndex
    }
}