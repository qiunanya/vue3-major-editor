import { Extension } from "@tiptap/core";
import { Editor } from "@tiptap/vue-3";
import TextLineHeightPopselect from '@/components/text/TextLineHeightPopselect.vue';

const lineHeighList = [
    {
        label: "1",
        value: "1",
    },
    {
        label: "1.5",
        value: "1.5",
    },
    {
        label: "1.6",
        value: "1.6",
    },
    {
        label: "1.75",
        value: "1.75",
    },
    {
        label: "2",
        value: "2",
    },
    {
        label: "3",
        value: "3",
    },
    {
        label: "4",
        value: "4",
    },
];
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        CusLineHeightExt: {
           /**
             * Set the line height attribute
             * @param lineHeight The line height
             * @example editor.commands.setLineHeight('1.5')
             */
            setLineHeight: (lineHeight: string | number) => ReturnType;
            /**
             * Unset the line height attribute
             * @example editor.commands.unsetLineHeight()
             */
            unsetLineHeight: () => ReturnType;
        };
    }
}

export interface LineHeightOptions {
    /**
     * The types where the line height attribute can be applied.
     * @default []
     * @example ['heading', 'paragraph']
     */
    types: string[]

    /**
     * The parameter which are allowed.
     * @default ['1', '1.5', '1.6', '1.75', '2', '3', '4', '5']
     * @example ['1', '1.5', '1.6']
     */
    parameter: string[],

    /**
     * The default lineHeight
     * @default '1.5'
     * @example '1.7'
     */
    defaultValue: string,
}

export const ExtensionLineHeight = Extension.create<LineHeightOptions>({
    name: "lineHeight",
    addOptions() {
        return {
            ...this.parent?.(),
            types: ["paragraph", "heading"],
            parameter: ['1', '1.5', '1.6', '1.75', '2', '3', '4', '5'], 
            defaultValue: '1.5',
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: TextLineHeightPopselect,
                    componentProps: {
                        isActive: editor.isActive('lineHeight'),
                        isReadonly: !editor.isEditable,
                        editor,
                        lineHeightOptions: lineHeighList,
                        tipText: '行间距',
                        command: (alignment:string) => {
                            editor.commands.setLineHeight(alignment)
                        }
                    }
                }
            }
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: this.options,
                        parseHTML: (element) =>
                            element.style.lineHeight.replace(/"/g, ""),
                        renderHTML: (attributes) => {
                            if (attributes && attributes.lineHeight && attributes.lineHeight.defaultValue) {
                                return {};
                            }
                            if (attributes.lineHeight == '') {
                                return {}
                            }
                            return {
                                style: `line-height: ${attributes.lineHeight};`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setLineHeight: (lineHeightVal: string | number) => ({ commands }) => {
                const linehv = lineHeightVal as string;
                if (!this.options.parameter.includes(linehv)) {
                    return false
                }
                // execute the command successfully returns true 
                const OptionsLine = this.options.types.map(type => commands.updateAttributes(type, { lineHeight: linehv })).every(res => res)
                return OptionsLine
            },
            unsetLineHeight: () => ({ commands }) => {
                // execute the command successfully returns true 
                const OptionsLine = this.options.types.map(type => commands.resetAttributes(type, 'lineHeight')).every(res => res)
                return OptionsLine
            }
        }
    }
});
