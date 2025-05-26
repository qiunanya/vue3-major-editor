<template>
<NTooltip placement="bottom" trigger="hover" v-if='icons'>
    <template #trigger>
        <button :class="iconClass" data-editor-toolbar-btn="true" @click="handle">
            <component :is="icons"></component>
        </button>
    </template>
    <p style="text-align: center;line-height: 1;font-size: 14px;">{{ tipText }}</p>
    <p v-if="shortcutKeys" style="color: grey;line-height: 1;margin: 0;font-size: 12px;">{{ shortcutKeys }}</p>
</NTooltip>
</template>
    
<script setup lang="ts" name="ButtonIcon">
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
    shortcutKeys: String,
    command: {
        type:Function,
        default:Void
    }
})

const iconClass = computed(() => ({
    'toolbar-icon--btn': true,
    'toolbar-icon--active ': props.isActive,
    'toolbar-icon--readonly':  props.isReadonly
}))



// 设置文本样式
function handle() {
    !props.isReadonly&&props.command()
}
</script>