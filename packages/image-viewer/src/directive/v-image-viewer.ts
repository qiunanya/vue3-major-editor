import { DirectiveBinding, VNode } from 'vue';
import ImageViewerCore from '../utils/ViewerCore';
import { imageViewerApi } from '../index';
import { v4 as uuidV4 } from 'uuid';

const viewerCore = ImageViewerCore.getInStance()
const config = viewerCore.getConfigOptions()
var imageList: string [] = []
type ImageType = {
    key: string,
    url: string,
    index: number
}
var originImage:ImageType[] = []

let counter=0

function updateOriginImage (el:HTMLImageElement) {
    const elKey = el.getAttribute('data-key') as string
    const elIndex = el.getAttribute('data-index')
    const findIndex = originImage.findIndex(el => el.key === elKey)
    if (findIndex !== -1) {
        originImage[findIndex].url = el.src
    } else originImage.push({ key:elKey, url: el.src, index: Number(elIndex) })
}

// 重组照片列表，去空，排序
function setImageList () {
    const tempData = originImage.sort((a,b) => { return a.index - b.index }).map(el => el.url).filter(el => el)
    return tempData
}

const VImageViewer = {
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) {},
    // 在元素被插入到 DOM 前调用
    beforeMount(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) {
        // 页面加载完成时，需要绑定唯一key，避免更新找不到对应的src
        const dataKey = el.getAttribute('data-key')
        !dataKey&&el.setAttribute('data-key', uuidV4())
        el.setAttribute('data-index',`${counter++}`)
        
        // 此时获取不到懒加载指令绑定的img的src，是空值，
        // if (el.src) {
        //     imageList.push(el.src)
        // }

        if (el.src) {
            updateOriginImage(el)
        }

        // 解决：动态监听src变化，当手动更新img的src时，也会触发
        const observer = new MutationObserver(() => {
            if (el.src) {
                // 只在src有值时添加
                updateOriginImage(el) 
                // 停止观察
                observer.disconnect(); 
            }
        });
    
        // 观察src属性的变化
        observer.observe(el, { attributes: true, attributeFilter: ['src'] });

        el.addEventListener('click', function(evt) {
            imageViewerApi({
                specifyIndex: Number(el.getAttribute('data-index')),
                current: el.src,
                // images: imageList,
                images: setImageList(),
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
    updated(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { 
        // 动态监听src变化，当手动更新img的src时，也会触发
        const observer = new MutationObserver(() => {
            // 只在src有值时添加
            if (el.src) {
                updateOriginImage(el)
                // 停止观察
                observer.disconnect()
            }
        })
    
        // 观察src属性的变化
        observer.observe(el, { attributes: true, attributeFilter: ['src'] })
    },
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { },
    // 绑定元素的父组件卸载后调用
    unmounted(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { }
}

export default VImageViewer