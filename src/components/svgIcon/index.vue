<template>
    <div class="cus-svg-wrap">
        <img :src="`@/assets/icons/${icon}.svg`" alt="">
    </div>
</template>

<script setup lang="js">
    defineOptions({name: "SvgIcon"})
    defineProps({
        icon: {
            type: String,
            default: () => 'vue'
        }
    })
</script>