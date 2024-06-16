import { defineConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import svgLoader from "vite-svg-loader";
import VueSetuoExtend from "vite-plugin-vue-setup-extend";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
        plugins: [
            vue(),
            svgLoader(),
            VueSetuoExtend(),
            dts({
                // 将类型压缩到一个文件
                rollupTypes: true,
                entryRoot: "./packages",
                outDir:["lib"],
                tsconfigPath: './packages/tsconfig.json'
            })
            // dts({
            //     entryRoot: "./packages",
            //     outDir:["lib"],
            //     tsconfigPath: './packages/tsconfig.json'
            // }),
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url))
            },
        },
        base: "/",
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/style/majorVar.scss";',
                },
            },
        },
        build: {
            outDir: "lib",
            // 压缩
            minify: true,
            // 配置打包最大限制
            chunkSizeWarningLimit: 6000,
            lib: {
                entry: resolve(__dirname, "./packages/index.ts"),
                name: "Vue3MajorEditor", // 暴露的全局变量
                fileName: 'index',
                formats: ["es", "umd"],
            },
            // 库编译模式配置
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ["vue"],
                output: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: "Vue",
                    },
                    // 禁用警告
                    exports: "named",
                },
            },
        },
});