<script setup lang="js">
// import { BoldIcon, ItalicIcon } from "@/assets/icons";
import Vue3MajorEditor from "@/package/index.vue";
</script>

<template>
    <!-- <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <BoldIcon></BoldIcon>
        <ItalicIcon></ItalicIcon>
    </div>
    <HelloWorld msg="Vite + Vue" /> -->
    <vue3-major-editor></vue3-major-editor>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
