<template>
<div class="scroll-item-nav__wrapper" ref="scrollRef">
    <div class="nav-header__wrap">
        <input class="image-index" :value="activeIndex+1" placeholder="请输入张数" type="number">
        <button class="query-btn"type="button" @click="handleScrollTo">Go</button> 
    </div>
    <div class="nav-scroll__wrap" v-bind="containerProps">
        <div v-bind="wrapperProps">
            <div v-for="{ index, data } in list" :key="index" :class="['list-group-item', {'active-item': activeIndex === data.index}]" :style="{
                height: `${data.height}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }">
                <!-- <span class="index">{{ index }}</span> -->
                <img class="list-group-image" :data-id="data.index" v-lazy-image="data.url" src="" alt="picture" @click.stop.prevent="clickImge($event,data, index)">
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import type { Ref, PropType } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { computed, ref, nextTick, inject } from 'vue'
import vLazyImage from '../directive/v-lazy-image'

// const { viewerImages } = defineProps({
//     viewerImages: {
//         type: Array as PropType<string[]>,
//         required: true    
//     }
// })
// 引入图片列表
const viewerImages = inject('images') as string[]

const emit = defineEmits(['on-click'])

const activeIndex = defineModel<number>({ required: true, default: () => {
    return 1
}})

// const activeIndex: Ref = ref(0)
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
    height: i % 2 === 0 ? 60 : 60,
    size: i % 2 === 0 ? 'small' : 'large',
    url: mp,
    index: i,
}))

const filteredItems = computed(() => {
    return allItems.filter(i => i.size.startsWith(search.value.toLowerCase()))
})

const clickImge = (evt:Event,item:ItemType, index:number) => {
    emit('on-click', { evt, item, index })
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
    if (scrollRef.value) {
        const siderBar = scrollRef.value as HTMLElement
        // siderBar.getBoundingClientRect()
        const { innerHeight } = window
        siderBar.style.setProperty('--sider-height', `${innerHeight - 65}`)
    }
})

defineExpose({
    scrollTo
})
</script>

<style lang="scss" scoped>
.scroll-item-nav__wrapper {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    overflow: hidden;
    .nav-header__wrap {
        // margin: 0 .3rem;
        height: 50px;
        overflow: hidden;
        .image-index {
            width: 100%;
            outline: none;
            border: none;
            text-align: center;
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