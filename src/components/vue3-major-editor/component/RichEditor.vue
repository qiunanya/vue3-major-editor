<template>
    <div class="rich-content-editor__wrap">
        <EditorContent :editor="editor"></EditorContent>
    </div>
</template>

<script setup name="RichEditor">
import { nextTick, ref } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { useSelectCore } from "@/hooks/useSelect";

const { editor, content } = useSelectCore();
</script>

<style lang="scss" scoped>
.rich-content-editor__wrap {
    // height: 100%;
    border: 1px solid #eee;
    min-height: 30rem;
    overflow-y: auto;
}
</style>
