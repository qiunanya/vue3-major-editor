import { DirectiveBinding, VNode } from "vue";

function updateImagePath (el:HTMLImageElement, binding:DirectiveBinding) {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 当图片进入视口时，加载图片
                    el.src = binding.value;
                    observer.unobserve(el);
                }
            });
        },
        {
            rootMargin: "0px",
            threshold: 0.1, // 图片进入视口的10%时开始加载
        }
    );
    observer.observe(el);
}

// 懒加载指令
const LazyLoadDirective = {
    mounted(el:HTMLImageElement, binding:DirectiveBinding) {
        updateImagePath(el, binding)
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { 
        updateImagePath(el, binding)
    },
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { },
    // 绑定元素的父组件卸载后调用
    unmounted(el:HTMLImageElement, binding:DirectiveBinding, vnode:VNode) { }
};

export default LazyLoadDirective
