// 系统快捷键配置
import hotkeys from 'hotkeys-js';

type hotkeyOptions = {
    [key:string]:any;
}

// 设置快捷键时不能和浏览器的快捷键冲突，否则无效
export const useCusShortKey = (keysMap:hotkeyOptions) => {
    Object.keys(keysMap).forEach(key => {
        hotkeys(key, { keyup: false, keydown: true }, keysMap[key])
    })
}