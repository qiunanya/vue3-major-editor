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
        <h2 class="h2" style="margin-right: 0.2em;">Vue3TiptapEditor</h2>
        <button style="margin: 0 10px;" @click="getHtml">获取HTML</button>
        <button style="margin-right:10px;" @click="getJson">获取Json</button>
        <button style="margin-right:10px;" @click="getText">获取Text</button>
    </section>
    <TiptapEditorVue3
         ref="vue3TiptapEditorRef" 
         v-model:content="htmlContent"
         isEnable
         customFileUpload
         isShowToolbar
         @onUploadImage="onUploadImage">
    </TiptapEditorVue3>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { Editor, EditorEvents } from "@tiptap/vue-3";

    interface FileOpions {
        file: FileList
        editor: Editor
    }

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

    // 仅支持base64和URL两种模式
    const onUploadImage = ({ file, editor }:FileOpions) => {
        const formData = new FormData()
        // 此处可以自定义上传图片逻辑，这里需要调用 editor.commands.insertCustomImage 来插入图片
        for (let i = 0; i < file.length; i++) {
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
</script>

<style lang="scss">
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
```

### 传递参数

| 参数             | 类型    | 描述                                                    |
| ---------------- | ------- | ------------------------------------------------------- |
| isEnable         | boolean | 启用编辑器                                              |
| isShowToolbar    | boolean | 启用工具栏                                              |
| characterCount   | number  | 字数提示                                                |
| customFileUpload | boolean | 自定义上传，开启后通过onUploadImage事件监听上传文件内容 |
| placeholder      | string  | 输入提示文本                                            |

