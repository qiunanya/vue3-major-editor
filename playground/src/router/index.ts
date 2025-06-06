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
            title: '图片查看器'
        }
    },
    {
        path: '/major-editor',
        name: 'major-editor',
        component: () => import('@/views/major-editor/index.vue'),
        meta: {
            requiresAuth: true,
            title: 'vue3富文本'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router