import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import pkg from './package.json';

export default defineConfig({
    plugins: [vue(), dts({
        outDir: ['es','lib'],
        include: ["src/**/*.ts", "src/**/*.tsx"]
    })],
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
                    dir: 'es',
                    entryFileNames: '[name].js',
                    preserveModulesRoot: 'src',
                    preserveModules: true,
                },
                {
                    format: 'cjs',
                    dir: 'lib',
                    entryFileNames: '[name].js',
                    preserveModulesRoot: 'src',
                    preserveModules: true,
                    exports: 'named'
                }
            ]
        },
    },
});
