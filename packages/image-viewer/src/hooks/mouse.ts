import { nextTick, onMounted, ref } from 'vue'

export function useMouse () {
    const isMouseDown = ref(false)
    const startX = ref(0)
    const scrollLeft = ref(0)

    const vnodeScrollDom = ref<HTMLElement | null>(null)
    function onMouseDown (evt:MouseEvent) {
        isMouseDown.value = true
        vnodeScrollDom.value = document.querySelector('.vnode-scroll__wrap')
        if (vnodeScrollDom.value) {
            startX.value = evt.clientX - vnodeScrollDom.value.offsetLeft;
            scrollLeft.value = vnodeScrollDom.value.scrollLeft
            vnodeScrollDom.value.style.cursor = 'grabbing';
            evt.preventDefault();
        }
    }

    function onMouseMove (evt:MouseEvent) {
        if (!isMouseDown.value) return 
        if (vnodeScrollDom.value) {
            const x = evt.clientX - vnodeScrollDom.value.offsetLeft;
            // *2 增加拖动的滚动速度
            const walk = (x - startX.value) * 2; 
            vnodeScrollDom.value.scrollLeft = scrollLeft.value - walk;
        }
    }

    function onMouseUp(evt:Event) {
        isMouseDown.value = false
        if (vnodeScrollDom.value) {
            vnodeScrollDom.value.style.cursor = 'default';
        }
    }

    function onMouseLeave (evt:Event) {
        isMouseDown.value = false
        if (vnodeScrollDom.value) {
            vnodeScrollDom.value.style.cursor = 'grab';
        }
    }

    return {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
    }
}