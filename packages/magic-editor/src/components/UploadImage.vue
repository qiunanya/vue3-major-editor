<template>
    <n-modal
        v-model:show="isVisible"
        preset="dialog"
        title="上传图片"
        content="你确认?"
        positive-text="确认"
        negative-text="算了"
        @positive-click="onPositiveClick"
        @negative-click="onNegativeClick"
    >
        <n-tabs type="line" animated :default-value="tabPane" :on-update:value="onUpdatedTab">
            <n-tab-pane name="link" tab="图片连接">
                <div style="padding: 20px;">
                    <n-input v-model:value="imageLink" placeholder="请输入图片连接"/>
                </div>
            </n-tab-pane>
            <n-tab-pane name="upload" tab="上传图片">
                <div style="padding: 20px;">
                    <input type="file" accept="image/*" @change="onChangeFile" multiple/>
                </div>
            </n-tab-pane>
        </n-tabs>
    </n-modal>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { NTabs, NTabPane, NModal, NInput } from "naive-ui";
import { useSelectCore } from "../hooks/useSelect";
import { useNaiveDiscrete } from "../hooks/navie-ui";

interface TranserType {
    file:FileList, 
    formData:FormData
}

const { majorEditor, editor, props } = useSelectCore();
const { message, dialog, modal } = useNaiveDiscrete();

const imageLink = ref('')
const isVisible = ref(false);
const tabPane = ref('link')
const imagesTemp:Ref<TranserType> = ref({
    file: new DataTransfer().files,
    formData: new FormData()
})

const emits = defineEmits(['uploadImageSuccess'])

const onUpdatedTab = (val: string) => {
    tabPane.value = val
    if (val === 'link') {
        editor.commands.setImage({ src: imageLink.value });
    }
}
const onNegativeClick = () => {
    message.success("Cancel");
    isVisible.value = false;
};
const onPositiveClick = () => {
    // message.success("Submit");
    isVisible.value = false;
    onUploadSuccess(imagesTemp.value)
};
const onChangeFile = (evt: Event) => {
    const input = evt.target as HTMLInputElement;
    const file = input.files as FileList;
    const formData = new FormData()

    for (let i = 0; i < file.length; i++) {
        formData.append('file', file[i])
        if (file[i] && props.imageInner) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target?.result as string;
                editor.commands.setImage({ src: base64, alt: '占位图片', title: '图片' });
            };
            reader.readAsDataURL(file[i]);
        }
    }

    imagesTemp.value.file = file
    imagesTemp.value.formData = formData
};

const initialize = () => {
    isVisible.value = true;
};

const onUploadSuccess = (opt:TranserType) => {
    emits('uploadImageSuccess', opt)
}

defineExpose({
    initialize
});
</script>

<style lang="scss" scoped></style>
