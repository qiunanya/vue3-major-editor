import { Editor, getMarkRange } from '@tiptap/core';
import TiptapColor from '@tiptap/extension-color';
import { COLOR_DEFAULT } from '@/utils';
import ColorPopover from '@/components/color/ColorPopover.vue';
import TextStyle from '@tiptap/extension-text-style';
import { Plugin, TextSelection, PluginKey } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'

// 访问 ProseMirror API 示例
const ExtColor = TiptapColor.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      onClick:({ editor, t }: { editor: Editor; t: (...args: any[]) => string }) => {
        return {
          component: ColorPopover,
          componentProps: {
            editor,
            isActive: editor.isActive('color'),
            colors: COLOR_DEFAULT,
            isReadonly: !editor.isEditable,
            tipText: '字体颜色',
          },
        };
      },
    };
  },

  addExtensions() {
    return [TextStyle];
  },
  addProseMirrorPlugins() {
    // 访问内部实例
    const editor = this.editor
    return [
      new Plugin({
        key: new PluginKey('eventHandler'),
        props: {
          handleClick(view:EditorView, pos:number, event:MouseEvent) {
            
            const { schema, doc, tr } = view.state;
            // console.log('文本单击事件触发了', this, view, pos, event)
            // const range = getMarkRange(doc.resolve(pos), schema.marks.link);
            // console.log(range, 2222)
            // if (!range) return false;

            // const $start = doc.resolve(range.from);
            // const $end = doc.resolve(range.to);

            // const transaction = tr.setSelection(
            //   new TextSelection($start, $end)
            // );

            // view.dispatch(transaction);
            
            // return true;
          },
          handleDoubleClick(view, pos, event) {
            /* … */
          },
          handlePaste(view, event, slice) {
            /* … */
          },
          // … and many, many more.
          // Here is the full list: https://prosemirror.net/docs/ref/#view.EditorProps
        },
      })
    ]
  },
});

export { ExtColor };