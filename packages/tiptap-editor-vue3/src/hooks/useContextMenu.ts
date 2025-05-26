import { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
// 统一处理编辑器右键菜单
export const useContextMenu = (editor:Editor) => {

    const contextMenuRef = ref<{open: ({ left, top, e }:{left:number;top:number, e:MouseEvent}) => {}} | null>(null)

    const onContextmenu = (event:MouseEvent) => {
        event.preventDefault()
        // 获取选中文本
        const { from, to } = editor.state.selection;
        // 获取光标所在屏幕坐标，这个坐标显示右键菜单会导致不精准，因为光标始终保持在一个开始位置，而不是点击位置
        // 更换点击坐标来显示菜单
        const coords = editor.view.coordsAtPos(from);
        // console.log('table:', editor.isActive('table'))
        // console.log('tableHeader:', editor.isActive('tableHeader'))
        // console.log('tableCell:', editor.isActive('tableCell'))
        // console.log('tableRow:', editor.isActive('tableRow'))
        if (contextMenuRef.value && editor.isActive("table")) {
            // 处理其他业务
            contextMenuRef.value.open({e:event,left:event.clientX, top: event.clientY})
        }
    }

    return {
        contextMenuRef,
        onContextmenu
    }
}