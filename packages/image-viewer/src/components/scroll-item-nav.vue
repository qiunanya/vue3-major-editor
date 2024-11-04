<template>
<div class="scroll-item-nav__wrapper" ref="scrollRef">
    <div class="nav-header__wrap">
        <input class="image-index" v-model="activeIndex" placeholder="请输入张数" type="text">
        <button class="query-btn"type="button" @click="handleScrollTo">Go</button>
    </div>
    <div class="nav-scroll__wrap" v-bind="containerProps">
        <div v-bind="wrapperProps">
            <div v-for="{ index, data } in list" :key="index" class="list-group" :style="{
                height: `${data.height}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }">
                <span class="index">{{ index }}</span>
                <img class="list-group-image" :data-id="data.index" v-lazy-image="data.url" src="" alt="picture" @click.stop.prevent="clickImge($event,data, index)">
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import type { Ref, PropType } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { computed, ref, nextTick } from 'vue'
import vLazyImage from '../directive/v-lazy-image'

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


const activeIndex: Ref = ref(0)
const scrollRef: Ref = ref<HTMLElement | null>(null)
const search = ref('')

// const allItems = Array.from(Array.from({ length: 300 }).keys())
//     .map(i => ({
//         height: i % 2 === 0 ? 84 : 84,
//         size: i % 2 === 0 ? 'small' : 'large',
//     }))
type ItemType = {
    height: number,
    size: string,
    url: string,
    index: number
}
const allItems = viewerImages.map((mp, i)=> ({
    height: i % 2 === 0 ? 84 : 84,
    size: i % 2 === 0 ? 'small' : 'large',
    url: mp,
    index: i,
}))

const filteredItems = computed(() => {
    return allItems.filter(i => i.size.startsWith(search.value.toLowerCase()))
})

const clickImge = (evt:Event,data:ItemType, index:number) => {
    console.log(evt)
    emit('on-cb', { index: activeIndex.value, url: data.url })
}

// 自动播放
var tiemer:NodeJS.Timeout;
const autoPlay = () => {
    tiemer = setInterval(() => {
        activeIndex.value++
        scrollTo(activeIndex.value)
    }, 2000);
}

// 停止播放
const stopPlay = () => {
    clearInterval(tiemer)
}
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
    filteredItems,
    {
        itemHeight: i => (filteredItems.value[i].height + 8),
        overscan: 10,
    },
)
function handleScrollTo() {
    scrollTo(activeIndex.value)
}

nextTick().then(res => {
    console.log(scrollRef.value);
    if (scrollRef.value) {
        const siderBar = scrollRef.value as HTMLElement
        // siderBar.getBoundingClientRect()
        const { innerHeight } = window
        siderBar.style.setProperty('--sider-height', `${innerHeight - 60}`)
    }
})
</script>

<style lang="scss" scoped>
.scroll-item-nav__wrapper {
    background-color: rgba(0, 0, 0, 0.6);
    .nav-header__wrap {
        padding: 0 10px;
        .image-index {
            width: 100%;
        }
        .query-btn {
            width: 100%;
            background: #3a8df5;
            color: #eee;
            border: none;
            border-radius: 4px;
        }
    }
    .nav-scroll__wrap {
        
    }
    .nav-scroll__wrap {
        height: calc(var(--sider-height, 600) * 1px);
        background-color: #6b72800d;
        padding: .5rem 0.3rem;
        overflow-y: auto;
        .list-group {
            border: 1px solid transparent;
            margin-bottom: 0.5rem;
            border-radius: 4px;
            position: relative;
            .index {
                position: absolute;
                top: 10px;
                left: 20px;
                color: red;
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