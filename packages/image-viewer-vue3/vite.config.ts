import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import pkg from './package.json';
import VitePluginStyleInject from 'vite-plugin-style-inject';
import path from "path";

export default defineConfig({
    plugins: [
        vue(),
        dts({
            outDir: ['dist/es', 'dist/lib'],
            include: ["src/**/*.ts", "src/**/*.tsx"],
            rollupTypes: false,
            exclude: ['main.ts']
        }),
        VitePluginStyleInject()
    ],
    server: {
        port: 3000,
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
                    // preserveModules: true,
                    preserveModulesRoot: 'src',
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            const indexes = id.toString().split('node_modules/')[2].split('/');
                            let name = indexes[0];
                            if (name.includes('@')) {
                                name = name + '-' + indexes[1];
                            }
                                return 'js/npm-' + name;
                            } else if (id.includes('src')) {
                            const path = id.toString().split('src/')[1].replace(/\//g, '-');
                            return 'js/' + path;
                        }
                    }
                },
                {
                    format: 'cjs',
                    dir: 'dist/lib',
                    entryFileNames: '[name].js',
                    // preserveModules: true,
                    preserveModulesRoot: 'src',
                    exports: 'named',
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            const indexes = id.toString().split('node_modules/')[2].split('/');
                            let name = indexes[0];
                            if (name.includes('@')) {
                                name = name + '-' + indexes[1];
                            }
                                return 'js/npm-' + name;
                            } else if (id.includes('src')) {
                            const path = id.toString().split('src/')[1].replace(/\//g, '-');
                            return 'js/' + path;
                        }
                    }
                }
            ]
        },
        lib: {
            entry: "src/index.ts",
            name: pkg.scope,
            // fileName: 'index',
            // formats:['es','cjs']
        }
    },
});
