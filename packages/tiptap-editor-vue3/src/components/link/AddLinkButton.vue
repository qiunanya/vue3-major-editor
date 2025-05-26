<template>
<div class="toolbar-icon__wrap">
<NTooltip placement="bottom" trigger="hover">
<template #trigger>
    <button
        :class="[
            {
                'toolbar-icon--active': isActive,
            }
        ]"
        class="toolbar-icon--btn"
        data-editor-toolbar-btn="true"
        @click="handleLink"
    >
        <svg viewBox="0 0 1024 1024" width="200" height="200">
            <path
                d="M402.090667 279.893333l169.984-183.159466A224.4608 224.4608 0 0 1 737.6896 22.9376c62.532267 0 121.309867 26.2144 165.410133 73.591467 90.453333 97.621333 90.453333 255.1808 0 352.802133L825.344 533.026133c-20.343467 22.459733-56.251733 26.965333-86.6304-3.072-25.668267-25.463467-27.921067-63.624533-3.754667-90.248533l77.687467-83.626667a124.245333 124.245333 0 0 0 0-166.229333 101.853867 101.853867 0 0 0-75.025067-33.518933c-28.330667 0-54.954667 11.8784-75.229866 33.655466L492.407467 373.213867c-40.618667 44.8512-35.566933 127.112533 10.24 177.834666 20.48 29.013333 15.086933 53.589333-11.264 82.3296-27.648 26.897067-69.905067 20.616533-89.429334-0.682666C311.637333 535.074133 311.637333 377.514667 402.090667 279.893333zM117.418667 585.796267l80.213333-91.136c19.114667-20.753067 56.1152-20.957867 86.4256 8.6016 23.620267 27.170133 25.3952 58.5728 2.116267 84.036266L208.0768 678.638933a124.245333 124.245333 0 0 0-0.136533 166.024534c20.2752 21.845333 46.830933 33.723733 75.1616 33.723733 28.535467-0.068267 55.842133-12.288 75.3664-33.723733l169.984-183.227734c41.301333-45.4656 37.888-125.7472-6.5536-174.830933-22.1184-27.170133-15.496533-58.914133 11.195733-85.128533 24.712533-24.098133 61.576533-29.696 85.742933-6.007467 90.453333 97.621333 90.453333 261.7344 0 359.287467l-169.984 183.296a224.529067 224.529067 0 0 1-165.6832 73.864533 224.4608 224.4608 0 0 1-165.341866-73.728C27.4432 840.704 27.306667 683.349333 117.418667 585.728z"
            ></path>
        </svg>
    </button>
</template>
<span>超链接</span>
</NTooltip>
<n-modal
    v-model:show="isVisible"
    :mask-closable="false"
    preset="dialog"
    title="插入链接"
    content="你确认"
    positive-text="确认"
    negative-text="算了"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
>
    <n-input v-model:value="linkValue" type="text" placeholder="请输入链接" />
    <n-switch 
        style="margin-top: 20px;"
        :checked-value="true"
        :unchecked-value="false"
        @update:value="handleUpdateValue">
        <template #checked>
        在新标签页中打开链接
        </template>
        <template #unchecked>
        不能打开链接
        </template>
    </n-switch>
    <p style="color: #d03050">仅支持http://、https://或ftp://开头的链接地址</p>
</n-modal>
</div>
</template>

<script setup lang="ts" name="AddLinkButton">
import { inject, ref } from "vue";
import { useSelectCore } from "@/hooks/useSelect";
import { useNaiveDiscrete } from "@/hooks/navie-ui";
import { NModal, NInput, NTooltip, NSwitch } from "naive-ui";
import { Editor } from "@tiptap/vue-3";

const props = defineProps({
    editor: {
      type: Editor,
      required: true,
    },
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
    }
})

const { message, dialog, modal } = useNaiveDiscrete();

const isVisible = ref(false);
const linkValue = ref("");
const openOnClick = ref(false)

const handleLink = () => {
    isVisible.value = !isVisible.value;
    const link = props.editor.getAttributes('link')
    linkValue.value = link.href||''
};

const handleUpdateValue = (value: boolean) => {
    openOnClick.value = value
}

const onPositiveClick = () => {
    console.log('onPositiveClick:', linkValue.value, props.editor)
    const regex = /^(http:\/\/|https:\/\/|ftp:\/\/).*/;
    if (!regex.test(linkValue.value)) {
        console.log("输入地址失效的");
        isVisible.value = true;
    }
    if (linkValue.value&&openOnClick.value) {
        props.editor.commands.setLink({
          href: linkValue.value,
          target: '_blank',
        });
    } else {
        props.editor.commands.setLink({ href: linkValue.value });
    }
};

const onNegativeClick = () => {};
</script>
