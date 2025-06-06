<template>
    <div  style="padding: 12px;">
        <h2 class="h2">@ZekoFront</h2>
        <router-link class="nav-item" :to="item.path" v-for="(item, index) in menuList" :key="index">{{item.meta.title }}</router-link>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute,useRouter, RouteRecordNormalized } from 'vue-router'

const router = useRouter();

const menuList = ref<RouteRecordNormalized[]>([])

onMounted(() => {
    const allRoutes = router.getRoutes();
    menuList.value =  allRoutes.filter(el => el.name !== 'home')

})
</script>

<style lang="scss">
    .nav-item {
       margin-right: 12px;
    }
    .h2 {
        margin: 5px 0;
        color: #646cff;
    }
</style>