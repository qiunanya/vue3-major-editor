import { createDiscreteApi } from "naive-ui";

/**
 * 挂载 Naive-ui 脱离上下文的 API
 * 如果你想在 setup 外使用 useDialog、useMessage、useNotification、useLoadingBar，可以通过 createDiscreteApi 来构建对应的 API。
 * https://www.naiveui.com/zh-CN/dark/components/discrete
 */

export const useNaiveDiscrete = () => {
    const { 
        message, 
        dialog, 
        notification, 
        loadingBar,
        modal 
    } = createDiscreteApi(
            ["message", "dialog", "notification", "loadingBar", 'modal']
        );
    
    return {
        message,
        dialog,
        notification,
        loadingBar,
        modal
    }
}
