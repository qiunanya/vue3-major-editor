<template>
    <div class="scroll-item-nav__wrapper" ref="scrollRef">
        <div class="nav-header__wrap">
            <input class="image-index" :min="1" :max="maxValue" v-model="counter" placeholder="请输入张数" type="number"
                @keydown="onKeyDown">
            <button :class="['query-btn', {'is-disabled': isDisabled }]" type="button" @click="scrollToImage" :disabled="isDisabled">GO</button>
        </div>
        <div class="nav-scroll__wrap" v-bind="containerProps">
            <div v-bind="wrapperProps">
                <div v-for="{ index, data } in list" :key="index"
                    :class="['list-group-item', { 'active-item': activeIndex === data.index }]" :style="{
                        height: `${data.height}px`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }">
                    <!-- <span class="index">{{ index }}</span> -->
                    <!-- 加载动画 -->
                    <NavLoading v-if="data.isLoad"></NavLoading>
                    <!-- 加载错误文本 -->
                    <span class="error-text" v-if="data.isError">加载失败</span>
                    <img
                        class="list-group-image" 
                        :data-id="data.index" 
                        v-lazy-image="data.url" 
                        alt="picture"
                        @load="onLoad(data, index)"
                        @error="onError(data, index)"
                        @click.stop.prevent="clickImge($event, data, index)">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Ref, PropType } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { computed, ref, nextTick, inject, watch } from 'vue'
import vLazyImage from '../directive/v-lazy-image'
import NavLoading from './NavLoading.vue'

// 引入图片列表
const viewerImages = inject('images') as string[]

const { maxValue } = defineProps({
    maxValue: {
        type: Number,
        default: 10000,
        required: true
    }
})
const emit = defineEmits(['on-click', 'on-input'])

const activeIndex = defineModel<number>({ required: true, default: () => 1 })
const scrollRef: Ref = ref<HTMLElement | null>(null)
const search: Ref = ref<string>('')
const counter: Ref = ref<number>(1)

// const allItems = Array.from(Array.from({ length: 300 }).keys())
//     .map(i => ({
//         height: i % 2 === 0 ? 84 : 84,
//         size: i % 2 === 0 ? 'small' : 'large',
//     }))
type ItemType = {
    height: number,
    size: string,
    url: string,
    index: number,
    isLoad: boolean,
    isError: boolean
}
const allItems = viewerImages.map((mp, i) => ({
    height: i % 2 === 0 ? 60 : 60,
    size: i % 2 === 0 ? 'small' : 'large',
    url: mp,
    index: i,
    isLoad: true,
    isError: false
}))

const filteredItems = computed(() => {
    return allItems.filter(i => i.size.startsWith(search.value.toLowerCase()))
})

const isDisabled = computed(() => {
    return counter.value>viewerImages.length;
})

const onLoad = (item:ItemType, index:number) => {
    item.isLoad = false
    item.isError = false
}

const onError = (item:ItemType, index:number) => {
    item.isLoad = false
    item.isError = true
}

const clickImge = (evt: Event, item: ItemType, index: number) => {
    emit('on-click', { evt, item, index })
}

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
    filteredItems,
    {
        itemHeight: i => (filteredItems.value[i].height + 8),
        overscan: 10,
    },
)

const onKeyDown = (evt: Event) => {
    const et = evt as KeyboardEvent || window.event
    if (['Enter', 'NumpadEnter'].includes(et.code)) {
        !isDisabled.value&&scrollToImage()
    }
}

function scrollToImage () {
    let newValue = +counter.value
    if (newValue >= 1) {
        const sortIndex = newValue - 1
        scrollTo(sortIndex)
        emit('on-input', sortIndex)
        activeIndex.value = sortIndex
    }
}

nextTick().then(res => {
    if (scrollRef.value) {
        const siderBar = scrollRef.value as HTMLElement
        // siderBar.getBoundingClientRect()
        let currentWin = window as Window
        siderBar.style.setProperty('--sider-height', `${currentWin.innerHeight - 50}`)
        window.addEventListener('resize', (evt) => {
            currentWin = evt.target as Window
            siderBar.style.setProperty('--sider-height', `${currentWin.innerHeight - 50}`)
        })
    }
})

defineExpose({
    scrollTo,
    scrollToImage
})
</script>

<style lang="scss" scoped>
.scroll-item-nav__wrapper {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    overflow: hidden;

    .nav-header__wrap {
        height: 50px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .image-index {
            outline: none;
            border: none;
            text-align: center;
            flex: 1;
        }

        .query-btn {
            flex: 1;
            background: #3a8df5;
            color: #eee;
            border: none;
            border-radius: 4px;
            &.is-disabled {
                cursor: not-allowed;
                opacity: 0.7;
            }
        }
    }

    .nav-scroll__wrap {
        height: calc(var(--sider-height, 600) * 1px);
        background-color: #6b72800d;
        padding: .5rem 0.3rem;
        overflow-y: auto;

        .list-group-item {
            border: 1px solid transparent;
            margin-bottom: 0.5rem;
            border-radius: 4px;
            position: relative;
            opacity: 0.5;

            &:hover {
                opacity: 1; 
            }

            &.active-item {
                opacity: 1;
                border: 1px solid var(--active-icon-color);
            }

            .index {
                position: absolute;
                top: 10px;
                left: 20px;
                color: red;
            }
            .error-text {
                position: absolute;
                top: 20px;
                left: 15px;
                color: tomato;
                font-size: 12px;
            }

            .list-group-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 4px;
            }
        }
    }
}
</style>