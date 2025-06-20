// 自定义图片插件
// 创建一个新节点image
import { mergeAttributes, Node, VueNodeViewRenderer, Command, RawCommands, Editor } from '@tiptap/vue-3'
import ExtensionImageUI from '@/components/image/ImageNodeViewWrapper.vue'
import { Image as TiptapImage } from '@tiptap/extension-image'
import ImageIcon from '@/components/image/ImageIcon.vue'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        customizeImage: {
            insertCustomImage: (attrs: {
                src: string
                file?: File
                width?: number
                height?: number
                alt?: string
                title?: string
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
    alt?: string,
    title?: string
}

export const ExtensionImage = TiptapImage.extend({
    name: 'customizeImage',
    group: 'block',
    atom:true,
    addAttributes() {
        return {
            src: { default: null },
            alt: { default: '' },
            title: { default: ''},
            file: { default: null }, // 用于临时存储文件对象
            isUploading: { default: false },
            // 这样配置后，更新属性，才会触发编辑器update事件
            width: { 
                default: null,
                parseHTML: element => element.getAttribute('width'),
                renderHTML: attributes => {
                    if (!attributes.width) return {}
                    return { width: attributes.width }
                },
            },
            height: { 
                default: null,
                parseHTML: element => element.getAttribute('height'),
                renderHTML: attributes => {
                    if (!attributes.height) return {}
                    return { height: attributes.height }
                },
            },
        }
    },
    addOptions () {
        return {
            ...this.parent?.(),
            onClick: ({ editor }:{editor:Editor}) => {
                return {
                    component: ImageIcon,
                    componentProps: {
                        isActive: editor.isActive('customizeImage'),
                        isReadonly: !editor.isEditable,
                        icons: 'image-icon',
                        tipText: '添加图片',
                    }
                }
            }
        }
    },
    parseHTML() {
        return [{ tag: 'img[data-type="customize-image"]' }]
    },
    renderHTML({ HTMLAttributes }) {
        // 构建 style 属性字符串
        const style = [
            HTMLAttributes.width ? `width: ${HTMLAttributes.width}px;` : '',
            HTMLAttributes.height ? `height: ${HTMLAttributes.height}px;` : ''
        ].filter(Boolean).join(' ');
        
        return ['img', mergeAttributes(HTMLAttributes, { 
            'data-type': 'customize-image',
            width: HTMLAttributes.width,
            height: HTMLAttributes.height,
            alt: HTMLAttributes.alt,
            title: HTMLAttributes.title,
            style: style || undefined // 仅当有样式时才添加 style 属性
        })]
    },
    
    addNodeView() {
        return VueNodeViewRenderer(ExtensionImageUI)
    },

    // 使用更精确的类型定义
    addCommands<CustomImageAttrs>() {
        return {
            insertCustomImage: (options: { 
                src: string
                file?: File
                width?: number
                height?: number
                alt?: string
                title?: string 
            }) => ({ chain }: { chain: any }) => {
                return chain()
                .insertContent({
                    type: this.name,
                    attrs: {
                        src: options.src,
                        width: options.width,
                        height: options.height,
                        file: options.file || null,
                        isUploading: !!options.file,
                        alt: options.alt,
                        title: options.title
                    }
                })
                .run()
            },
            updateImageAttributes: (attrs: Record<string, any>) => ({ chain }: { chain: any }) => {
                return chain()
                .updateAttributes(this.name, attrs)
                .run()
            }
        }
    }
})