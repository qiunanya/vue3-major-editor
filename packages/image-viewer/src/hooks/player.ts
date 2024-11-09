import { nextTick, onMounted, ref } from 'vue'
import type { Ref } from 'vue'


/**
 * 自动播放图片 hooks
 */
const AUTO_PLAY_TIME = 2000

export function usePlayer (activeIndex: Ref<number>, images: any, imageRef: Ref<HTMLImageElement|null>, callBack:Function=()=>{}, playSpeed:number) {
    // 自动播放
    const timer:Ref = ref<NodeJS.Timeout | null>(null);
    const playState:Ref = ref(false)
    const scrollItemNavRef:Ref = ref<HTMLElement | null>(null)

    const autoPlay = () => {
        if (!scrollItemNavRef.value) return

        playState.value = true
        
        timer.value = setInterval(() => {
            updateRender()
        }, playSpeed || AUTO_PLAY_TIME);
    }

    // 更新视图
    const updateRender = () => {
        nextTick().then(res => {
            // 如果是最后一张图片，停止播放
            if (activeIndex.value === images.length - 1) {
                stopPlay()
            } else {
                activeIndex.value++;
                // 更新导航图片选中状态
                scrollItemNavRef.value.scrollTo(activeIndex.value)
                // 重新渲染当前图片
                const CURRENT_SRC = images[activeIndex.value] || 0
                imageRef.value&&(imageRef.value.src = CURRENT_SRC)
                // 通知外部引用组件，当前图片信息
                callBack&&callBack({ image: CURRENT_SRC, index: activeIndex.value })
                // console.log('启用定时器：',  timer.value)
            }
        })
    }
    
    // 停止播放
    function stopPlay () {
        playState.value = false
        if (timer.value !== null) {
            clearInterval(timer.value)
            // 重置定时器为null，防止重复执行无效清除代码 clearInterval(timer.value)
            timer.value = null
            // console.log('删除定时器:', timer.value)
        }
    }

    // 快捷键控制播放
    const hotKeyAutoPlay = () => {
        if (playState.value) {
            stopPlay()
        } else {
            autoPlay()
        }
    }

    return {
        timer,
        scrollItemNavRef,
        playState,
        autoPlay,
        stopPlay,
        hotKeyAutoPlay
    }
}