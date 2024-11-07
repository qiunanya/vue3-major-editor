<template>
<div 
    ref="imageVieverWidgetRef" 
    :class="[
        'images-viewer-vue3__wrapper', 
        {'is-active':visible}, 
        {'nav-scroll-style__wrap':!getUserAgent()}]">
    <!-- 移动端 -->
    <div v-if="getUserAgent()" class="images-viewer-vue3__mobile">
        <div v-if="isMultipleImage" class="cus-head-info">
            <span>{{images.length}}&nbsp;&nbsp;/&nbsp;{{currentIndex+1}}</span>
        </div>
        <MobileViewer
            :current-image.camel="current" 
            :active-image.camel="image" 
            @on-cb="onCallBack">
        </MobileViewer>
    </div>
    <!-- pc端 -->
    <div v-else :class="['images-viewer-vue3__content', { 'active-grid': !isVisibleNav}, { 'close-grid': !isMultipleImage}]">
        <div :class="['content-nav__wrapper', { 'nav-active': isVisibleNav }, { 'is-hidden': getUserAgent() }]" v-if="isMultipleImage">
            <!-- 使用Vueuse的虚拟滚动useVirtualList hook -->
            <ScrollItemNav
                ref="scrollItemNavRef" 
                v-model="currentIndex"
                @on-click="clickImge">
            </ScrollItemNav>
        </div>
        <div class="content-viewer-image__wrapper" @wheel="onWheelListener">
            <svg v-show="isMultipleImage" @click.stop.prevent="setNavState" :class="['icon-is-hover cursor image-collapse-nav__btn svg-icon__action', {'rotate-right__btn': !isVisibleNav },{ 'is-hidden': getUserAgent() }]" viewBox="0 0 1024 1024">
                <path  d="M322.12 353.93L104.61 490.77c-18.45 11.61-18.44 38.51 0.02 50.1l217.51 136.64c19.71 12.38 45.33-1.78 45.33-25.06V378.98c0-23.29-25.64-37.45-45.35-25.05zM94.78 125.02h834.44c16.84 0 30.5-13.66 30.5-30.5s-13.66-30.5-30.5-30.5H94.78c-16.84 0-30.5 13.66-30.5 30.5s13.66 30.5 30.5 30.5zM929.22 342.34H444.11c-16.84 0-30.5 13.66-30.5 30.5s13.66 30.5 30.5 30.5h485.11c16.84 0 30.5-13.66 30.5-30.5s-13.66-30.5-30.5-30.5zM929.22 620.66H444.11c-16.84 0-30.5 13.66-30.5 30.5s13.66 30.5 30.5 30.5h485.11c16.84 0 30.5-13.66 30.5-30.5s-13.66-30.5-30.5-30.5zM929.22 898.98H94.78c-16.84 0-30.5 13.66-30.5 30.5s13.66 30.5 30.5 30.5h834.44c16.84 0 30.5-13.66 30.5-30.5s-13.66-30.5-30.5-30.5z"></path>
            </svg>
            <ul class="image-info">
                <li>{{imageInfo.width}}{{$t('image.px')}} X {{imageInfo.height}}{{$t('image.px')}}</li>
            </ul>
            <div v-if="loadImageErrorText" style="user-select: text;">
                <p style="color: orange;text-decoration: solid;">{{ $t('image.loadErrorText') }}</p>
                <p>{{ updateImageSrc }}</p>
            </div>
            <img 
                ref="imageRef" 
                :class="['image-viewer__inner cus-transition']" 
                @load="loadImage" 
                @error="errorImage" 
                alt="picture" 
                @mouseenter="onMouseEnterImage">
            <LoadingUI v-if="loading"></LoadingUI>

            <div :class="['image-viewer__controls']">
                <div class="control-info" v-show="isMultipleImage">
                    <span>{{$t('image.total')}}&nbsp;{{images.length}}&nbsp;{{$t('image.pictures')}}&nbsp;</span>
                    <span>/&nbsp;{{$t('image.the')}}&nbsp;{{currentIndex+1}}&nbsp;{{$t('image.img')}}&nbsp;</span>
                </div>
                <!-- 图片工具栏 -->
                <ToolsBar
                    :play-state.camel="playState"
                    @on-previous="setPrevious"
                    @on-next="setNext"
                    @on-resetStyle="resetStyle" 
                    @on-downloads="downloads"
                    @on-zoomIn="zoomIn"
                    @on-zoomOut="zoomOut" 
                    @on-inevrtY="inevrtY"
                    @on-inevrtX="inevrtX"
                    @on-clockwise="clockwise"
                    @on-counterclockwise="counterclockwise" 
                    @on-stopPlay="stopPlay"
                    @on-autoPlay="autoPlay">
                </ToolsBar>
            </div>
        </div>
    </div>
    <div class="images-viewer-vue3__close close-btn" @click="close">
        <svg class="close-icon icon-is-hover svg-icon__action" viewBox="0 0 1024 1024" width="15" height="15">
            <path d="M835.2 854.4c-12.8 0-22.4-3.2-32-12.8L211.2 256C192 240 192 211.2 208 195.2s44.8-16 60.8 0L864 780.8c16 16 16 44.8 0 60.8-6.4 9.6-16 12.8-28.8 12.8z"></path>
            <path d="M236.8 848c-12.8 0-22.4-3.2-32-12.8-16-16-16-44.8 0-60.8l604.8-576c16-16 44.8-16 60.8 0s16 44.8 0 60.8l-604.8 576c-9.6 9.6-19.2 12.8-28.8 12.8z"></path>
        </svg>
    </div>

    <HotKeys v-model:hotkey="hotkey" :is-active-key.camel="isActiveKey"></HotKeys>
    <Message :is-active="isMessage"></Message>
</div>

</template>
<script setup lang="ts">
import { watch, ref, nextTick, onBeforeUnmount, provide } from 'vue';
import type { PropType, Ref } from 'vue'
import { useToolbar } from '../hooks/toolbar';
import { debounce, getUserAgent } from '../utils';
import { FlipAnimate } from '../utils/flip-animate';
import HotKeys from './HotKeys.vue';
import Message from './Message.vue';
import MobileViewer from './MobileViewer.vue';
import LoadingUI from './Loading.vue';
import ScrollItemNav from './ScrollItemNav.vue'
import ToolsBar from './ToolsBar.vue';
import { useCusShortKey } from '../utils/hotkeys';
import { HotkeysEvent } from 'hotkeys-js';
import { messages, lang } from '../langs/index';
import { useMouse } from '../hooks/mouse';
import { usePlayer } from '../hooks/player';
import { ImageObjectTypes } from '../types/image-viewer';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    current: {
        type: String,
        default: () => {
            return ''
        }
    },
    images: {
        type: Array as PropType<string[]>,
        required: true
    },
    zIndex: {
        type: Number,
        default: () => {
            return 2000
        }
    },
    image: {
        type: HTMLImageElement,
        required: false
    },
    from: {
        type: String,
        default: () => {
            return ''
        }
    },
    handleChange: {
        type: Function,
        default: () => {
            return () => {}
        }
    },
    handleClose: {
        type: Function,
        default: () => {
            return () => {}
        }
    },
    language: {
        type: String,
        default: () => {
            return 'zh'
        }
    },
    playSpeed: {
        type: Number,
        default: () => {
            return 2000
        }
    }
})

const $t = (langkey = "") => {
    // @ts-ignore
    const local = messages[props.language]
    if (local) {
        const { image } = local
        const keys = langkey.split('.')
        return image[keys[1]] || langkey
    } else {
        console.warn(`[images-viewer-vue3]:The current language '${props.language}' is not supported`)
        return props.language
    }
}

const {
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
    imageRef, 
    imageVieverWidgetRef, 
    loadImage, 
    errorImage, 
    zoomIn, 
    zoomOut,
    inevrtY,
    inevrtX,
    clockwise,
    counterclockwise,
    currentIndex,
} = useToolbar(props.images as string[], props.handleChange);

const emits = defineEmits(['on-close', 'on-change', 'onUpdate:value']);

const { onMouseDown,onMouseMove,onMouseUp, onMouseLeave } = useMouse()

// 自动播放
const { scrollItemNavRef, playState, autoPlay, stopPlay, hotKeyAutoPlay} = usePlayer(currentIndex, props.images, imageRef, props.handleChange, props.playSpeed)
const onMouseEnterImage = (evt:MouseEvent) => {
    stopPlay()
}

// 自动播放过程中，手动切换图片，停止播放
const setPrevious = () => {
    stopPlay()
    previousImage()
}
const setNext = () => {
    stopPlay()
    nextImage()
}

// 快捷键提示
const hotkey = ref('')
const isActiveKey = ref(false)

// 注册快捷键
function registerHotkey (keys: string, action: () => void, prevent: boolean = true) {
    useCusShortKey({
        [keys]:(event: KeyboardEvent, handler: HotkeysEvent) => {
            // action(event)
            action()
            toggleHotkey(event, handler, prevent)
        }
    })
}

// next
registerHotkey('right', nextImage)
// previous
registerHotkey('left', previousImage)
// inevrtY
registerHotkey('ctrl+i+y', inevrtY)
// inevrtX
registerHotkey('ctrl+i+x', inevrtX)
// Rotate 90 degrees clockwise
registerHotkey('ctrl+c+r', clockwise)
// Rotate 90 degrees counterclockwise
registerHotkey('ctrl+c+l', counterclockwise)
// reset
registerHotkey('ctrl+z', resetStyle)
// close
registerHotkey('esc', close)
// autoPlay image
registerHotkey('space', hotKeyAutoPlay)

// scale
useCusShortKey({'ctrl+*': (event:KeyboardEvent, handler:HotkeysEvent) => {
    switch (event.key) {
        case '-':
            zoomOut(event)
            toggleHotkey(event, handler, true, 'ctrl + '+event.key)
            break;
        case '+':
            zoomIn(event)
            toggleHotkey(event, handler, true, 'ctrl + '+event.key)
            break;
        default:
            break;
    }
}})

// isPrevent：true阻止浏览器默认快捷键
function toggleHotkey (event:KeyboardEvent, handler:HotkeysEvent, isPrevent = false, cusKey = "") {
    if (isPrevent) event.preventDefault()

    const { key } = handler;
    hotkey.value = cusKey||key
    isActiveKey.value = true
    setTimeout(() => {
        isActiveKey.value = false
    }, 2000)
}

// 移动端监听回调
const onCallBack = ({ index, url}: ImageObjectTypes) => {
    currentIndex.value = index
    updateImageSrc.value = url
    props.handleChange({image: url, index: currentIndex.value })
}

const isVisibleNav = ref(false)
const isMessage = ref(false)
const setNavState = () => {
    isVisibleNav.value = !isVisibleNav.value
}

// 页面渲染完成后
nextTick(() => {
    if (getUserAgent()) {
        // @TODO
        updateImageSrc.value = props.current
        loading.value = false
        const findIndex = props.images.findIndex(el => el === props.current)
        if (findIndex !== -1) {
            currentIndex.value = findIndex
        }
    } else loadPc()
})

function loadPc () {
    if (!imageRef.value) return

    if (props.image === void 0) {
        imageRef.value.src = props.current
    } else {
        const findIndex = props.images.findIndex(el => el === props.current)
        if (findIndex !== -1) {
            currentIndex.value = findIndex
        }

        const firstRect = props.image.getBoundingClientRect()

        updateImageSrc.value = imageRef.value.src = props.image.src

        const lastRect = imageRef.value.getBoundingClientRect()
        const player = FlipAnimate(imageRef.value, firstRect, lastRect)

        player.addEventListener('finish', (evt) => { 
            isVisibleNav.value = true
            // console.log('Animation execution completed.')
        })
    }
}

watch(() => currentIndex.value, (n, o) => {
    if (n) {
        updateIsActive()
    }
})

function updateIsActive () {
    if (currentIndex.value===props.images.length-1) {
        isMessage.value = true
        setTimeout(() => {
            isMessage.value = false
        }, 2000)
    }
}

// const onClickNavImage = debounce(clickImge, 200)
type ClickImageType = {
    evt:Event, 
    item: ImageObjectTypes, 
    index: number
}
function clickImge ({ evt, item, index }:ClickImageType) {

    loadImageErrorText.value = ""
    if (!imageRef.value) return

    if (evt.target) {
        const EL = evt.target as HTMLImageElement
        const firstRect = EL.getBoundingClientRect()
        const imageId = Number(EL.getAttribute('data-id')) 
        // 点击相同照片不更新视图
        if (imageId === currentIndex.value) return

        currentIndex.value = item.index
        // currentIndex.value = originImages.value.findIndex(el => el.index === activeIndex.value)
        updateImageSrc.value = imageRef.value.src = EL.src
        const lastRect = imageRef.value.getBoundingClientRect()
        props.handleChange({image: updateImageSrc.value, index: currentIndex.value })
        FlipAnimate(imageRef.value, firstRect, lastRect)
    }
}

function close () {
    destroyedExe()
    props.handleClose()
    updateImageSrc.value = ""
}

onBeforeUnmount( () => {
    destroyedExe()
})

// 注册原图片列表
provide('images', props.images)
provide('isMultipleImage', isMultipleImage.value)
</script>

<style lang="scss" src="../styles/index.scss" scoped></style>