import { defineConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import svgLoader from "vite-svg-loader";
import { visualizer } from "rollup-plugin-visualizer";
import VueSetuoExtend from "vite-plugin-vue-setup-extend";
import dts from "vite-plugin-dts";

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
        // dts({
        //     entryRoot: "./src/packages",
        //     outDir:["lib/es/src", "lib/cjs/src"],
        //     tsconfigPath: './src/tsconfig.json'
        // })
    ];
    const commonConfig = {
        plugins: [...vitePlugins],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
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
    };
    if (mode === "lib") {
        return {
            ...commonConfig,
            build: {
                // 打包目录
                outDir: 'lib',
                // 压缩
                minify: false,
                lib: {
                    entry: '/src/packages/index.ts'
                },
                rollupOptions: {
                    // 忽略打包vue文件
                    external: ['vue'],
                    input: ['./src/packages/index.ts'],
                    output:[
                        {
                            //打包格式
                            format: "es",
                            //打包后文件名
                            entryFileNames: "[name].mjs",
                            //让打包目录和我们目录对应
                            preserveModules: true,
                            exports: "named",
                            //配置打包根目录
                            dir: "lib/es",
                        },
                        {
                            //打包格式
                            format: "cjs",
                            //打包后文件名
                            entryFileNames: "[name].js",
                            //让打包目录和我们目录对应
                            preserveModules: true,
                            exports: "named",
                            //配置打包根目录
                            dir: "lib/cjs",
                        },
                    ]
                }
            }
            // build: {
            //     outDir: "lib",
            //     lib: {
            //         entry: resolve(__dirname, "./src/packages/index.ts"),
            //         name: "Vue3MajorEditor", // 暴露的全局变量
            //         fileName: 'vue3-major-editor',
            //         formats: ["es", "umd"],
            //     },
            //     // 库编译模式配置
            //     rollupOptions: {
            //         // 确保外部化处理那些你不想打包进库的依赖
            //         external: ["vue"],
            //         output: {
            //             // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            //             globals: {
            //                 vue: "Vue",
            //             },
            //             // 禁用警告
            //             exports: "named",
            //         }
            //     },
            // },
        };
    } else {
        // 构建应用
        return {
            ...commonConfig,
            build: {
                outDir: "dist",
                rollupOptions: {
                    input: {
                        main: resolve(__dirname, "index.html"),
                    },
                },
            },
        };
    }
});