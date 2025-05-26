import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import VitePluginStyleInject from 'vite-plugin-style-inject';
import path from "path";
import svgLoader from 'vite-svg-loader'
import { PreRenderedAsset} from 'rollup'
import AutoImport from 'unplugin-auto-import/vite' 

// 统一处理所有输出格式的资源配置
const assetFileNames = (chunkInfo:PreRenderedAsset) => {
    return chunkInfo.names.some(e => e.endsWith('.css')) ? 'css/style.css' : 'assets/[name]-[hash][extname]';
};
export default defineConfig({
    plugins: [
        vue(),
        svgLoader(),
        dts({
            outDir: ['dist/es', 'dist/lib'],
            include: ["src/**/*.ts", "src/**/*.tsx"],
            rollupTypes: false,
            exclude: ['main.ts']
        }),
        AutoImport({
            dts: './src/typings/auto-imports.d.ts',
            imports: ['vue'],
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/, /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
        })
        // VitePluginStyleInject()
    ],
    server: {
        port: 3001,
        // 使用手机能够访问,使用默认路由
        host: '0.0.0.0'
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src'),
            },
        ]
    },
    build: {
        rollupOptions: {
            external: ['vue'],
            output: [
                {
                    format: 'es',
                    dir: 'dist/es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    assetFileNames
                },
                {
                    format: 'cjs',
                    dir: 'dist/lib',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    exports: 'named',
                    assetFileNames
                }
            ]
        },
        lib: {
            entry: "src/index.ts",
            name: "editor-tiptap-vue3",
            // fileName: 'index',
            // formats:['es','cjs']
        }
    },
});
