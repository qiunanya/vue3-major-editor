import ImageViewerCore from '../utils/ViewerCore';
import { downloadExe, getUserAgent } from '../utils/index';
import { ref, onMounted, nextTick, reactive, toRefs } from 'vue';
import { ImageObjectTypes, AsyncSetImageReturnType } from '../types/image-viewer';

const DEVICE_TYPE = getUserAgent()
var distance_value = 0

export const useToolbar = (images: string[], currentUrl: string) => {
    // const bodyRect = document.body.getBoundingClientRect()
    const imageVieverWidgetRef = ref<HTMLElement | null>(null)
    const imageRef = ref<HTMLImageElement|null>(null)
    const loadImageErrorText = ref('')
    const loading = ref(true)
    const imageCore = ImageViewerCore.getInStance()
    const currentIndex = ref(-1)
    const activeIndex = ref(-1)
    const alignment = ref('flex-start')
    const originImages = ref<ImageObjectTypes[]>([])
    const imageInfo = reactive({
        width: 0,
        height: 0
    })

    // 虚拟滚动列表
    const vnodeScrollRef = ref<HTMLElement | null>(null)
    const vnodeUlRef = ref<HTMLElement | null>(null)
    // +2 撑开listScroll容器使其具有滚动条[可视区域容纳最大item个数]
    const maxCount = ref(0)
    // item的宽度
    const itemWidth = 50
    // 开始位置索引
    const startIndex = ref(0)
    // 结束位置索引
    const endIndex = ref(0)
    // 记录到的位置索引
    const pointerIndex = ref(0)
    // 最终渲染数据
    const renderData = ref<ImageObjectTypes[]>([])    

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
        currentIndex.value = -1
        activeIndex.value = -1
        originImages.value = []
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
            // imageRef.value.style.transform = 'none'
            const Rect = imageVieverWidgetRef.value.getBoundingClientRect()
            // 设置图片真实大小，根据可视区域动态设置，图片过大，需要完整显示
            if (getUserAgent()) {
                imageRef.value.style.width = Rect.width + 'px'
                imageRef.value.style.height = Rect.height / 2 + 'px'
            } else if (img.width<Rect.width&&img.height<Rect.height) {
                imageRef.value.style.width = img.width + 'px'
                imageRef.value.style.height = img.height + 'px'
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

    // 渲染
    const setRender = () => {
        // 计算开始和结束位置
        const end = startIndex.value + maxCount.value
        endIndex.value = originImages.value[end] !== void 0 ? end : originImages.value.length

        // 获取数据
        renderData.value = originImages.value.slice(startIndex.value, endIndex.value)
    }
    
    const onRectScroll = (evt:Event) => {
        if (!vnodeScrollRef.value || !vnodeUlRef.value) return
        startIndex.value = Math.floor(vnodeScrollRef.value.scrollTop / (itemWidth))
        if (pointerIndex.value === startIndex.value) return

        pointerIndex.value = startIndex.value

        setRender()

       
        if (originImages.value.length - startIndex.value >= maxCount.value) {
            distance_value = startIndex.value * itemWidth;
            vnodeUlRef.value.style.transform = `translateY(${distance_value}px)`
        } else {
            // console.log('设备类型：', DEVICE_TYPE)
            // 兼容小屏幕，避免最后一个元素被遮挡
            // vnodeUlRef.value.style.transform = `translateY(${distance_value-50}px)`
            // 滑动到底部，可以加载更多数据
            return
        }
    }

    const initScroll = async (rect:DOMRect) => {
        await asyncSetImage().then(res => {
            originImages.value = res.data
            currentIndex.value = originImages.value.findIndex(el => el.url === currentUrl)
            // for (let i = 0; i < 100; i++) {
            //     originImages.value.push({ index:i, url: `index_${i}`})
            // }
            console.log(originImages.value.length)
        }).catch(err => {
            console.log('images-viewer-vue3:', JSON.stringify(err))
        })
        maxCount.value = Math.floor(rect.height/itemWidth) + 4

        // 配置导航图片对齐方式
        if (originImages.value.length <= maxCount.value) {
            alignment.value = 'center'
        } else alignment.value = 'flex-start'
        // console.log(maxCount.value, 'maxCount')
        // console.log(maxCount.value*itemWidth, rect.width)
        setRender()
    }

   // 切换图片的方法
    const switchToImage = (targetIndex:number) => {
        if (!vnodeScrollRef.value) return
        // 假设图片宽度 + 间距
        const imageWidth = itemWidth + 2; 
        // 视口内可显示的图片数
        const visibleCount = Math.floor(vnodeScrollRef.value.clientHeight / imageWidth); 

        // 计算目标图片的起始与结束位置
        const start = targetIndex * imageWidth;
        const end = start + imageWidth;

        // 如果目标图片不在当前视口范围，则调整 scrollTop
        if (start < vnodeScrollRef.value.scrollTop || end > vnodeScrollRef.value.scrollTop + vnodeScrollRef.value.clientHeight) {
            vnodeScrollRef.value.scrollTop = targetIndex * imageWidth;
        }

        // 设置当前索引并渲染
        // startIndex.value = Math.max(0, targetIndex - Math.floor(visibleCount / 2));
        startIndex.value = Math.max(0, targetIndex - Math.floor(visibleCount));
        setRender();
    };

    // 切换到下一张图片
    const nextImage = () => {
        const targetIndex = Math.min(currentIndex.value + 1, originImages.value.length - 1);
        currentIndex.value = targetIndex;
        switchToImage(targetIndex);
    };

    // 切换到上一张图片
    const previousImage = () => {
        const targetIndex = Math.max(currentIndex.value - 1, 0);
        currentIndex.value = targetIndex;
        switchToImage(targetIndex);
    };


    nextTick(() => {
        if (vnodeScrollRef.value) {
            const rect = vnodeScrollRef.value?.getBoundingClientRect()
            initScroll(rect)
        }
    })

    return {
        alignment,
        imageInfo,
        originImages,
        nextImage,
        previousImage,
        onRectScroll,
        renderData,
        vnodeUlRef,
        vnodeScrollRef,
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
        currentIndex,
        activeIndex
    }
}