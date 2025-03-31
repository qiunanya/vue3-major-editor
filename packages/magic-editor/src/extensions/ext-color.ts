import { Editor } from '@tiptap/core';
import TiptapColor from '@tiptap/extension-color';
import { COLOR_DEFAULT } from '@/utils/color';
import ColorPopover from '@/components/color/ColorPopover.vue';
import TextStyle from '@tiptap/extension-text-style';

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
});

export { ExtColor };