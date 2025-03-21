// 自定义图片插件
// 创建一个新节点image
import { mergeAttributes, Node, VueNodeViewRenderer, Command, RawCommands } from '@tiptap/vue-3'
import ExtensionImageUI from '../components/extension-image/index.vue'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        customImage: {
            insertCustomImage: (attrs: {
                src: string
                file?: File
                width?: number
                height?: number,
                alt?: string
            }) => ReturnType
            updateImageAttributes: (attrs: Record<string, any>) => ReturnType
        }
    }
  }

export type CustomImageAttrs = {
    src: string
    file?: File
    width?: number
    height?: number
    alt?: string
}

export const ExtImage = Node.create({
    name: 'customize-image',
    group: 'block',
    atom:true,
    addAttributes() {
        return {
            src: { default: null },
            alt: { default: '' },
            width: { default: 400 },
            height: { default: 300 },
            file: { default: null }, // 用于临时存储文件对象
            isUploading: { default: false }
        }
    },
    parseHTML() {
        return [{ tag: 'div[data-type="customize-image"]' }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'customize-image' })]
    },
    
    addNodeView() {
        return VueNodeViewRenderer(ExtensionImageUI)
    },
    // addCommands() {
    //     return {
    //         insertCustomImage: (options) => ({ chain }) => {
    //             return chain()
    //               .insertContent({
    //                 type: this.name,
    //                 attrs: {
    //                   ...options,
    //                   isUploading: !!options.file
    //                 }
    //             }).run()
    //         },
    //         updateImageAttributes: (attrs) => ({ chain }) => {
    //             return chain().updateAttributes(this.name, attrs).run()
    //         }
    //     }
    // }
    // 使用更精确的类型定义
    addCommands<CustomImageAttrs>() {
        return {
        insertCustomImage: (options: { 
            src: string
            file?: File
            width?: number
            height?: number
            alt?: string 
        }) => ({ chain }: { chain: any }) => {
            return chain()
            .insertContent({
                type: this.name,
                attrs: {
                    src: options.src,
                    width: options.width || 400,
                    height: options.height || 300,
                    file: options.file || null,
                    isUploading: !!options.file,
                    alt: options.alt
                }
            })
            .run()
        },
        updateImageAttributes: (attrs: Record<string, any>) => ({ chain }: { chain: any }) => {
            return chain()
            .updateAttributes(this.name, attrs)
            .run()
        }
        } as Partial<RawCommands>
    }
})