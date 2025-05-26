// API预览接口参数项
type fromType = 'api' | 'directive' | 'component';
type langType = 'zh' | 'en';

// 预览器配置项
export type ImageViewerType = {
    scaleRatio: number,
    rotateRatio: number,
    isEnableDrag: boolean,
    isEnableWheel: boolean,
    zIndex: number,
    language: langType,
    playSpeed: number,
    isDownLoad: boolean
}

// 从配置项中提取zindex属性类型
type ZIndex = Partial<Pick<ImageViewerType, 'zIndex'>>

// 预览图片API参数类型约束
export interface ImageViewerOptions extends ZIndex {
    specifyIndex?: number | string,
    current: string,
    images?: string[],
    imageDom?:HTMLImageElement,
    from?: fromType,
    language?:langType
}

// app.use安装配置类型(初始化配置)
export type ImageViewerInstallConfig = Partial<ImageViewerType>

export type ImageObjectTypes = {
    index: number;
    url: string;
};

export interface ViewImageType extends ImageObjectTypes {
    key: string,
}

export type AsyncSetImageReturnType = Promise<{ data: string[] } | { data: [] }>

// 左侧图片列表项类型
export interface NavImageItemType extends ImageObjectTypes {
    height: number,
    size: string,
    isLoad: boolean,
    isError: boolean
}

// 左侧图片列表项点击参数类型
export type ClickNavImageType = {
    evt:Event, 
    item: ImageObjectTypes, 
    index: number
}

export {}