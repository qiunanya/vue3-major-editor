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
import { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";

const editor = inject('editor') as Editor
const { message, dialog, modal } = useNaiveDiscrete();
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

const options = [
    {
        label: "杰·盖茨比",
        key: "jay gatsby",
    },
    {
        label: "黛西·布坎南",
        key: "daisy buchanan",
    },
    {
        type: "divider",
        key: "d1",
    },
    {
        label: "尼克·卡拉威",
        key: "nick carraway",
    },
    {
        label: "其他",
        key: "others1",
        children: [
            {
                label: "乔丹·贝克",
                key: "jordan baker",
            },
            {
                label: "汤姆·布坎南",
                key: "tom buchanan",
            },
            {
                label: "其他",
                key: "others2",
                children: [
                    {
                        label: "鸡肉",
                        key: "chicken",
                    },
                    {
                        label: "牛肉",
                        key: "beef",
                    },
                ],
            },
        ],
    },
];
const newMenus = ref<ITableContextMenuItem[]>([])
const showDropdown = ref(props.isVisible);
const xRef = ref(0);
const yRef = ref(0);
 
function handleSelect(key: string | number) {
    showDropdown.value = false;
    const findItem = newMenus.value.find(el => el.key === key)
    if (findItem&&findItem.command) {
        findItem.command()
    }
    message.info(String(key));
}
function open({ left, top, e }:{left:number;top:number, e:MouseEvent}) {
    e.preventDefault();
    showDropdown.value = false;
    nextTick().then(() => {
        showDropdown.value = true;
        xRef.value = left;
        yRef.value = top;
        console.log('open：', left, top, e)
    });
}

nextTick(() => {
    const ms = menuList.value as ITableContextMenuItem[]
    newMenus.value = ms.reduce((pre:ITableContextMenuItem[], cur:ITableContextMenuItem) => {
        if (!cur.type) pre.push(cur)
        if (cur.children&&cur.children.length) {
            pre = pre.concat(cur.children)
            cur.children = []
        }
        return pre
    }, [])
})

const menuList = computed(() => {
    let arr:ITableContextMenuItem[] = []
    const { extensions } = editor.extensionManager
    const table = extensions.find(el => el.name === 'custTable') as Extension
    const { onClick } = table.options;
    if (typeof onClick === 'function') {
        const opt = onClick({ editor });
        arr = opt.componentProps.options
    } else arr = []
    return arr as DropdownMixedOption[]
})
function onClickoutside() {
    message.info("clickoutside");
    showDropdown.value = false;
    props.onClose(showDropdown.value)
}
defineExpose({
    open,
    onClickoutside
})
</script>
