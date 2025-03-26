import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

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
export const ExtBackgroundColor = Extension.create<ColorOptions>({
  name: 'backgroundColor',

  addOptions() {
    return {
        types: ['textStyle'],
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