import ImageViewerCore from './core';
import { downloadExe, getUserAgent } from '../utils/index';
import { ref, onMounted } from 'vue';
import { ImageObjectTypes, AsyncSetImageReturnType } from '../types/image-viewer';

export const useAction = (images: string[], currentUrl: string) => {
    // const bodyRect = document.body.getBoundingClientRect()
    const imageVieverWidgetRef = ref<HTMLElement | null>(null)
    const imageRef = ref<HTMLImageElement|null>(null)
    const loadImageErrorText = ref('')
    const loading = ref(true)
    const imageCore = ImageViewerCore.getInStance()
    const currentPage = ref(1)
    const currentIndex = ref(-1)
    const pageSize = ref(10)
    const totalPage = ref(0)
    const pageData = ref<ImageObjectTypes[]>([])
    const originImages = ref<ImageObjectTypes[]>([])

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

    const closeViewer = () => {
        imageCore.destroyed()
        if (imageRef.value) {

        }
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
        currentPage.value = 1
        currentIndex.value = -1
        pageSize.value = 10
        totalPage.value = 0
        pageData.value = []
        originImages.value = []
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
            if (getUserAgent()) {
                imageRef.value.style.width = Rect.width + 'px'
                imageRef.value.style.height = Rect.height / 2 + 'px'
            } else if (im.width<Rect.width&&im.height<Rect.height) {
                imageRef.value.style.width = im.width + 'px'
                imageRef.value.style.height = im.height + 'px'
            } else {
                // 避免图片宽度被拉变形，所以大图片宽度 除以 2
                imageRef.value.style.width = Rect.width / 1.3 + 'px'
                imageRef.value.style.height = Rect.height / 1.3 + 'px'
            }
        }
        
        loadImageErrorText.value = ""
        loading.value = false
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
        var num = originImages.value.length
        totalPage.value = Math.ceil(num / pageSize)
        var startIndex = pageSize * (currentPage - 1)
        var endIndex = startIndex + pageSize
        pageData.value = originImages.value.slice(startIndex, endIndex)

        // 激活当前图片索引 currentIndex
        currentIndex.value = pageData.value.findIndex(el => el.url === currentUrl)
    }

    const changePageSize = (evt:Event) => {
        const { value } = evt.target as HTMLSelectElement
        pagination(1, +value)
    }

    const asyncSetImage = (): AsyncSetImageReturnType => {
        return new Promise((resolve, reject) => {
            if (Array.isArray(images) && images.length > 0) {
                const filters = images.filter(el => el === null || el === undefined || el === '')
                const arr = images.filter(el => el).map((el, index) => {
                    return {
                        index,
                        url: el
                    }
                })
                if (filters.length) {
                    console.warn(`images-viewer-vue3:The image parameter 'images' contains illegal characters:[${JSON.stringify(filters)}]`)
                }
                resolve({ data: arr })
                
            } else resolve({ data: [] })
        })
    }

    const setImageData = async () => {
        await asyncSetImage().then(res => {
            originImages.value = res.data;
        }).catch(err => {
            console.log('images-viewer-vue3:', JSON.stringify(err))
        })
        
        initPage(1, 10)
    }

    setImageData()

    onMounted(() => {
        // imageCore.setImage(imageRef.value)
    })

    return {
        changePageSize,
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
        closeViewer,
        pageData,
        prevPage,
        nextPage,
        initPage,
        currentPage,
        totalPage,
        currentIndex
    }
}