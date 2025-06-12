import '@tiptap/extension-text-style'
// import ButtonIcon from '../components/ButtonIcon.vue'
import BackgroundColorPopover from '@/components/color/BackgroundColorPopover.vue'
import { Extension } from '@tiptap/core'
import { Editor } from '@tiptap/vue-3'
import { COLOR_DEFAULT } from '@/utils';

export type ColorOptions = {
  /**
   * The types where the backgroundColor can be applied
   * @default ['textStyle']
   * @example ['heading', 'paragraph']
  */
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    backgroundColor: {
        /**
         * Set the text color
         * @param color The color to set
         * @example editor.commands.setBackgroundColor('red')
         */
        setBackgroundColor: (color: string) => ReturnType,

        /**
         * Unset the text color
         * @example editor.commands.unsetBackgroundColor()
         */
        unsetBackgroundColor: () => ReturnType,
    }
  }
}

/**
 * This extension allows you to backgroundColor your text.
 */
export const ExtensionBackgroundColor = Extension.create<ColorOptions>({
  name: 'extensionBackgroundColor',

  addOptions() {
    return {
      ...this.parent?.(),
        types: ['textStyle'],
        onClick: ({ editor }:{editor:Editor}) => {
            return {
                component: BackgroundColorPopover,
                componentProps: {
                    isActive: editor.isActive('extensionBackgroundColor'),
                    isReadonly: !editor.isEditable,
                    icons: 'bold-icon',
                    colors: COLOR_DEFAULT,
                    tipText: '字体背景色',
                }
            }
        }
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
            backgroundColor: {
            default: null,
            parseHTML: element => element.style.backgroundColor?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
                if (!attributes.backgroundColor) {
                    return {}
                }

                return {
                    style: `background-color: ${attributes.backgroundColor}`,
                }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
        setBackgroundColor: color => ({ chain }) => {
            return chain()
            .setMark('textStyle', { backgroundColor:color })
            .run()
        },
        unsetBackgroundColor: () => ({ chain }) => {
            return chain()
            .setMark('textStyle', { backgroundColor: null })
            .removeEmptyTextStyle()
            .run()
        },
    }
  },
})