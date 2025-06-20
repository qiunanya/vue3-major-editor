## vue3-tiptap-editor 

vue3-tiptap-editor是基于最新tiptap框架开发的vue3富文本组件，非法内容过滤以及防止XSS攻击、插入图片、插入表格等功能。

### 功能清单
- [x] 撤回/重做"
- [x] 清空文档
- [x] 加粗
- [x] 斜体
- [x] 字体背景色和字体颜色
- [x] 下划线
- [x] 删除线
- [x] 代码背景块和代码块
- [x] 引用
- [x] 上标和下标
- [x] 链接
- [x] 有序列表
- [x] 无序列表
- [x] 水平分割线
- [x] 标题
- [x] 段落间距
- [x] 任务列表
- [x] 插入图片
- [x] 插入表格，表格列和行操作

....待开发更多功能....


### 安装
```js
pnpm add tiptap-editor-vue3
-or-
yarn add tiptap-editor-vue3
-or-
npm install tiptap-editor-vue3
```

### 配置说明
```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// 引入组件
import TiptapEditorVue3 from "tiptap-editor-vue3";
import "tiptap-editor-vue3/dist/es/css/style.css";

const app = createApp(App)
app.use(TiptapEditorVue3)
app.use(router)

app.mount("#app")


```
### 使用组件

```vue
<template>
    <div class="app_wrapper">
        <section class="cus-header">
            <h2 class="h2" style="margin-right: 0.2em;">TiptapEditorVue3</h2>
            <a href="https://github.com/qiunanya/vue3-major-editor.git" target="_blank">
                <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
            </a>
            <button style="margin: 0 10px;" @click="getHtml">获取HTML</button>
            <button style="margin-right:10px;" @click="getJson">获取Json</button>
            <button style="margin-right:10px;" @click="getText">获取Text</button>
            <button style="margin-right:10px;" @click="previews">预览</button>
            <button style="margin-right:10px;" @click="router.go(-1)">返回</button>
        </section>
        <!-- v-model:content="htmlContent" -->
        <TiptapEditorVue3
            ref="vue3TiptapEditorRef" 
            v-model:content="htmlContent" 
            :customFileUpload="customFileUpload"
            :isEnable="true"
            :extensions="extensions"
            :isShowToolbar="true"
            @onUploadImage="onUploadImage">
        </TiptapEditorVue3>

        <n-drawer v-model:show="isVisible" :width="502" placement="right">
            <n-drawer-content title="预览" closable>
                <div v-html="previewContent"></div>
            </n-drawer-content>
        </n-drawer>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { NDrawerContent, NDrawer } from "naive-ui";
    import { AnyExtension, Editor, ExtensionBold, ExtensionItalic } from "tiptap-editor-vue3"
    import { useRouter } from 'vue-router'

    const router = useRouter();
    // true:不自动转化数据，需要外部处理后添加到编辑器, false: 图片内部处理，默认转化为base64
    const customFileUpload = ref(true)
    const isVisible = ref(false)
    const previewContent = ref('')
    // 自定义工具栏，不需要可以不用传递参数即可显示全部工具栏
    const extensions = ref<AnyExtension[]>([ExtensionBold, ExtensionItalic])
    // 按需引入Button组件
    // import { Button } from '@majoreditor/ui'

    interface Vue3TiptapEditorOptions {
        getHTML: () => string
        getJSON: () => object
        getTEXT: () => string
    }

    const vue3TiptapEditorRef = ref<Vue3TiptapEditorOptions | null>(null)
    const htmlContent = ref(`
        <p>欢迎使用vue3-tiptap-editor编辑器 🎉</p>欢迎订阅交流,
        <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>
        <a href="https://www.baidu.con">66666</a>`)

    interface FileOpions {
        file: FileList
        editor: Editor
    }

    // 仅支持base64和URL两种模式
    const onUploadImage = ({ file, editor }:FileOpions) => {
        console.log(editor, 3333)
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
</script>
```

### 组件传递参数

| 参数             | 类型    | 描述                                                    |
| ---------------- | ------- | ------------------------------------------------------- |
| isEnable         | boolean | 启用编辑器                                              |
| isShowToolbar    | boolean | 启用工具栏                                              |
| characterCount   | number  | 字数提示                                                |
| customFileUpload | boolean | 自定义上传，开启后通过onUploadImage事件监听上传文件内容 |
| extensions      | AnyExtension[] | 自定义工具栏，比如加粗，倾斜等到                    |
| placeholder      | string  | 输入提示文本                                            |


### 工具栏清单
- ExtensionHistory 撤回/重做
- ExtensionBold  加粗
- ExtensionItalic 倾斜
- ExtensionStrike 删除线
- ExtensionUnderline 下划线
- ExtensionHighlight 高亮
- ExtensionColor 颜色
- ExtensionBackgroundColor 背景颜色
- ExtensionHeading 标题
- ExtensionTextAlign 对齐方式
- ExtensionLineHeight 行高
- ExtensionCode 代码背景
- ExtensionCodeBlockLowlight 代码块
- ExtensionSubscript 上标
- ExtensionSuperscript 下标
- ExtensionOrderedList 有序列表
- ExtensionBulletList 无序列表
- ExtensionHorizontalRule 水平线
- ExtensionBlockquote 引用
- ExtensionTable 表格
- ExtensionLink 链接
- ExtensionImage 图片
- ExtensionTaskItem 任务列表
- ExtensionClear 清空文档内容
