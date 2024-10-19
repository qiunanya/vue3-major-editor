import { defineConfig } from "vite";
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import pkg from './package.json';
import VitePluginStyleInject from 'vite-plugin-style-inject';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
    plugins: [
        vue(), 
        dts({
            outDir: ['dist/es','dist/lib'],
            include: ["src/**/*.ts", "src/**/*.tsx"]
        }),
        VueI18nPlugin({
            include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**')
        }),
        VitePluginStyleInject()
    ],
    server: {
        port: 3000
    },
    build: {
        lib: {
            entry: fileURLToPath(new URL('./src', import.meta.url)),
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
