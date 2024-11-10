// API预览接口参数项
type fromType = 'api' | 'directive' | 'component'
type langType = 'zh' | 'en'

export interface ImageViewerOptions {
    current: string,
    images?: string[],
    imageDom?:HTMLImageElement,
    from?: fromType,
    zIndex?: number,
    language?:langType
}

// 预览器配置项
export interface ImageViewerType {
    scaleRatio: number,
    rotateRatio: number,
    isEnableDrag: boolean,
    isEnableWheel: boolean,
    zIndex: number,
    language: langType,
    playSpeed: number,
    isDownLoad: boolean
}

// app.use安装配置类型(初始化配置)
export interface ImageViewerInstallConfig {
    scaleRatio?: number,
    rotateRatio?: number,
    isEnableDrag?: boolean,
    isEnableWheel?: boolean,
    zIndex?: number,
    language?:langType,
    playSpeed?: number,
    isDownLoad?: boolean 
}

export type ImageObjectTypes = {
    index: number;
    url: string;
};

export type AsyncSetImageReturnType = Promise<{ data: string[] } | { data: [] }>

export {}