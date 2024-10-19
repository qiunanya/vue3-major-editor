// API预览接口参数项
type fromType = 'api' | 'directive' | 'component'

export interface ImageViewerOptions {
    current: string,
    images?: string[],
    imageDom?:HTMLImageElement,
    from?: fromType,
    zIndex?: number,
}

// 预览器配置项
export interface ImageViewerConfig {
    scaleRatio: number,
    rotateRatio: number,
    isEnableDrag: boolean,
    isEnableWheel: boolean,
    zIndex: number 
}

// app.use安装配置类型(初始化配置)
export interface ImageViewerInstallConfig {
    scaleRatio?: number,
    rotateRatio?: number,
    isEnableDrag?: boolean,
    isEnableWheel?: boolean,
    zIndex?: number 
}

export {}