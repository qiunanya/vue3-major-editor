/// <reference types="vite/client" />

interface ViteTypeOptions {
    // 添加这行代码，你就可以将 ImportMetaEnv 的类型设为严格模式，
    // 这样就不允许有未知的键值了。
    // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_ENV: string;
    readonly VITE_APP_BASE_API: string;
    readonly VITE_APP_BASE_PORT: number;
    readonly VITE_APP_BASE_URL_API: number;
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
