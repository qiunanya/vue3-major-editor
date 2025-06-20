import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";
import svgLoader from 'vite-svg-loader'
import { PreRenderedAsset} from 'rollup'
import AutoImport from 'unplugin-auto-import/vite' 

// 统一处理所有输出格式的资源配置
const assetFileNames = (chunkInfo:PreRenderedAsset) => {
    return chunkInfo.names.some(e => e.endsWith('.css')) ? 'css/style.css' : 'assets/[name]-[hash][extname]';
}

export default defineConfig({
    plugins: [
        vue(),
        svgLoader(),
        dts({
            include: ["src"],
            insertTypesEntry: true,
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
        minify: 'esbuild',
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                inlineDynamicImports: true,
                assetFileNames,
                globals: {
                    vue: 'vue'
                }
            }
        },
        lib: {
            entry: "src/index.ts",
            name: "TiptapEditorVue3",
            fileName: 'tiptap-editor-vue3',
            // formats:['es'],
            
        }
    },
});
