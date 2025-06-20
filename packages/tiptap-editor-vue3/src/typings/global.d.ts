import "@tiptap/core";
import { Command } from "@tiptap/core";

// 这里声明后会影响全局的 @tiptap/core
// declare module "@tiptap/core" {
//     interface Command {
//         toggleBold: () => Commands;
//         toggleItalic: () => Commands;
//         toggleStrike: () => Commands;
//         toggleCode: () => Commands;
//         setHorizontalRule: () => Commands;
//         toggleBlockquote: () => Commands;
//         toggleBulletList: () => Commands;
//         toggleOrderedList: () => Commands;
//     }
// }

// declare module "@tiptap/core" {
//     interface Commands<ReturnType> {
//         LineHeightExtension: {
//             /**
//              * Comments will be added to the autocomplete.
//              */
//             setLineHeight: (lineHeight: string | number) => ReturnType;
//             unsetLineHeight: (someProp: any) => ReturnType;
//         };
//     }
// }
