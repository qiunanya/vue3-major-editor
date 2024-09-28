/**
 * ImageViewerCore
 * 
 * @author qiuny
 */
import { ImageViewerConfig } from '../types/image-viewer'

class ImageViewerCore {
    // 配置全局变量供外部调用
    static viewer: ImageViewerCore;
    // 配置静态属性，防止被外部修改
    private static total: number = 0;
    private currentImage: HTMLImageElement | null = null;
    private totalRotate = 0;

    private config:ImageViewerConfig = {
        scaleRatio: 1,
        rotateRatio: 90,
        isEnableDrag: true,
        isEnableWheel: true,
        zIndex: 2000
    }
    private constructor () {
        // console.log('ImageViewerCore的构造器');
    }

    public static getInStance () {
        !this.viewer&&(this.viewer = new ImageViewerCore())

        this.viewer.initialize()

        return this.viewer;
    }

    private initialize () {
        this.config.isEnableWheel&&window.addEventListener('wheel', this.onWheel.bind(this))
    }

    private onWheel (evt:WheelEvent) {
        (evt.deltaY < 0) && this.zoomIn();
        (evt.deltaY >= 0) && this.zoomOut();
    }

    public setConfigOptions (opts: ImageViewerConfig) {

        this.config = Object.assign(this.config, opts)
        
        console.log(this.config, 'config')
    }

    public getConfigOptions () {
        return this.config
    }

    public horizontalInvert () {
        this.setInvert('scaleY')
    }   
    public verticalInvert () {
        this.setInvert('scaleX')
    } 

    private setInvert (type:string="scaleX") {
        if (!type || !this.currentImage) return
        
        let transformStr = this.currentImage.style.transform
        // 字符串正则：/scaleX\(([^)]+)\)/
        const invert_regex = new RegExp(`${type}\\(([^)]+)\\)`);
        
        if (invert_regex.test(transformStr)) {
            const matchValue = transformStr.match(invert_regex)
            const invertValue = matchValue&&parseInt(matchValue[1])
            const newInvertValue = invertValue === 1 ? -1 : 1;

            // 替换新值
            transformStr = transformStr.replace(invert_regex, `${type}(${newInvertValue})`)
        } else transformStr += ` ${type}(-1)`
        
        // 重新渲染值
        this.currentImage.style.transform = transformStr;
    }

    public zoomIn () {
        this.setZoom('+')
    }

    public zoomOut () {
        this.setZoom('-')
    }

    public rotate (mark:string="+") {
        if (!this.currentImage) return

        let transformStr = this.currentImage.style.transform;
        const invert_regex = new RegExp('rotate\\(([^)]+)\\)', 'i');

        if (invert_regex.test(transformStr)) {
            if (mark === '+') {
                this.totalRotate += this.config.rotateRatio;
            } else this.totalRotate -= this.config.rotateRatio;

            // 替换现有的 rotate 值
            transformStr = transformStr.replace(invert_regex, `rotate(${this.totalRotate}deg)`);
        } else {
            if (mark === '+') {
                this.totalRotate = this.config.rotateRatio;
            } else this.totalRotate = -(this.config.rotateRatio);

            transformStr += ` rotate(${this.totalRotate}deg)`;
        }

        // 重新渲染值
        this.currentImage.style.transform = transformStr;
    }

    private setZoom (flag:string="+") {
        if (!this.currentImage) return

        // const imageRect = this.currentImage.getBoundingClientRect()

        // 1.按比例像素缩放不受旋转方向影响
        let transformStr = this.currentImage.style.transform;
        const scale_regex = new RegExp('scale\\(([^)]+)\\)', 'i');
        if (scale_regex.test(transformStr)) {
            if (flag === '+') {
                this.config.scaleRatio += 0.1
            } else {
                (this.config.scaleRatio >= 0.3)&&(this.config.scaleRatio -= 0.1)
            };

            // 替换现有的 scale 值
            transformStr = transformStr.replace(scale_regex, `scale(${this.config.scaleRatio})`);
        } else {
            if (flag === '+') {
                this.config.scaleRatio += 0.1
            } else {
                (this.config.scaleRatio >= 0.3)&&(this.config.scaleRatio -= 0.1)
            };

            transformStr += ` scale(${this.config.scaleRatio})`;
        }
        
        // 重新渲染值
        this.currentImage.style.transform = transformStr;
    }

    public setImage (dom: HTMLImageElement | null) {
        this.currentImage = dom

        // dragging
        if (this.currentImage && this.config.isEnableDrag){
            this.currentImage.onmousedown = this.onMouseMove.bind(this)
        }
    }

    private onMouseMove (evt:MouseEvent) {
        let this_ = this
        if (this.currentImage) {
            this.currentImage.style.position = 'absolute'
            const offleft = evt.clientX - this.currentImage.offsetLeft;
            const offtop = evt.clientY - this.currentImage.offsetTop; 
            document.onmousemove = function (event) {
                event = event || window.event // 兼容性写法
                let left = event.clientX - offleft, 
                top = event.clientY - offtop;
            
                this_.currentImage&&(this_.currentImage.style.left = `${left}px`)
                this_.currentImage&&(this_.currentImage.style.top = `${top}px`)
            }

            document.onmouseup = function () {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
        
        return false
    }

    public static addTotal () {
        this.total +=3
    }

    public destroyed() {
        window.removeEventListener('wheel', this.onWheel.bind(this))

        if (this.currentImage) {
            this.currentImage.style.removeProperty('position')
            this.currentImage.style.removeProperty('left')
            this.currentImage.style.removeProperty('top')
            this.currentImage.style.removeProperty('transform')
        }
    }
}

export default ImageViewerCore;