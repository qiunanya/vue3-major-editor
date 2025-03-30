import { Extension } from "@tiptap/core";
import ButtonIcon from '../components/ButtonIcon.vue'
import { Editor } from "@tiptap/vue-3";
import { useNaiveDiscrete } from "../hooks/navie-ui"

const { message, dialog } = useNaiveDiscrete()
const ExtClear = Extension.create({
    name: "clear",
    addOptions() {
        return {
           ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ButtonIcon,
                    componentProps: {
                        isActive: editor.isActive('clear'),
                        isReadonly: !editor.isEditable,
                        icons: 'clear-icon',
                        tipText: '清空文档',
                        command: () => {
                            dialog.warning({
                                title: "警告",
                                content: "你确定要清空全部文档内容吗？",
                                positiveText: "确定",
                                negativeText: "取消",
                                maskClosable: false,
                                onPositiveClick: () => {
                                    editor.commands.clearContent()
                                },
                                onMaskClick: () => {
                                    // message.success('不能关闭')
                                },
                                onEsc: () => {
                                    // message.success('通过 esc 关闭')
                                },
                            });
                        }
                    }
                }
            }
        };
    }
});

export { ExtClear }
