// vite.config.ts
import { defineConfig } from "file:///D:/web_core/vue3-major-editor/node_modules/.pnpm/vite@5.3.1_@types+node@20.14.5_sass@1.77.5_terser@5.31.1/node_modules/vite/dist/node/index.js";
import path from "path";
import vue from "file:///D:/web_core/vue3-major-editor/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.1_@types+node@20.14.5_sass@1.77.5_terser@5.31.1__vue@3.4.29_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///D:/web_core/vue3-major-editor/node_modules/.pnpm/vite-plugin-dts@4.2.2_@types+node@20.14.5_rollup@4.18.0_typescript@5.4.5_vite@5.3.1_@types+no_dqhzgdeyqsrjkjaebudmzkwt4y/node_modules/vite-plugin-dts/dist/index.mjs";

// package.json
var package_default = {
  name: "image-viewer-vue3",
  scope: "ImageViewerV3",
  private: "false",
  version: "1.0.0",
  description: "image-viewr-vue3 \u662F\u4E00\u6B3EVue3\u4E13\u5C5E\u8F7B\u91CF\u7EA7\u56FE\u7247\u67E5\u770B\u5668",
  type: "module",
  main: "./dist/lib/index.cjs",
  module: "./dist/es/index.js",
  types: "./dist/es/index.d.ts",
  style: "./dist/es/style.css",
  scripts: {
    dev: "vite",
    build: "pnpm run clean && vue-tsc --noEmit && vite build",
    "build:umd": "pnpm run clean && vue-tsc --noEmit && vite build --config vite.bundle.config.ts",
    clean: "rimraf dist",
    test: 'echo "Error: no test specified" && exit 1',
    "check-exports": "attw --pack . --ignore-rules=cjs-resolves-to-esm"
  },
  publishConfig: {
    registry: "https://registry.npmjs.org",
    access: "public"
  },
  repository: {
    type: "git",
    url: "https://github.com/qiunanya/vue3-major-editor/tree/main/packages/image-viewer"
  },
  exports: {
    ".": {
      types: "./dist/es/index.d.ts",
      import: "./dist/es/index.js",
      require: "./dist/lib/index.cjs"
    }
  },
  files: [
    "dist",
    "LICENSE",
    "README.md",
    "package.json"
  ],
  keywords: [
    "vue",
    "vue3.0",
    "image-viewer",
    "image"
  ],
  author: "qiuny",
  license: "MIT"
};

// vite.config.ts
import VitePluginStyleInject from "file:///D:/web_core/vue3-major-editor/node_modules/.pnpm/vite-plugin-style-inject@0.0.1_vite@5.3.1_@types+node@20.14.5_sass@1.77.5_terser@5.31.1_/node_modules/vite-plugin-style-inject/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\web_core\\vue3-major-editor\\packages\\image-viewer";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: ["dist/es", "dist/lib"],
      include: ["src/**/*.ts", "src/**/*.tsx"]
    }),
    VitePluginStyleInject()
  ],
  server: {
    port: 3e3
  },
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: package_default.scope
      // fileName: 'index',
      // formats:['es','cjs']
    },
    rollupOptions: {
      external: ["vue"],
      output: [
        {
          format: "es",
          dir: "dist/es",
          entryFileNames: "[name].js",
          preserveModulesRoot: "src",
          preserveModules: true,
          exports: "named"
        },
        {
          format: "cjs",
          dir: "dist/lib",
          entryFileNames: "[name].cjs",
          preserveModulesRoot: "src",
          preserveModules: true,
          exports: "named"
        }
        // {
        //     name: "index",
        //     format: "umd",
        //     entryFileNames: "[name].umd.js",
        //     dir: "dist/umd",
        //     // 禁用警告
        //     exports: "named",
        //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        //     globals: {
        //         vue: "Vue"
        //     }
        // }
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd2ViX2NvcmVcXFxcdnVlMy1tYWpvci1lZGl0b3JcXFxccGFja2FnZXNcXFxcaW1hZ2Utdmlld2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3ZWJfY29yZVxcXFx2dWUzLW1ham9yLWVkaXRvclxcXFxwYWNrYWdlc1xcXFxpbWFnZS12aWV3ZXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dlYl9jb3JlL3Z1ZTMtbWFqb3ItZWRpdG9yL3BhY2thZ2VzL2ltYWdlLXZpZXdlci92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcclxuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbic7XHJcbmltcG9ydCBWaXRlUGx1Z2luU3R5bGVJbmplY3QgZnJvbSAndml0ZS1wbHVnaW4tc3R5bGUtaW5qZWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdnVlKCksIFxyXG4gICAgICAgIGR0cyh7XHJcbiAgICAgICAgICAgIG91dERpcjogWydkaXN0L2VzJywnZGlzdC9saWInXSxcclxuICAgICAgICAgICAgaW5jbHVkZTogW1wic3JjLyoqLyoudHNcIiwgXCJzcmMvKiovKi50c3hcIl1cclxuICAgICAgICB9KSxcclxuICAgICAgICBWaXRlUGx1Z2luU3R5bGVJbmplY3QoKVxyXG4gICAgXSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHBvcnQ6IDMwMDBcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAgIGxpYjoge1xyXG4gICAgICAgICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXHJcbiAgICAgICAgICAgIG5hbWU6IHBrZy5zY29wZSxcclxuICAgICAgICAgICAgLy8gZmlsZU5hbWU6ICdpbmRleCcsXHJcbiAgICAgICAgICAgIC8vIGZvcm1hdHM6WydlcycsJ2NqcyddXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGV4dGVybmFsOiBbXCJ2dWVcIl0sXHJcbiAgICAgICAgICAgIG91dHB1dDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ2VzJyxcclxuICAgICAgICAgICAgICAgICAgICBkaXI6ICdkaXN0L2VzJyxcclxuICAgICAgICAgICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2VydmVNb2R1bGVzUm9vdDogJ3NyYycsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydHM6ICduYW1lZCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnY2pzJyxcclxuICAgICAgICAgICAgICAgICAgICBkaXI6ICdkaXN0L2xpYicsXHJcbiAgICAgICAgICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV0uY2pzJyxcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXNSb290OiAnc3JjJyxcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0czogXCJuYW1lZFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG5hbWU6IFwiaW5kZXhcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICBmb3JtYXQ6IFwidW1kXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZW50cnlGaWxlTmFtZXM6IFwiW25hbWVdLnVtZC5qc1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGRpcjogXCJkaXN0L3VtZFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIFx1Nzk4MVx1NzUyOFx1OEI2Nlx1NTQ0QVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGV4cG9ydHM6IFwibmFtZWRcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAvLyBcdTU3MjggVU1EIFx1Njc4NFx1NUVGQVx1NkEyMVx1NUYwRlx1NEUwQlx1NEUzQVx1OEZEOVx1NEU5Qlx1NTkxNlx1OTBFOFx1NTMxNlx1NzY4NFx1NEY5RFx1OEQ1Nlx1NjNEMFx1NEY5Qlx1NEUwMFx1NEUyQVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdnVlOiBcIlZ1ZVwiXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4iLCAie1xyXG4gICAgXCJuYW1lXCI6IFwiaW1hZ2Utdmlld2VyLXZ1ZTNcIixcclxuICAgIFwic2NvcGVcIjogXCJJbWFnZVZpZXdlclYzXCIsXHJcbiAgICBcInByaXZhdGVcIjogXCJmYWxzZVwiLFxyXG4gICAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJpbWFnZS12aWV3ci12dWUzIFx1NjYyRlx1NEUwMFx1NkIzRVZ1ZTNcdTRFMTNcdTVDNUVcdThGN0JcdTkxQ0ZcdTdFQTdcdTU2RkVcdTcyNDdcdTY3RTVcdTc3MEJcdTU2NjhcIixcclxuICAgIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gICAgXCJtYWluXCI6IFwiLi9kaXN0L2xpYi9pbmRleC5janNcIixcclxuICAgIFwibW9kdWxlXCI6IFwiLi9kaXN0L2VzL2luZGV4LmpzXCIsXHJcbiAgICBcInR5cGVzXCI6IFwiLi9kaXN0L2VzL2luZGV4LmQudHNcIixcclxuICAgIFwic3R5bGVcIjogXCIuL2Rpc3QvZXMvc3R5bGUuY3NzXCIsXHJcbiAgICBcInNjcmlwdHNcIjoge1xyXG4gICAgICAgIFwiZGV2XCI6IFwidml0ZVwiLFxyXG4gICAgICAgIFwiYnVpbGRcIjogXCJwbnBtIHJ1biBjbGVhbiAmJiB2dWUtdHNjIC0tbm9FbWl0ICYmIHZpdGUgYnVpbGRcIixcclxuICAgICAgICBcImJ1aWxkOnVtZFwiOiBcInBucG0gcnVuIGNsZWFuICYmIHZ1ZS10c2MgLS1ub0VtaXQgJiYgdml0ZSBidWlsZCAtLWNvbmZpZyB2aXRlLmJ1bmRsZS5jb25maWcudHNcIixcclxuICAgICAgICBcImNsZWFuXCI6IFwicmltcmFmIGRpc3RcIixcclxuICAgICAgICBcInRlc3RcIjogXCJlY2hvIFxcXCJFcnJvcjogbm8gdGVzdCBzcGVjaWZpZWRcXFwiICYmIGV4aXQgMVwiLFxyXG4gICAgICAgIFwiY2hlY2stZXhwb3J0c1wiOiBcImF0dHcgLS1wYWNrIC4gLS1pZ25vcmUtcnVsZXM9Y2pzLXJlc29sdmVzLXRvLWVzbVwiXHJcbiAgICB9LFxyXG4gICAgXCJwdWJsaXNoQ29uZmlnXCI6IHtcclxuICAgICAgICBcInJlZ2lzdHJ5XCI6IFwiaHR0cHM6Ly9yZWdpc3RyeS5ucG1qcy5vcmdcIixcclxuICAgICAgICBcImFjY2Vzc1wiOiBcInB1YmxpY1wiXHJcbiAgICB9LFxyXG4gICAgXCJyZXBvc2l0b3J5XCI6IHtcclxuICAgICAgICBcInR5cGVcIjogXCJnaXRcIixcclxuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9xaXVuYW55YS92dWUzLW1ham9yLWVkaXRvci90cmVlL21haW4vcGFja2FnZXMvaW1hZ2Utdmlld2VyXCJcclxuICAgIH0sXHJcbiAgICBcImV4cG9ydHNcIjoge1xyXG4gICAgICAgIFwiLlwiOiB7XHJcbiAgICAgICAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvZXMvaW5kZXguZC50c1wiLFxyXG4gICAgICAgICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9lcy9pbmRleC5qc1wiLFxyXG4gICAgICAgICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvbGliL2luZGV4LmNqc1wiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiZmlsZXNcIjogW1xyXG4gICAgICAgIFwiZGlzdFwiLFxyXG4gICAgICAgIFwiTElDRU5TRVwiLFxyXG4gICAgICAgIFwiUkVBRE1FLm1kXCIsXHJcbiAgICAgICAgXCJwYWNrYWdlLmpzb25cIlxyXG4gICAgXSxcclxuICAgIFwia2V5d29yZHNcIjogW1xyXG4gICAgICAgIFwidnVlXCIsXHJcbiAgICAgICAgXCJ2dWUzLjBcIixcclxuICAgICAgICBcImltYWdlLXZpZXdlclwiLFxyXG4gICAgICAgIFwiaW1hZ2VcIlxyXG4gICAgXSxcclxuICAgIFwiYXV0aG9yXCI6IFwicWl1bnlcIixcclxuICAgIFwibGljZW5zZVwiOiBcIk1JVFwiXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVixTQUFTLG9CQUFvQjtBQUNsWCxPQUFPLFVBQVU7QUFDakIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUzs7O0FDSGhCO0FBQUEsRUFDSSxNQUFRO0FBQUEsRUFDUixPQUFTO0FBQUEsRUFDVCxTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsRUFDWCxhQUFlO0FBQUEsRUFDZixNQUFRO0FBQUEsRUFDUixNQUFRO0FBQUEsRUFDUixRQUFVO0FBQUEsRUFDVixPQUFTO0FBQUEsRUFDVCxPQUFTO0FBQUEsRUFDVCxTQUFXO0FBQUEsSUFDUCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixpQkFBaUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsZUFBaUI7QUFBQSxJQUNiLFVBQVk7QUFBQSxJQUNaLFFBQVU7QUFBQSxFQUNkO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDVixNQUFRO0FBQUEsSUFDUixLQUFPO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1AsS0FBSztBQUFBLE1BQ0QsT0FBUztBQUFBLE1BQ1QsUUFBVTtBQUFBLE1BQ1YsU0FBVztBQUFBLElBQ2Y7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFTO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFBQSxFQUNBLFVBQVk7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQUFBLEVBQ0EsUUFBVTtBQUFBLEVBQ1YsU0FBVztBQUNmOzs7QUQzQ0EsT0FBTywyQkFBMkI7QUFMbEMsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLE1BQ0EsUUFBUSxDQUFDLFdBQVUsVUFBVTtBQUFBLE1BQzdCLFNBQVMsQ0FBQyxlQUFlLGNBQWM7QUFBQSxJQUMzQyxDQUFDO0FBQUEsSUFDRCxzQkFBc0I7QUFBQSxFQUMxQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILEtBQUs7QUFBQSxNQUNELE9BQU8sS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUM3QyxNQUFNLGdCQUFJO0FBQUE7QUFBQTtBQUFBLElBR2Q7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNYLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBLFFBQ0o7QUFBQSxVQUNJLFFBQVE7QUFBQSxVQUNSLEtBQUs7QUFBQSxVQUNMLGdCQUFnQjtBQUFBLFVBQ2hCLHFCQUFxQjtBQUFBLFVBQ3JCLGlCQUFpQjtBQUFBLFVBQ2pCLFNBQVM7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0ksUUFBUTtBQUFBLFVBQ1IsS0FBSztBQUFBLFVBQ0wsZ0JBQWdCO0FBQUEsVUFDaEIscUJBQXFCO0FBQUEsVUFDckIsaUJBQWlCO0FBQUEsVUFDakIsU0FBUztBQUFBLFFBQ2I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWFKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
