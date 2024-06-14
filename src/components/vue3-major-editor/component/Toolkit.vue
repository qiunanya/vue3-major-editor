<template>
    <ul class="major-editor-toolkit__group">
        <li class="icon_item"><BoldIcon></BoldIcon></li>
        <li class="icon_item"><ItalicIcon></ItalicIcon></li>
        <li class="icon_item"><StrikeIcon></StrikeIcon></li>
        <li class="icon_item"><CodeIcon></CodeIcon></li>
        <li class="icon_item"><BlockquoteIcon></BlockquoteIcon></li>
        <li class="icon_item"><BulletIcon></BulletIcon></li>
        <li class="icon_item"><HIcon></HIcon></li>
        <li class="icon_item"><HorizontalRuleIcon></HorizontalRuleIcon></li>
        <li class="icon_item"><OrderedIcon></OrderedIcon></li>
        <li class="icon_item"><ParagraphIcon></ParagraphIcon></li>
        <li class="icon_item"><RedoIcon></RedoIcon></li>
        <li class="icon_item"><UndoIcon></UndoIcon></li>
        <li class="icon_item"><ClearIcon></ClearIcon></li>
        <li class="icon_item"><UnderlineIcon></UnderlineIcon></li>
    </ul>
</template>

<script setup name="Toolkit">
import { 
    BoldIcon,
    ItalicIcon,
    StrikeIcon,
    CodeIcon,
    BlockquoteIcon,
    BulletIcon,
    HIcon,
    HorizontalRuleIcon,
    OrderedIcon,
    ParagraphIcon,
    RedoIcon,
    UndoIcon,
    UnderlineIcon,
    ClearIcon 
} from "@/assets/icons";


</script>

<style lang="scss" scoped>
.major-editor {
    &-toolkit__group {
        background: #FAFAFA;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-inline-start: 0;
        .icon_item {
            width: 1.5em;
            aspect-ratio: 1 / 1;
            padding: 0.3em;
            margin: 0 0.3em;
            cursor: pointer;
            svg {
                width: 1.5em;
                height: 1.5em;
            }
        }
    }
}
</style>
