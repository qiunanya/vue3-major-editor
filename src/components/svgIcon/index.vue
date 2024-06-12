<template>
    <div class="cus-svg-wrap" :style="{width: `${iconW}px`,height:`${iconH}px`}">
        <img :src="iconPath" alt="">
    </div>
</template>

<script setup lang="js">
import { computed, ref } from 'vue'
defineOptions({ name: "SvgIcon" })

const props = defineProps({
    icon: {
        type: String,
        default: () => 'vue'
    },
    iconW: {
        type: Number || String,
        default: function () {
            return 80
        }
    },
    iconH: {
        type: Number || String,
        default: function () {
            return 80
        }
    },
    fill: {
        type: String,
        default: "#000000"
    }
})

// 备用方案
// 使用 import.meta.glob 导入所有 SVG 文件
const icons = import.meta.glob('@/assets/icons/*.svg', { eager: true });
// 计算属性：根据传递的 icon 属性获取对应的 SVG 路径
const iconPath = computed(() => {
    const iconkeys = Object.keys(icons)
    const iconName = iconkeys.find(el => el.includes(props.icon))
    return icons[iconName]?.default || '';
});
</script>

<style>
    
</style>