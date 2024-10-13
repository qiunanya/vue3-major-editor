import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import pkg from './package.json';
import VitePluginStyleInject from 'vite-plugin-style-inject';

export default defineConfig({
    plugins: [
        vue(), 
        dts({
            outDir: ['dist/es','dist/lib'],
            include: ["src/**/*.ts", "src/**/*.tsx"]
        }),
        VitePluginStyleInject()
    ],
    server: {
        port: 3000
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: pkg.scope,
            // fileName: 'index',
            // formats:['es','cjs']
        },
        rollupOptions: {
            external: ["vue"],
            output: [
                {
                    format: 'es',
                    dir: 'dist/es',
                    entryFileNames: '[name].js',
                    preserveModulesRoot: 'src',
                    preserveModules: true,
                    exports: 'named'
                },
                {
                    format: 'cjs',
                    dir: 'dist/lib',
                    entryFileNames: '[name].cjs',
                    preserveModulesRoot: 'src',
                    preserveModules: true,
                    exports: "named"
                },
                // {
                //     name: "index",
                //     format: "umd",
                //     entryFileNames: "[name].umd.js",
                //     dir: "dist/umd",
                //     // 禁用警告
                //     exports: "named",
                //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                //     globals: {
                //         vue: "Vue"
                //     }
                // }
            ]
        },
    },
});
