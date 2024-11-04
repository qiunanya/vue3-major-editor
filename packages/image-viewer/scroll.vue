<template>
    <div>
        <div>
            <div class="inline-block mr-4">
                Jump to index
                <input v-model="index" placeholder="Index" type="number">
            </div>
            <button type="button" @click="handleScrollTo">Go</button>
            <button type="button" @click="autoPlay">自动播放</button>
            <button type="button" @click="stopPlay">停止播放</button>
        </div>
        <div>
            <div class="inline-block mr-4">
                Filter list by size
                <input v-model="search" placeholder="e.g. small, medium, large" type="search">
            </div>
        </div>
        <div v-bind="containerProps" class="scroll-container">
            <div v-bind="wrapperProps">
                <div v-for="{ index, data } in list" :key="index" class="border border-$c-divider mb-2" :style="{
                    height: `${data.height}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }">
                    Row {{ index }} <span opacity="70" m="l-1">({{ data.size }})</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { computed, ref } from 'vue'

const index: Ref = ref()
const search = ref('')

const allItems = Array.from(Array.from({ length: 99999 }).keys())
    .map(i => ({
        height: i % 2 === 0 ? 42 : 84,
        size: i % 2 === 0 ? 'small' : 'large',
    }))

const filteredItems = computed(() => {
    return allItems.filter(i => i.size.startsWith(search.value.toLowerCase()))
})

// 自动播放
var tiemer;
const autoPlay = () => {
    tiemer = setInterval(() => {
        index.value++
        scrollTo(index.value)
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
    scrollTo(index.value)
}
</script>

<style lang="scss">
.scroll-container {
    height: 300px;
    background-color: #6b72800d;
    padding: .5rem;
    overflow-y: auto;
    .mb-2 {
        border: 1px tomato solid;
        margin-bottom: .5rem;
    }
}
    
</style>