<template>
<n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="xRef"
    :y="yRef"
    :options="menuList"
    :show="showDropdown"
    :on-clickoutside="onClickoutside"
    @select="handleSelect"
/>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, ref } from "vue";
import { NDropdown } from 'naive-ui'
import { useNaiveDiscrete } from "@/hooks/navie-ui";
import { Editor, Extension } from "@tiptap/vue-3";
import { ITableContextMenuItem } from '@/typings/index'
import { DropdownMixedOption, DropdownOption } from "naive-ui/es/dropdown/src/interface";

const editor = inject('editor') as Editor
const { message } = useNaiveDiscrete();
const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
    coordsX: {
        type: Number,
        default: 0,
    },
    coordsY: {
        type: Number,
        default: 0,
    },
    onClose: {
        type:Function,
        default: () => {
            return (val:boolean) => void {}
        }
    }
});

const showDropdown = ref(props.isVisible);
const xRef = ref(0);
const yRef = ref(0);
 
function handleSelect(key: string | number, option:DropdownOption) {
    const item = option as ITableContextMenuItem
    if (item.command) {
        item.command()
    }
    showDropdown.value = false;
    // message.info(String(key));
}
function open({ left, top, e }:{left:number;top:number, e:MouseEvent}) {
    e.preventDefault();
    showDropdown.value = false;
    nextTick().then(() => {
        showDropdown.value = true;
        xRef.value = left;
        yRef.value = top;
    });
}

const menuList = computed(() => {
    let arr:ITableContextMenuItem[] = []
    const { extensions } = editor.extensionManager
    const table = extensions.find(el => el.name === 'table') as Extension
    if (table) {
        const { onClick } = table.options;
        if (typeof onClick === 'function') {
            const opt = onClick({ editor });
            arr = opt.componentProps.options
        } else arr = []
    }
    return arr as DropdownMixedOption[]
})

function onClickoutside() {
    // message.info("clickoutside");
    showDropdown.value = false;
    props.onClose(showDropdown.value)
}
defineExpose({
    open,
    onClickoutside
})
</script>
