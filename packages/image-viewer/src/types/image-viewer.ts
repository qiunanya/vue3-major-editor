// API预览接口参数项
export interface ImageViewerOptions {
    current: string,
    images?: string[],
}

// 预览器配置项
export interface ImageViewerConfig {
    scaleRatio: number,
    rotateRatio: number,
    isEnableDrag: boolean,
    isEnableWheel: boolean,
    zIndex: number 
}

// 按照配置类型
export interface ImageViewerInstallConfig {
    scaleRatio?: number,
    rotateRatio?: number,
    isEnableDrag?: boolean,
    isEnableWheel?: boolean,
    zIndex?: number 
}