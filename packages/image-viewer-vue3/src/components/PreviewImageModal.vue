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
            <span>{{images.length}}&nbsp;&nbsp;/&nbsp;</span>
        </div>
        <PreviewImageMobile
            :current-image.camel="current" 
            :active-image.camel="image" 
            @on-cb="onCallBack">
        </PreviewImageMobile>
    </div>
    <!-- pc端 -->
    <div v-else :class="['images-viewer-vue3__content', { 'active-grid': !isVisibleNav}, { 'close-grid': !isMultipleImage}]">
        <div :class="[
            'content-nav__wrapper', 
            { 'nav-active': isVisibleNav }, 
            { 'is-hidden': getUserAgent() }, 
            { 'is-hidden': !isMultipleImage },
            { 'is-hidden': isHiddenSiderNav },
        ]">
            <!-- 使用Vueuse的虚拟滚动useVirtualList hook -->
            <ScrollItemNav
                ref="scrollItemNavRef"
                :isHiddenSearch="isHiddenSearch" 
                v-model="currentIndex"
                :max-value.camel="images.length"
                @on-click="clickImge"
                @on-input="onInput">
            </ScrollItemNav>
        </div>
        <div class="content-viewer-image__wrapper" @wheel="onWheelListener">
            <div :class="['image-header__inner', { 'flex-end': !isMultipleImage },{ 'flex-end': isHiddenSiderNav }]">
                <NIcon v-if="isMultipleImage" size="25" @click.stop.prevent="setNavState" :class="['cursor image-collapse-nav__btn',{'rotate-right__btn': !isVisibleNav }]">
                    <List24Regular/>
                </NIcon>
                <div class="image-info--group">
                    <section class="info-icon__item">
                        <NTooltip class="image-info--tooltip" placement="bottom" trigger="hover">
                            <template #trigger>
                                <NIcon size="25">
                                    <Info24Regular/>
                                </NIcon>
                            </template>
                            <p style="margin: 2px 0;">{{$t('common.naturalRatio')}}：{{imageInfo.naturalRatio}}</p>
                            <!-- <p style="margin: 2px 0;">{{$t('common.imageType')}}：{{imageInfo.type}}</p> -->
                            <p style="margin: 2px 0;">{{$t('common.fileZise')}}：{{imageInfo.size}}</p>
                            <p style="margin: 2px 0;" :title="updateImageSrc">
                                {{$t('common.origin')}}：
                                <a class="link-a" :href="updateImageSrc" target="_blank" style="color: white;">{{updateImageSrc}}</a>
                            </p>
                        </NTooltip>
                    </section>
                    <section class="info-icon__item">
                        <NIcon size="25" @click="close" class="cursor">
                            <DismissCircle24Regular/>
                        </NIcon>
                    </section>
                </div>
            </div>
            
            <div v-if="loadImageErrorText" style="user-select: text;">
                <p style="color: orange;text-decoration: solid;">{{ $t('common.loadErrorText') }}</p>
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

            <!-- 图片工具栏 -->
            <ToolsBar
                :play-state.camel="playState"
                :is-downLoad.camel="isDownLoad"
                :total-num="images.length"
                :current="currentIndex+1"
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
                @on-autoPlay="autoPlay"
                @on-fullScreen="fullScreen">
            </ToolsBar>
        </div>
    </div>
   
    <HotKeyTooltip v-model:hotkey="hotkey" :is-active-key.camel="isActiveKey"></HotKeyTooltip>
</div>

</template>
<script setup lang="ts" name="PreviewImageModal">
import { watch, ref, nextTick, onBeforeUnmount, provide, inject } from 'vue';
import type { PropType, Ref } from 'vue'
import { useToolbar,usePlayer, useNaiveDiscrete } from '@/hooks';
import HotKeyTooltip from './HotKeyTooltip.vue';
import PreviewImageMobile from './PreviewImageMobile.vue';
import LoadingUI from './Loading.vue';
import ScrollItemNav from './ScrollNavSiderBar.vue'
import ToolsBar from './ToolsBar.vue';
import { useCusShortKey, FlipAnimate, getUserAgent } from '@/utils';
import { HotkeysEvent } from 'hotkeys-js';
import { ImageObjectTypes, ClickNavImageType } from '@/types/image-viewer';
import { NTooltip, NIcon } from "naive-ui";
import { DismissCircle24Regular, Info24Regular, List24Regular } from '@vicons/fluent'
import { Composer } from 'vue-i18n';

type I18nGlobal = Composer<Record<string, string>, Record<string, string>, Record<string, string>, string, false>

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    specifyIndex: {
        type: Number,
        default: () => {
            return 0
        }
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
    },
    isDownLoad: {
        type: Boolean,
        default: () => {
            return true
        }
    },
    isHiddenSiderNav: {
        type: Boolean,
        default: () => {
            return false
        }
    },
    isHiddenSearch: {
        type: Boolean,
        default: () => {
            return false
        }
    },
    i18n: Object as PropType<I18nGlobal>
})

const { message } = useNaiveDiscrete()

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
    fullScreen
} = useToolbar(props.images as string[], props.handleChange);

const emits = defineEmits(['on-close', 'on-change', 'onUpdate:value']);

const $t = (langkey = "") => {
    return props.i18n?.t(langkey)
}

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
// fullScreen
registerHotkey('f11',fullScreen)

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
            currentIndex.value = props.specifyIndex || findIndex
            scrollItemNavRef.value.scrollTo(currentIndex.value)
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
        message.info('已经是最后一张图片了')
    }
}

function onInput (val:number) {
    if (!imageRef.value) return

    const findItem = props.images[val]
    updateImageSrc.value = imageRef.value.src = findItem
}

// const onClickNavImage = debounce(clickImge, 200)
function clickImge ({ evt, item, index }:ClickNavImageType) {

    loadImageErrorText.value = ""
    if (!imageRef.value) return

    if (evt.target) {
        const originImage = evt.target as HTMLImageElement
        const firstRect = originImage.getBoundingClientRect()
        const imageId = Number(originImage.getAttribute('data-id'))

        // 点击相同照片不更新视图
        if (imageId === currentIndex.value) return

        currentIndex.value = item.index
        // currentIndex.value = originImages.value.findIndex(el => el.index === activeIndex.value)
        updateImageSrc.value = imageRef.value.src = originImage.src
        const lastRect = imageRef.value.getBoundingClientRect()
        FlipAnimate(imageRef.value, firstRect, lastRect)
        props.handleChange({image: updateImageSrc.value, index: currentIndex.value })
        
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
provide('i18n', props.i18n)
</script>

<style lang="scss" src="../styles/index.scss" scoped></style>