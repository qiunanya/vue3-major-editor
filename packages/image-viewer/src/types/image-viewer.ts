// API预览接口参数项
type fromType = 'api' | 'directive' | 'component'

export interface ImageViewerOptions {
    current: string,
    images?: string[],
    imageDom?:HTMLImageElement,
    from?: fromType
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

export {}