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
<script setup lang="ts" name="UploadImageModal">
import { NTabs, NTabPane, NModal, NInput } from "naive-ui";
import { useEditorCore } from "@/hooks/useEditorCore";
import { useNaiveDiscrete } from "@/hooks/navie-ui";

interface TranserType {
    file:FileList, 
    formData:FormData
}

const { editor, props } = useEditorCore();
const { message, dialog, modal } = useNaiveDiscrete();

const imageLink = ref('')
const isVisible = ref(false);
const tabPane = ref('link')
const imagesTemp:Ref<TranserType> = ref({
    file: new DataTransfer().files,
    formData: new FormData()
})

const emits = defineEmits(['onUploadImageCallBack'])

const onUpdatedTab = (val: string) => {
    tabPane.value = val
    if (val === 'link') {
        // editor.commands.setImage({ src: imageLink.value });
    }
}

const onNegativeClick = () => {
    message.success("Cancel");
    isVisible.value = false;
};

const onPositiveClick = () => {
    isVisible.value = false;
    
    if (tabPane.value === 'link') {
        const image = new Image()
        image.src = imageLink.value
        image.onload = () => {
            editor.commands.insertCustomImage({ 
                src: imageLink.value, 
                alt: '占位图片', 
                width: image.width, 
                height: image.height,
            });
        }
        
        // 监听错误事件
        image.onerror = () => {
            console.error('图片加载失败');
        }
    }
};

const onChangeFile = (evt: Event) => {
    const input = evt.target as HTMLInputElement;
    const files = input.files as FileList;
    const formData = new FormData()

    // 自定义上传
    if (props.customFileUpload) {
        emits('onUploadImageCallBack', files)
    } else {
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i])
            innerUploadImage(files[i])
        }
    }
};

const innerUploadImage = (file:File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const base64 = event.target?.result as string;
        const image = new Image()
        image.src = base64
        image.onload = () => {
            // 图片加载完成后再插入
            editor.commands.insertCustomImage({ 
                src: base64, 
                alt: '占位图片', 
                width: image.width, 
                height: image.height,
                title: file.name 
            });
        }
        
        // 监听错误事件
        image.onerror = () => {
            console.error('图片加载失败');
        }
    };

    reader.readAsDataURL(file);
}

const initialize = () => {
    isVisible.value = true;
};

defineExpose({
    initialize
});
</script>

<style lang="scss" scoped></style>
