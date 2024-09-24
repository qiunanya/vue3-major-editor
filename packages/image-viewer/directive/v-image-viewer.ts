import { h, render } from 'vue';
import ImageViewerUI from '../src/index.vue'
const previewBox = document.createElement('div');
previewBox.classList.add('viewer-box');
let cusVnode;
const VImageViewer = {
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el, binding, vnode) {
        // 下面会介绍各个参数的细节
        // console.log(el, binding, vnode, 'created');
        // console.log(binding.arg, binding.value, 'binding')
    },
    // 在元素被插入到 DOM 前调用
    beforeMount(el, binding, vnode) { },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el, binding, vnode) {
        // el.style.color = binding.value
        // console.log(el, binding, vnode, 'mounted');
        // console.log(binding.arg, binding.value, 'binding')

        el.addEventListener('click', function(evt) {
            cusVnode = h(ImageViewerUI, {
                visible: true,
                current: el.src,
                onClose: () => {
                    // console.log(cusVnode, 'cusVnode')
                    el.removeEventListener('click', () => {});
                    document.body.removeChild(previewBox);
                    cusVnode=null
                }
            })
            render(cusVnode, previewBox);
            document.body.appendChild(previewBox)
        });
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate(el, binding, vnode, prevVnode) { },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el, binding, vnode, prevVnode) { },
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el, binding, vnode) { },
    // 绑定元素的父组件卸载后调用
    unmounted(el, binding, vnode) { }
}

export default VImageViewer