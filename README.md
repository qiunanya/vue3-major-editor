## vue3-tiptap-editor 

vue3-tiptap-editor是基于最新tiptap框架开发的vue3富文本组件，非法内容过滤以及防止XSS攻击、插入图片、插入表格等功能。

### 功能清单
* 撤回/重做；
* 清空文档；
* 加粗；
* 斜体；
* 字体背景色和字体颜色；
* 下划线；
* 删除线；
* 代码背景块和代码块；
* 引用；
* 上标和下标；
* 链接；
* 有序列表；
* 无序列表；
* 水平分割线；
* 标题；
* 段落间距；
* 任务列表；
* 插入图片；
* 插入表格，表格列和行操作；
....待开发更多功能....


### 安装
```js
pnpm add vue3-tiptap-editor
-or-
yarn add vue3-tiptap-editor
-or-
npm install vue3-tiptap-editor
```

### 配置说明
```js
<template>
<Vue3TiptapEditor
    ref="vue3TiptapEditorRef" 
    v-model:content="htmlContent" 
    :imageInner="imageInner"
    :isEnable="true"
    :isShowToolbar="true"
    @onUploadImage="onUploadImage">
</Vue3TiptapEditor>
</template>
```
```js
// 引入组件
import { Vue3TiptapEditor } from "vue3-tiptap-editor";

interface Vue3TiptapEditorOptions {
    getHTML: () => string
    getJSON: () => object
    getTEXT: () => string
}

const vue3TiptapEditorRef = ref<Vue3TiptapEditorOptions | null>(null)
// const htmlContent = ref(`<p>欢迎使用vue3-tiptap-editor编辑器 🎉</p>欢迎订阅交流,<img src='https://placehold.co/800x400'/>`)
const htmlContent = ref(`
    <p>欢迎使用vue3-tiptap-editor编辑器 🎉</p>欢迎订阅交流,
    <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>
    <a href="https://www.baidu.con">66666</a>`)

// 仅支持base64和URL两种模式
const onUploadImage = ({ file, formData, editor }:{ file:FileList, formData:FormData, editor: Editor }) => {
    for (let i = 0; i < file.length; i++) {
        if (file[i]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target?.result as string;
                editor.commands.setImage({ src: base64 });
            };
            reader.readAsDataURL(file[i]);
        }
    }
    console.log(file, formData, editor, 'onUploadImage');
    
}
// 获取HTML
function getHtml() {
    if (vue3TiptapEditorRef.value) {
        console.log(vue3TiptapEditorRef.value.getHTML(), 'HTML');
    }
}
// 获取json
function getJson() {
    if (vue3TiptapEditorRef.value) {
        console.log(vue3TiptapEditorRef.value.getJSON(), 'JSON');
    }
}
// 获取Text
function getText() {
    if (vue3TiptapEditorRef.value) {
        console.log(vue3TiptapEditorRef.value.getTEXT(), 'TEXT');
    }
}
```
