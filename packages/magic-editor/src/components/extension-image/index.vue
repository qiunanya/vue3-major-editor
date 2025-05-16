<template>
<node-view-wrapper class="customize-image">
    <div class="image-container">
        <img
            :src="src"
            :alt="alt"
            :style="{ width: width+'px', height: height+'px' }"
            ref="imageElement"
        />
        <div v-if="isUploading" class="upload-status">上传中...</div>
        <div class="resize-handle" @mousedown="startResize"></div>
    </div>
</node-view-wrapper>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, defineEmits } from "vue";
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
// console.log(props.editor.commands.updateImageAttributes, 4444)
const imageElement = ref<HTMLImageElement>();
const isUploading = ref(false);
const width = ref(props.node.attrs.width || 400);
const height = ref(props.node.attrs.height || 300);
const src = ref(props.node.attrs.src || "");
const alt = ref(props.node.attrs.alt || "");

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
            width: width.value,
            height: height.value,
            isUploading: false,
        });
    } catch (error) {
        console.error("Upload failed:", error);
    } finally {
        isUploading.value = false;
    }
};
// 调整大小逻辑
let startX = 0
let startY = 0
let startWidth = 0
let startHeight = 0

const startResize = (e: MouseEvent) => {
  e.preventDefault()
  startX = e.clientX
  startY = e.clientY
  startWidth = width.value
  startHeight = height.value

  const onMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY
    const newWidth = startWidth + deltaX
    const newHeight = startHeight + deltaY
    
    width.value = Math.max(100, newWidth)
    height.value = Math.max(100, newHeight)
    // 参数要和自定义image插件属性类型一致才会更新属性值，建议使用style，而不是图片属性宽高
    props.editor.commands.updateImageAttributes({
      width: width.value,
      height: height.value
    })
    console.log(width.value, height.value, 7987)
  }


  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// 初始化时处理图片属性
onMounted(() => {
  if (props.node.attrs.file) {
    handleUpload(props.node.attrs.file)
  }
})
</script>
<style>
.customize-image {
  position: relative;
  display: inline-block;
  margin: 1rem 0;
}

.image-container {
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
</style>
