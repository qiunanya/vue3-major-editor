<template>
<!-- 当前图片：{{  playIndex }} -->
<div ref="imgPreviewRef" class="mobile-vierwer__wrapper cus-img-preview">
    <ul class="viewer-image-list" :style="ulStyle">
        <template v-if="viewerImages&&viewerImages.length > 0">
            <li v-for="(item, index) in viewerImages" :key="index">
                <img class="viewer-image" v-lazy-image="item">
            </li>
        </template>
        <li v-else><img class="viewer-image" v-lazy-image="currentImage"></li>
    </ul>
</div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import vLazyImage from '../directive/v-lazy-image'

// type ImagesType = ImageObjectTypes[]

const { viewerImages, currentImage, activeImage } = defineProps({
    viewerImages: {
        type: Array as PropType<string[]>,
        required: true    
    },
    currentImage: {
        type: String,
        default: () => {
            return ''
        }
    },
    activeImage: {
        type: HTMLImageElement,
        required: false
    },
})

const emit = defineEmits(['on-cb'])


const ulStyleProperties = ref<CSSProperties>({
    transform: "none",
    transition: 'none',
})

const ulStyle = computed(() => {
    const { transform, transition } = ulStyleProperties.value
    const style:CSSProperties = {
        transform,
        transition
    }

    return style
})

const setUlStyle = (opt:CSSProperties = {
    transform: '',
    transition: ''
}) => {
    ulStyleProperties.value = Object.assign(ulStyleProperties.value, {...opt})
}

const imgPreviewRef = ref<HTMLElement | null>(null)
// 用来记录图片索引
const playIndex = ref(0);   

// const imageList = ref([
//     'https://picsum.photos/id/28/367/267',
//     'https://picsum.photos/id/29/367/267',
//     'https://picsum.photos/id/30/367/267',
//     'https://picsum.photos/id/31/367/267',
//     'https://picsum.photos/id/32/367/267',
// ])

// 初始化当前激活图片
const setActiveItem = (w:number, i:number) => {
    const findIndex = viewerImages.findIndex(el => el === currentImage)
    if (findIndex !== -1) {
        playIndex.value = findIndex
        var translatex = -playIndex.value * w;
        setUlStyle({
            transition: 'none',
            transform: `translateX(${translatex}px)`
        })
    }
}

nextTick().then(res => {
    // const screenWidth = window.screen.width * window.devicePixelRatio;
    const screenWidth = window.screen.width;
    // const screenHeight = window.screen.height;
    const UL = imgPreviewRef.value?.firstChild as HTMLElement
    // console.log('设备宽度：',screenWidth)
    // 精确设置li的宽度
    Array.from(UL.children).forEach((el, indx) => {
        const item = el as HTMLElement
        item.style.width = `${screenWidth}px`
        item.style.flex = `0 0 ${screenWidth}px`
    })
    
    // 获取focus的宽度
    var w = imgPreviewRef.value?.offsetWidth || 0;
    
    // 初始位置
    var startX = 0;
    // 移动的距离    
    var moveX = 0;   
    // 是否在图上移动了手指  
    var flag = false;

    setActiveItem(w, 0)

    // 给容器绑定手指触摸事件
    UL?.addEventListener('touchstart', function(evt:TouchEvent) {
        // 手指的初始触摸位置（左右轮播，只记录x就可以了）
        startX = evt.targetTouches[0].pageX;
        
    } as EventListener)
    // 给ul绑定手指移动事件
    UL?.addEventListener('touchmove', function(evt:TouchEvent) {
        // 手指移动的距离
        moveX = evt.targetTouches[0].pageX - startX;  
        var translatex = -playIndex.value * w + moveX;
        setUlStyle({
            transition: 'none',
            transform: `translateX(${translatex}px)`
        })
        
        // 手指移动了，将flag改为true
        flag = true;    
        // 阻止屏幕滚动的默认行为
        evt.preventDefault();   
    } as EventListener)

    UL?.addEventListener('touchend', function(evt:TouchEvent) {
        if(flag) {
            // 移动距离大于50时 滑向上一张或下一张（moveX可能为正也可能为负，Math.abs()取绝对值）
            if(Math.abs(moveX) > 50) {
                // 大于0右滑 图片索引减一
                if(moveX > 0) {  
                    playIndex.value--;
                } else {
                    // 小于0左滑 图片索引加一   
                    playIndex.value++;
                }
                var translatex = -playIndex.value * w;
                setUlStyle({
                    transition: 'transform .3s ease',
                    transform: `translateX(${translatex}px)`
                })
            } else {    
                // 小于50px就回弹
                var translatex = -playIndex.value * w;
                setUlStyle({
                    transition: 'transform .1s ease',
                    transform: `translateX(${translatex}px)`
                })
            }
        }

        // 结束后 把flag重新改为false，并开启定时器让图片开始轮播
        flag = false;
    })
    UL?.addEventListener('transitionend', function() {
        // 索引 >=5 说明已经轮播到最后一张了
        if (playIndex.value >= viewerImages?.length) {
            playIndex.value = 0;
            // 去掉过渡效果 快速回到第一张
            var translatex = -playIndex.value * w;
            setUlStyle({
                transition: '',
                transform: `translateX(${translatex}px)`
            })
        } else if(playIndex.value < 0) {
            // 索引 < 0说明用户一开始是往前滑的    
            playIndex.value = 0;
            var translatex = -playIndex.value * w;
            setUlStyle({
                transition: '',
                transform: `translateX(${translatex}px)`
            })
        }

        // 更新外部索引
        emit('on-cb', { index: playIndex.value, url: viewerImages[playIndex.value]})
    })
})
</script>

<style lang="scss" scoped>
.mobile-vierwer__wrapper {
    margin: auto 0;
    &.cus-img-preview {
        width: 100%;
        position: relative;
        overflow: hidden;
        ul {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
        }
        ul li .viewer-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>