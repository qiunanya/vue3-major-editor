import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig(({ mode, command}) => {
    const env = loadEnv(mode, process.cwd())
    const { VITE_APP_ENV, VITE_APP_BASE_PORT, VITE_APP_BASE_URL_API } = env
    return {
        base: VITE_APP_ENV === 'production'?'/vue3-major-editor/':'/',
        plugins: [vue()],
        server: {
            port: Number(VITE_APP_BASE_PORT),
            host: true,
            open: false,
            proxy: {
                // https://cn.vitejs.dev/config/#server-proxy
                '/dev-api': {
                    target: VITE_APP_BASE_URL_API,
                    changeOrigin: true,
                    rewrite: (p) => p.replace(/^\/dev-api/, '')
                },
                // springdoc proxy
                '^/v3/api-docs/(.*)': {
                    target: VITE_APP_BASE_URL_API,
                    changeOrigin: true,
                }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        build: {
            // https://vite.dev/config/build-options.html
            sourcemap: command === 'build' ? false : 'inline',
            outDir: 'dist',
            assetsDir: 'assets',
            chunkSizeWarningLimit: 2500,
            rollupOptions: {
            output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
                }
            }
        },
    }
})
