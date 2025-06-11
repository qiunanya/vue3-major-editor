<template>
<div class="container">
    <header>
        <a href="https://github.com/qiunanya/vue3-major-editor.git" target="_blank" title="ZekoFront">
            <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
        </a>
        <h3 class="h3">@ZekoFront for Vue3 UI</h3>
    </header>
    <main class="body list-group">
        <div class="list-group-item" v-for="(item, index) in menuList" :key="index">
            <NIcon size="50">
                <component :is="item.meta.icon"></component>
            </NIcon>
            <aside class="desc-text">
                <router-link :to="item.path">{{ item.meta.title }}</router-link>
                <p>{{ item.meta.desc }}</p>
            </aside>
        </div>
    </main>
    <footer></footer>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { useRouter, RouteRecordNormalized } from 'vue-router'

const router = useRouter();

const menuList = ref<RouteRecordNormalized[]>([])

onMounted(() => {
    const allRoutes = router.getRoutes();
    menuList.value =  allRoutes.filter(el => el.name !== 'home')

})
</script>

<style lang="scss">
.container {
    header {
        display: flex;
        align-items: center;
        a {
            margin-right: 12px;    
        }
        .h3 {
            color: #646cff;
            letter-spacing: 1px;
        }
    }
    .list-group {
        display: flex;
        flex-wrap: wrap;
        .list-group-item {
            width: fit-content;
            padding: 12px;
            display: flex;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            margin-right: 10px;
            margin-bottom: 10px;
            .desc-text {
                margin-left: 12px;
                a {
                    font-size: 1.2em;
                }
                p {
                    color: gray;
                }
            }
        }
    }
}
</style>