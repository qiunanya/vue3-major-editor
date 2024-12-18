import { DirectiveBinding, VNode } from 'vue';
import ImageViewerCore from '../components/core';
import { imageViewerApi } from '../index';

const viewerCore = ImageViewerCore.getInStance()
const config = viewerCore.getConfigOptions()
const previewBox = document.createElement('div');
previewBox.style.zIndex = config.zIndex+'';
previewBox.classList.add('image-viewer-vue3__root');

let cusVnode:VNode;
var imageList: string [] = []

const VImageViewer = {
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) {
        // 下面会介绍各个参数的细节
        // console.log(el, binding, vnode, 'created');
        // console.log(binding.arg, binding.value, 'binding')
    },
    // 在元素被插入到 DOM 前调用
    beforeMount(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) {
        // el.style.color = binding.value
        // console.log(el, binding, vnode, 'mounted');
        // console.log(binding.arg, binding.value, 'binding')

        imageList.push(el.src)

        el.addEventListener('click', function(evt) {
            imageViewerApi({
                current: el.src,
                images: imageList,
                zIndex: config.zIndex,
                imageDom: el,
                from: 'directive'
            })
        });
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { },
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { },
    // 绑定元素的父组件卸载后调用
    unmounted(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { }
}

export default VImageViewer