import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [vue(), dts()],
    server: {
        port: 3000
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "image-viewer-vue3",
            fileName: (format) => `image-viewer-vue3.${format}.ts`,
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
