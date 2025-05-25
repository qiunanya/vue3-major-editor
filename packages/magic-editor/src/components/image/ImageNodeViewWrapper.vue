<template>
<node-view-wrapper class="customize-image">
    <div ref="dragModifiedImageRef" :class="[
        'image-single__body drag-modified-image-size',
        { 'image-single__body--actived': isActiveImage }
    ]">
        <img 
            :src="src" 
            :alt="alt" 
            :width="imageWidth" 
            :height="imageHeight" 
            :style="{ width: imageWidth+'px', height: imageHeight+'px' }" 
            ref="imageElement" 
            :title="title"
            @click="selectedImage"
        />
        <div v-if="isUploading" class="upload-status">upload...</div>
        <!-- <div class="resize-handle" @mousedown="startResize"></div> -->

        <template v-if="isActiveImage">
            <div :class="['resize-handle-btn', item]" @mousedown="onHandleBtnDrag" v-for="(item, index) in directionList" :key="index"></div> 
        </template>
    </div>
</node-view-wrapper>
</template>

<script setup lang="ts" name="ImageNodeViewWrapper">
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import { NodeViewProps } from "@tiptap/core";

const props = defineProps({
    ...nodeViewProps,
    node: {
        type: Object as PropType<NodeViewProps["node"]>,
        required: true,
    },
});

const emits = defineEmits(["updateAttributes"]);

const directionList = ref(['top-left','top','top-right','right','bottom-right','bottom','bottom-left','left'])

const imageElement = ref<HTMLImageElement>();
const dragModifiedImageRef = ref<HTMLDivElement>()
const isUploading = ref(false);
const imageWidth = ref(props.node.attrs.width);
const imageHeight = ref(props.node.attrs.height);
const src = ref(props.node.attrs.src || "");
const alt = ref(props.node.attrs.alt || "");
const title = ref(props.node.attrs.title || "");

const isActiveImage = computed(() => props.selected)

const selectedImage = () => {
    props.editor.commands.setNodeSelection(props.getPos());
}

// 八个点位拖拽修改图片尺寸
const onHandleBtnDrag = (event:MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const currentHandle = event.target as HTMLElement;
    const direction = currentHandle.className.split(" ")[1];

    const startX = event.clientX;
    const startY = event.clientY;
    let startWidth = 0,
        startHeight = 0,
        startLeft = 0,
        startTop = 0;

    if (dragModifiedImageRef.value) {
        const rect = dragModifiedImageRef.value.getBoundingClientRect()
        startWidth = rect.width;
        startHeight = rect.height;
        startLeft = rect.left;
        startTop = rect.top;
    }
    
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
    function resize(event:MouseEvent) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        let width = startWidth,
        height = startHeight,
        left = startLeft,
        top = startTop;
        if (direction.includes("left")) {
            width = startWidth - dx;
            left = startLeft + dx / 2;
        }
        if (direction.includes("right")) {
            width = startWidth + dx;
            left = startLeft + dx / 2;
        }
        if (direction.includes("top")) {
            height = startHeight - dy;
            top = startTop + dy / 2;
        }
        if (direction.includes("bottom")) {
            height = startHeight + dy;
            top = startTop + dy / 2;
        }
        if (width <= 0 || height <= 0) return;

        if (dragModifiedImageRef.value) {
            imageWidth.value = Math.max(100, width);
            imageHeight.value = Math.max(100, height);
            dragModifiedImageRef.value.style.width = imageWidth.value+'px';
            dragModifiedImageRef.value.style.height = imageHeight.value+'px';

            // 调用当前节点updateAttributes
            props.updateAttributes({
                width: imageWidth.value,
                height: imageHeight.value,
            });
        }
    }
    function stopResize() {
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);
    }
}

// 图片上传处理
const handleUpload = async (file: File) => {
    isUploading.value = true;
    try {
        // 替换为实际上传接口
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/upload", { method: "POST", body: formData });
        const { url } = await response.json();

        props.editor.commands.updateImageAttributes({
            src: url,
            width: imageWidth.value,
            height: imageHeight.value,
            isUploading: false,
        });
    } catch (error) {
        console.error("Upload failed:", error);
    } finally {
        isUploading.value = false;
    }
};

// 调整大小逻辑
let startX = 0;
let startY = 0;
let startWidth = 0;
let startHeight = 0;

const startResize = (e: MouseEvent) => {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    startWidth = imageWidth.value;
    startHeight = imageHeight.value;

    const onMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const newWidth = startWidth + deltaX;
        const newHeight = startHeight + deltaY;

        imageWidth.value = Math.max(100, newWidth);
        imageHeight.value = Math.max(100, newHeight);
        // 参数要和自定义image插件属性类型一致才会更新属性值，建议使用style，而不是图片属性宽高
        // 自定义更新方法，本质上是调用当前节点updateAttributes
        // props.editor.commands.updateImageAttributes({
        //   width: width.value,
        //   height: height.value
        // })
        // 调用当前节点updateAttributes
        props.updateAttributes({
            width: imageWidth.value,
            height: imageHeight.value,
        });
    };

    const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
};

// 初始化时处理图片属性
onMounted(() => {
    if (props.node.attrs.file) {
        handleUpload(props.node.attrs.file);
    }
});
</script>
<style lang="scss">
.customize-image {
    position: relative;
    display: inline-block;
    margin: 1rem 0;
}

.image-single__body {
    position: relative;
    display: inline-block;
}

img {
    max-width: 100%;
    height: auto;
    transition: opacity 0.3s;
}

.resize-handle {
    position: absolute;
    right: -8px;
    bottom: -8px;
    width: 16px;
    height: 16px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: nwse-resize;
    opacity: 0;
    transition: opacity 0.2s;
}

.customize-image:hover .resize-handle {
    opacity: 1;
}

.upload-status {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

.drag-modified-image-size {
    border: 2px solid transparent;
    &.image-single__body--actived {
        border: 2px solid var(--theme-color);
    }
}

/* 八个调整大小的控制点样式 */
.resize-handle-btn { 
    position: absolute;
    background: var(--theme-color);
    width: 8px;
    height: 8px;
    z-index: 5;
    font-size: 0;
    border-radius: 50%;
    border: 1px solid #fff;
    box-shadow: 0 0 2px rgba(0,0,0,0.3);
    transition: transform 0.2s ease;
} 
.resize-handle-btn:hover {
    transform: scale(1.2);
    background: var(--theme-color);
}
.top-left {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
}

.top {
    top: -5px;
    left: calc(50% - 5px);
    cursor: ns-resize;
}

.top-right {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
}

.right {
    top: calc(50% - 5px);
    right: -5px;
    cursor: ew-resize;
}

.bottom-right {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
}

.bottom {
    bottom: -5px;
    left: calc(50% - 5px);
    cursor: ns-resize;
}

.bottom-left {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
}

.left {
    top: calc(50% - 5px);
    left: -5px;
    cursor: ew-resize;
}
</style>
