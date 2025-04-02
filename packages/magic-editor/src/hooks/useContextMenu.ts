import { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
// 统一处理编辑器右键菜单
export const useContextMenu = (editor:Editor) => {

    const contextMenuRef = ref<{open: ({ left, top, e }:{left:number;top:number, e:MouseEvent}) => {}} |null>(null)

    const onContextmenu = (event:MouseEvent) => {
        event.preventDefault()
        const { from, to } = editor.state.selection;
        // 2. 获取光标所在屏幕坐标
        const coords = editor.view.coordsAtPos(from);
        if (contextMenuRef.value && editor.isActive("table")) {
            // 处理其他业务
            contextMenuRef.value.open({e:event,left:coords.left, top: coords.top})
        }
    }

    return {
        contextMenuRef,
        onContextmenu
    }
}