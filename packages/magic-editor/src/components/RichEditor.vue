<template>
    <div class="rich-content-editor__wrap">
        <EditorContent :editor="editor"></EditorContent>
    </div>
</template>

<script setup lang="ts" name="RichEditor">
import { EditorContent } from "@tiptap/vue-3";
import { useSelectCore } from "../hooks/useSelect";

const { editor } = useSelectCore();
console.log(editor, 12346);

</script>

<style lang="scss" scoped>
.rich-content-editor__wrap {
    // height: 100%;
    border-left: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    border-right: 1px solid #dedede;
    min-height: 30rem;
    height: 30rem;
    overflow-y: auto;
    padding: 0 0.4em;
}
</style>
