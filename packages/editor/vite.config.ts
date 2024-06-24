import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { fileURLToPath, URL } from "node:url";
import svgLoader from "vite-svg-loader";
import VueSetuoExtend from "vite-plugin-vue-setup-extend";
import viteCompression from "vite-plugin-compression";
import terser from '@rollup/plugin-terser';

export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./components", import.meta.url))
        },
    },
    build: {
        target: "modules",
        //打包文件目录
        outDir: "dist",
        //压缩
        minify: false,
        //css分离
        //cssCodeSplit: true,
        lib: {
            entry: "./index.ts",
            // name: "MyLib",
            // the proper extensions will be added
            // fileName: "my-lib",
        },
        rollupOptions: {
            //1、 vite官方推荐库模式，更复杂的，高级构建流程，可以直接使用 Rollup 或 esbuild
            //忽略打包vue文件
            external: ["vue"],
            // 2、自定义构建库模式
            input: ["./index.ts"],
            output: [
                {
                    format: "es",
                    //不用打包成.es.js,这里我们想把它打包成.js
                    entryFileNames: "[name].js",
                    //让打包目录和我们目录对应
                    // preserveModules: true,
                    //配置打包根目录
                    dir: "./dist/es",
                    // preserveModulesRoot: "src",
                    // 禁用警告
                    exports: "named",
                },
                {
                    format: "cjs",
                    entryFileNames: "[name].js",
                    //让打包目录和我们目录对应
                    // preserveModules: true,
                    //配置打包根目录
                    dir: "./dist/lib",
                    // preserveModulesRoot: "src",
                    // 禁用警告
                    exports: "named",
                },
                {
                    name: "Vue3MajorEditor",
                    format: "umd",
                    entryFileNames: "[name].umd.js",
                    //让打包目录和我们目录对应
                    // preserveModules: true,
                    //配置打包根目录
                    dir: "./dist/umd",
                    // preserveModulesRoot: "src",
                    // 禁用警告
                    exports: "named",
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: "Vue"
                    }
                }
            ],
        },
    },
    plugins: [
        vue(),
        // svgLoader(),
        terser(),
        VueSetuoExtend(),
        // viteCompression(), // 启用gzip压缩
        dts({
            tsconfigPath: "./tsconfig.json",
            staticImport: true, // 处理静态导入
            insertTypesEntry: true, // 插入类型入口
            logLevel: 'error',
            outDir: "./dist/types"
        }),
        // dts({
        //     // 指定使用的 tsconfig.json，如果不配置也可以在 components 下新建 tsconfig.json
        //     tsconfigPath: "../../tsconfig.json",
        //     // 因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
        //     outDir: "lib",
        // }),
    ],
});
