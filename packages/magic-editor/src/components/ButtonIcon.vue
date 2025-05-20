<template>
<NTooltip placement="bottom" trigger="hover" v-if='icons'>
    <template #trigger>
        <button :class="iconClass" data-toolbar-type="toolbar-btn" @click="handle">
            <component :is="icons"></component>
        </button>
    </template>
    <span>{{ tipText }}</span>
</NTooltip>
</template>
    
<script setup lang="ts">
import { NTooltip } from "naive-ui";
import { Void } from '@/utils'

// 此处不能解构，解构后computed无法监听属性变化
// { isActive, command } = props
const props = defineProps({
    isActive: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    icons: {
      type: String,
      default: ''
    },
    tipText: {
      type: String,
      default: '暂无提示'
    },
    command: {
        type:Function,
        default:Void
    }
})

const iconClass = computed(() => ({
    'toolbar_btn': true,
    'toolbar-icon__active': props.isActive,
    'toolbar-icon__readonly':  props.isReadonly
}))



// 设置文本样式
function handle() {
    !props.isReadonly&&props.command()
}
</script>