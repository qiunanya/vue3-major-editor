import { h, render, DirectiveBinding, VNode, ref, nextTick } from 'vue';
import ImageViewerUI from '../components/index.vue';
import ImageViewerCore from '../components/core';

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
            // 初始化 cusVnode，只创建一次
            cusVnode = h(ImageViewerUI, {
                visible: true,
                current: el.src,
                zIndex: config.zIndex,
                images: imageList,
                image: el,
                from: 'directive',
                onUpdateCurrent: (item:string, index:number) => {
                    
                },
                onClose: () => {
                    // console.log(cusVnode, 'cusVnode')
                    el.removeEventListener('click', () => {});
                    document.body.removeChild(previewBox);
                }
            })
            
            render(cusVnode, previewBox);
            document.body.appendChild(previewBox)
        });
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) {
        
    },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { },
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { },
    // 绑定元素的父组件卸载后调用
    unmounted(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { }
}

export default VImageViewer