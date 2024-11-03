import { DirectiveBinding, VNode } from "vue";

// 懒加载指令
const LazyLoadDirective = {
    mounted(el:HTMLImageElement, binding:DirectiveBinding) {
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
    },
};

export default LazyLoadDirective
