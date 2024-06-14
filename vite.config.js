import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import svgLoader from 'vite-svg-loader';
import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from 'unplugin-auto-import/vite'; 
import Components from "unplugin-vue-components/vite";
import VueSetuoExtend from 'vite-plugin-vue-setup-extend';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const vitePlugins = [
        vue(), 
        svgLoader(), 
        VueSetuoExtend(),
        visualizer({
            emitFile: true,
            filename: "analysis.html",
            title: "analysis",
            sourcemap: false,
            open: false,
        }),
        AutoImport({
            dts: false,
            imports: ["vue", "vue-router"]
        }),
        Components({
            dts: false,
            // relative paths to the directory to search for components.
            dirs: ['src/components'],
            // Allow for components to override other components with the same name
            allowOverrides: false,
        }),
    ]
    if (mode === 'lib') {
        return {
            plugins: [...vitePlugins],
            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url))
                }
            },
            base: '/',
            build: {
                outDir: 'dist',
                lib: {
                    entry: resolve(__dirname, "./src/components/vue3-major-editor/index.js"),
                    name: 'Vue3MajorEditor', // 暴露的全局变量
                    fileName: 'vue3-major-editor' // 输出的包文件名，默认是package.json的name选项
                },
                // 库编译模式配置
                rollupOptions: {
                    // 确保外部化处理那些你不想打包进库的依赖
                    external: ["vue"],
                    output: {
                        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                        globals: {
                            vue: "Vue"
                        }
                    }
                }
            }
        }
    } else {
        // 构建应用
        return {
            plugins: [...vitePlugins],
            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url))
                }
            },
            base: '/',
            build: {
                outDir: 'app',
                rollupOptions: {
                    input: {
                        main: resolve(__dirname, 'index.html')
                    }
                }
            }
        }
    }
})
