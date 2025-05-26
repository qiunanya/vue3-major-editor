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
<template>
<TiptapEditorVue3
    ref="vue3TiptapEditorRef" 
    v-model:content="htmlContent" 
    :imageInner="imageInner"
    :isEnable="true"
    :isShowToolbar="true"
    @onUploadImage="onUploadImage">
</TiptapEditorVue3>
</template>
```
```js
// 引入组件
import { TiptapEditorVue3 } from "tiptap-editor-vue3";

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
