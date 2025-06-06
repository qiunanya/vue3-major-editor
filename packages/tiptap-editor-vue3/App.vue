<template>
    <div class="app_wrapper">
        <section class="cus-header">
            <h2 class="h2" style="margin-right: 0.2em;">TiptapEditorVue3</h2>
            <a href="https://github.com/qiunanya/vue3-major-editor.git" target="_blank">
                <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
            </a>
            <button style="margin: 0 10px;" @click="getHtml">获取 HTML</button>
            <button style="margin-right:10px;" @click="getJson">获取 Json</button>
            <button style="margin-right:10px;" @click="getText">获取 Text</button>
            <button style="margin-right:10px;" @click="previews">预览</button>
        </section>

        <TiptapEditorVue3
            ref="vue3TiptapEditorRef" 
            v-model:content="htmlContent" 
            :isEnable="true"
            customFileUpload
            @onUpdate="onUpdate"
            @onUploadImage="onUploadImage">
        </TiptapEditorVue3>
    </div>
    <n-drawer v-model:show="isVisible" :width="502" placement="right">
        <n-drawer-content title="预览" closable>
            <div v-html="previewContent"></div>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
    import { onBeforeUnmount, ref } from "vue";
    import { Editor, HTMLVue3TiptapEditorElement } from "./src";
    import { NDrawerContent, NDrawer } from "naive-ui";

    const isVisible = ref(false)
    const previewContent = ref('')

    const vue3TiptapEditorRef = ref<HTMLVue3TiptapEditorElement | null>(null)
    const htmlContent = ref(`<p>欢迎使用vue3-tiptap-editor编辑器 🎉</p>欢迎订阅交流,<img src='https://placehold.co/800x400'/>`)
    // const htmlContent = ref(`<img src=x onerror=alert(1)//>`)

    // 仅支持base64和URL两种模式
    const onUploadImage = ({ file, editor }:{ file: FileList, editor: Editor }) => {
        const formData = new FormData()
        // 此处可以自定义上传图片逻辑，这里需要调用 editor.commands.insertCustomImage 来插入图片
        for (let i = 0; i < file.length; i++) {
            if (file[i]) {
                formData.append('file', file[i])
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target?.result as string;
                    const image = new Image()
                    image.src = base64
                    image.onload = () => {
                        // 图片加载完成后再插入，记得传入图片宽高
                        editor.commands.insertCustomImage({ 
                            src: base64, 
                            alt: '占位图片', 
                            width: image.width, 
                            height: image.height,
                            title: file[i].name 
                        });
                    }
                    
                    // 监听错误事件
                    image.onerror = () => {
                        console.error('图片加载失败');
                    }
                }

                reader.readAsDataURL(file[i])
            }
        }
    }

    function getHtml() {
        if (vue3TiptapEditorRef.value) {
            console.log(vue3TiptapEditorRef.value.getHTML(), 'HTML');
        }
    }
    function getJson() {
        if (vue3TiptapEditorRef.value) {
            console.log(vue3TiptapEditorRef.value.getJSON(), 'JSON');
        }
    }
    function getText() {
        if (vue3TiptapEditorRef.value) {
            console.log(vue3TiptapEditorRef.value.getTEXT(), 'TEXT');
        }
    }
    function previews() {
        if (!vue3TiptapEditorRef.value) return
        previewContent.value = vue3TiptapEditorRef.value.getHTML()
        isVisible.value = !isVisible.value
    }

    const onUpdate = (val:Editor) => {
        // console.log("update:",val.getHTML())
        console.log("update")
    }

    onBeforeUnmount(() => {
        vue3TiptapEditorRef.value&&vue3TiptapEditorRef.value.destroy()
    })
</script>

<style lang="scss">
.n-dialog.n-modal {
    width: 600px;
}
.app_wrapper {
    padding:15px;
    .h2 {
        margin: 5px 0;
        color: #646cff;
    }
    .cus-header {
        display: flex;
        align-items: center;
    }
}
</style>