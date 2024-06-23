import { Extension, Command, CommandProps } from "@tiptap/core";

export interface LineHeightOptions {
    lineHeight: number | string;
    types: string[]
}

const LineHeightExtension = Extension.create<LineHeightOptions>({
    name: "lineHeight",
    addOptions() {
        return {
            types: ["paragraph", "heading"],
            lineHeight: 1.5
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: "1.5",
                        parseHTML: (element) =>
                            element.style.lineHeight.replace(/"/g, ""),
                        renderHTML: (attributes) => {
                            if (!attributes.lineHeight) {
                                return {};
                            }
                            return {
                                style: `line-height: ${attributes.lineHeight}`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setLineHeight:
                (lineHeight: string | number): Command =>
                ({ chain }: CommandProps) => {
                    return chain()
                        .updateAttributes("paragraph", { lineHeight })
                        .updateAttributes("heading", { lineHeight })
                        .run();
                },
        };
    },
});

export default LineHeightExtension;
