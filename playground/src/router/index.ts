import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router"


const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/images-viewer-vue3',
        name: 'images-viewer-vue3',
        component: () => import('@/views/images-viewer/index.vue'),
        meta: {
            requiresAuth: true,
            title: 'vue3图片查看器',
            icon: 'ImageSearch24Regular',
            desc: 'images-viewer-vue3'
        }
    },
    {
        path: '/major-editor',
        name: 'major-editor',
        component: () => import('@/views/major-editor/index.vue'),
        meta: {
            requiresAuth: true,
            title: 'vue3富文本',
            icon: 'TextField24Regular',
            desc: 'tiptap-editor-vue3'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router