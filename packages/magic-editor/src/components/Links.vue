<template>
    <n-modal
        v-model:show="visible"
        :mask-closable="false"
        preset="dialog"
        title="插入链接"
        content="你确认"
        positive-text="确认"
        negative-text="算了"
        @positive-click="onPositiveClick"
        @negative-click="onNegativeClick">
        <n-input v-model:value="linkValue" type="text" placeholder="请输入链接"/>
        <p style="color: #d03050;">仅支持http://、https://或ftp://开头的链接地址</p>
    </n-modal>
</template>

<script setup lang="ts" name="Links">
import { ref } from 'vue';
import { useSelectCore } from "../hooks/useSelect";
import { useNaiveDiscrete } from "../hooks/navie-ui";
import { NModal, NInput } from "naive-ui";


const { majorEditor, editor } = useSelectCore();
const { message, dialog, modal } = useNaiveDiscrete();

const visible = ref(false)
const linkValue = ref('')
const isTips = ref(false)

const onPositiveClick = () => {
    const regex = /^(http:\/\/|https:\/\/|ftp:\/\/).*/
    if (!regex.test(linkValue.value)) {
        console.log('输入地址失效的');
        visible.value = true
    }
    const chain = editor.chain().focus()
    if (linkValue.value) {
        chain.extendMarkRange('link')
        .setLink({ href: linkValue.value })
        .run()
    } else {
        chain.extendMarkRange('link')
          .unsetLink()
          .run()
    }
}
const onNegativeClick = () => {}

const toggle = () => {
    visible.value = !visible.value
}
defineExpose({
    toggle
})
</script>