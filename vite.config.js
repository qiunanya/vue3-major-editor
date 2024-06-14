import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import svgLoader from 'vite-svg-loader';
import { visualizer } from "rollup-plugin-visualizer";
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
        })
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
            css: {
                preprocessorOptions: {
                    additionalData: '@import "@/assets/style/majorVar.scss";'
                }
            },
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
                        },
                        // 禁用警告
                        exports: 'named'
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
            css: {
                preprocessorOptions: {
                    additionalData: '@import "@/assets/style/majorVar.scss";'
                }
            },
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
