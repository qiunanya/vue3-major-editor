import ImageViewerCore from './ImageViewerCore';
import { ref, onMounted } from 'vue';

export const useAction = () => {
    // const bodyRect = document.body.getBoundingClientRect()
    const imageVieverWidgetRef = ref<HTMLElement | null>(null)
    const imageRef = ref<HTMLImageElement|null>(null)
    const imageCore = ImageViewerCore.getInStance()

    function inevrtY(evt:Event) {
        evt.preventDefault();
        evt.stopPropagation();
        imageCore.horizontalInvert()
    }
    function inevrtX(evt:Event) {
        evt.preventDefault();
        evt.stopPropagation();
        imageCore.verticalInvert()
    }
    
    function zoomIn(evt:Event) {
        evt.preventDefault();
        evt.stopPropagation();

        imageCore.zoomIn()
    }
    function zoomOut(evt:Event) {
        evt.preventDefault();
        evt.stopPropagation();
        imageCore.zoomOut()
    }
    function clockwise (evt:Event) {
        evt.preventDefault();
        evt.stopPropagation();
        imageCore.rotate('+')
    }
    function counterclockwise (evt:Event) {
        evt.preventDefault();
        evt.stopPropagation();
        imageCore.rotate('-')
    }

    const closeViewer = () => {
        imageCore.destroyed()
    }

    const loadImage = (evt:Event) => {
        imageCore.setImage(imageRef.value)

        const im = new Image()
        im.src = (imageRef.value&&imageRef.value.src) as string

        if (imageRef.value && imageVieverWidgetRef.value) {
            const Rect = imageVieverWidgetRef.value.getBoundingClientRect()
            // 设置图片真实大小，根据可视区域动态设置，图片过大，需要完整显示
            if (im.width<Rect.width&&im.height<Rect.height) {
                imageRef.value.style.width = im.width + 'px'
                imageRef.value.style.height = im.height + 'px'
            } else {
                // 避免图片宽度被拉变形，所以大图片宽度 除以 2
                imageRef.value.style.width = Rect.width / 1.3 + 'px'
                imageRef.value.style.height = Rect.height / 1.3 + 'px'
            }
        }
        
        // console.log('图片加载成功：',evt)
        // console.log('图片信息：', im.height, im.width)
    }

    const errorImage = (evt:Event) => {
        console.log('图片加载错误：',evt)
    }

    onMounted(() => {
        // imageCore.setImage(imageRef.value)
    })

    return {
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
        closeViewer
    }
}