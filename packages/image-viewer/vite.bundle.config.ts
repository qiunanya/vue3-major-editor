import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import pkg from './package.json';

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000
    },
    build: {
        outDir: 'umds',
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: pkg.scope,
            fileName: () => `${pkg.scope}.js`,
            formats:['umd']
        }
    },
});
