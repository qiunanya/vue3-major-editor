import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import pkg from './package.json';

export default defineConfig({
    plugins: [vue(), dts()],
    server: {
        port: 3000
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: pkg.scope,
            fileName: 'index',
            formats:['es','umd','iife']
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                exports: "named",
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});
