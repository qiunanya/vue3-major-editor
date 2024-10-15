import ImageViewerCore from './core';
import { downloadExe } from '../utils/index';
import { ref, onMounted } from 'vue';

export const useAction = (images: string[]) => {
    // const bodyRect = document.body.getBoundingClientRect()
    const imageVieverWidgetRef = ref<HTMLElement | null>(null)
    const imageRef = ref<HTMLImageElement|null>(null)
    const loadImageErrorText = ref('')
    const loading = ref(true)
    const imageCore = ImageViewerCore.getInStance()
    const currentPage = ref(1)
    const pageSize = ref(10)
    const totalPage = ref(0)
    const pageData = ref<string[]>([])

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
        if (imageRef.value) {

        }
    }

    const download = (name?: string) => {
        const url = imageRef.value?.src as string;
        downloadExe (url)
    }

    const resetStyle = () => {
        imageCore.removeStyleProperty()
    }

    const loadImage = (evt:Event) => {
        imageCore.setImage(imageRef.value)

        const im = new Image()
        im.src = (imageRef.value&&imageRef.value.src) as string

        if (imageRef.value && imageVieverWidgetRef.value) {
            // imageRef.value.style.transform = 'none'
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
        loadImageErrorText.value = ""
        loading.value=false
        // console.log('图片加载成功：',evt)
        // console.log('图片信息：', im.height, im.width)
    }

    const errorImage = (evt:Event) => {
        loading.value = false
        loadImageErrorText.value = "加载图片失败，请仔细检测图片地址！"
        // console.log('图片加载错误：',evt)
    }

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
            pagination(currentPage.value, pageSize.value);
        }
    }

    const nextPage = () => {
        if (currentPage.value < totalPage.value) {
            currentPage.value++;
            pagination(currentPage.value, pageSize.value);
        }
    }

    const initPage = (current:number, size:number) => {
        currentPage.value = current
        pageSize.value = size
        pagination(current, size)
    }

    const pagination = (currentPage:number, pageSize:number) => {
        var num = images.length
        totalPage.value = Math.ceil(num / pageSize)
        var startIndex = pageSize * (currentPage - 1)
        var endIndex = startIndex + pageSize
        pageData.value = images.slice(startIndex, endIndex)
    }

    pagination(1, 10)

    onMounted(() => {
        // imageCore.setImage(imageRef.value)
    })

    return {
        resetStyle,
        download,
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
        closeViewer,
        pageData,
        prevPage,
        nextPage,
        initPage,
        currentPage,
        totalPage
    }
}