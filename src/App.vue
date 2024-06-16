<script setup lang="ts">
import { ref } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import Vue3MajorEditor from '../packages/index.vue';

const testStr = ref<string>("<p>欢迎使用<em>basic</em><code>vue3-major-editor</code>编辑器, 🎉</p>它是一款简洁的丰富文本。")
</script>

<template>
  <!-- <div> -->
    <!-- <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
  <Vue3MajorEditor v-model:content="testStr"></Vue3MajorEditor>
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
