// const vueSvg = new URL('./vue.svg', import.meta.url).href
import { DefineComponent } from 'vue'
import _BoldIcon from './bold-icon.svg'
import _ItalicIcon from './italic-icon.svg'
import _StrikeIcon from './strike-icon.svg'
import _CodeIcon from './code-icon.svg'
import _BlockquoteIcon from './blockquote-icon.svg'
import _BulletIcon from './bullet-icon.svg'
import _HIcon from './h-icon.svg'
import _HorizontalRuleIcon from './horizontal-rule-icon.svg'
import _OrderedIcon from './ordered-icon.svg'
import _ParagraphIcon from './paragraph-icon.svg'
import _RedoIcon from './redo-icon.svg'
import _UndoIcon from './undo-icon.svg'
import _UnderlineIcon from './underline-icon.svg'
import _ClearIcon from './clear-icon.svg'

// 统一暴露svg文件
export const BoldIcon:DefineComponent = _BoldIcon as unknown as DefineComponent;
export const ItalicIcon:DefineComponent = _ItalicIcon as unknown as DefineComponent
export const StrikeIcon:DefineComponent = _StrikeIcon as unknown as DefineComponent
export const CodeIcon:DefineComponent = _CodeIcon as unknown as DefineComponent
export const BlockquoteIcon:DefineComponent = _BlockquoteIcon as unknown as DefineComponent
export const BulletIcon:DefineComponent = _BulletIcon as unknown as DefineComponent
export const HIcon:DefineComponent = _HIcon as unknown as DefineComponent
export const HorizontalRuleIcon:DefineComponent = _HorizontalRuleIcon as unknown as DefineComponent
export const OrderedIcon:DefineComponent = _OrderedIcon as unknown as DefineComponent
export const ParagraphIcon:DefineComponent = _ParagraphIcon as unknown as DefineComponent
export const RedoIcon:DefineComponent = _RedoIcon as unknown as DefineComponent
export const UndoIcon:DefineComponent = _UndoIcon as unknown as DefineComponent
export const UnderlineIcon:DefineComponent = _UnderlineIcon as unknown as DefineComponent
export const ClearIcon:DefineComponent = _ClearIcon as unknown as DefineComponent
// export {
//     BoldIcon,
//     ItalicIcon,
//     StrikeIcon,
//     CodeIcon,
//     BlockquoteIcon,
//     BulletIcon,
//     HIcon,
//     HorizontalRuleIcon,
//     OrderedIcon,
//     ParagraphIcon,
//     RedoIcon,
//     UndoIcon,
//     UnderlineIcon,
//     ClearIcon
// }