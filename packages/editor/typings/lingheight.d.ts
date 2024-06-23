import "@tiptap/core";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        LineHeightExtension: {
            /**
             * Comments will be added to the autocomplete.
             */
            setLineHeight: (lineHeight: string | number) => ReturnType;
            unsetLineHeight: (someProp: any) => ReturnType;
        };
    }
}