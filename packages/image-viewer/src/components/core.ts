/**
 * ImageViewerCore
 * 
 * @author qiuny
 */
import { ImageViewerType } from '../types/image-viewer'

class ImageViewerCore {
    // 配置全局变量供外部调用
    static viewer: ImageViewerCore;
    // 配置静态属性，防止被外部修改
    private static total: number = 0;
    private currentImage: HTMLImageElement | null = null;
    private totalRotate = 0;
    private isMouseDown = false;

    private config:ImageViewerType = {
        scaleRatio: 1,
        rotateRatio: 90,
        isEnableDrag: true,
        isEnableWheel: true,
        zIndex: 2000,
        language: 'zh'
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
        // window.addEventListener('contextmenu', (evt) => {
        //     evt.preventDefault();
        //     evt.stopPropagation();
        // })
    }

    private onWheel (evt:WheelEvent) {
        // evt.preventDefault()
        // evt.stopPropagation()
        (evt.deltaY < 0) && this.zoomIn();
        (evt.deltaY >= 0) && this.zoomOut();
    }

    public setConfigOptions (opts: ImageViewerType) {

        this.config = Object.assign(this.config, opts)
        
        // console.log(this.config, 'config')
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
            this.currentImage.ontouchstart = this.onTouchstart.bind(this)
        }
    }

    private onMouseMove (evt:MouseEvent) {
        if (!this.currentImage) return

        const this_ = this
        this.isMouseDown = true

        this.currentImage.style.position = 'absolute'
        const offleft = evt.clientX - this.currentImage.offsetLeft;
        const offtop = evt.clientY - this.currentImage.offsetTop; 

        document.onmousemove = function (event) {
            event = event || window.event // 兼容性写法
            if (this_.isMouseDown) {
                let left = event.clientX - offleft, 
                top = event.clientY - offtop;
            
                this_.currentImage&&(this_.currentImage.style.left = `${left}px`)
                this_.currentImage&&(this_.currentImage.style.top = `${top}px`)
            }
        }

        document.onmouseup = function () {
            this_.isMouseDown = false
            document.onmousemove = null
            document.onmouseup = null
        }
        
        return false
    }

    private onTouchstart (evt:TouchEvent) {
        if (!this.currentImage) return

        console.log(evt, 'onTouchstart')
        const this_ = this
        this.isMouseDown = true
        const touch = evt.touches[0]
        this.currentImage.style.position = 'absolute'
        const offleft = touch.clientX - this.currentImage.offsetLeft;
        const offtop = touch.clientY - this.currentImage.offsetTop;

        // 当有两个触摸点时
        if (evt.touches.length === 2) {
            this.config.scaleRatio = this.getDistance(evt.touches[0], evt.touches[1]);
        }

        document.ontouchmove = function (event: TouchEvent) {
            if (this_.isMouseDown) {
                const touch = event.touches[0];
                let left = touch.clientX - offleft, 
                top = touch.clientY - offtop;

                this_.currentImage&&(this_.currentImage.style.left = `${left}px`)
                this_.currentImage&&(this_.currentImage.style.top = `${top}px`)
            }

            if (event.touches.length === 2 && this_.config.scaleRatio) { // 当有两个触摸点时
                const currentDistance = this_.getDistance(event.touches[0], event.touches[1]);
                const scale = currentDistance / this_.config.scaleRatio; // 计算缩放比例
                
                if (currentDistance > this_.config.scaleRatio) {
                    // this_.zoomIn()
                } else {
                    // this_.zoomOut()
                }
                this_.setMobileZoom(scale)
                // 阻止默认行为，避免页面缩放
                event.preventDefault();
              }
        }
        document.ontouchend = function () {
            this_.isMouseDown = false
        }
        document.ontouchcancel = function () {
            this_.isMouseDown = false
        }
    }

    private setMobileZoom (value=0) {
        if (!this.currentImage) return

        // 1.按比例像素缩放不受旋转方向影响
        let transformStr = this.currentImage.style.transform;
        const scale_regex = new RegExp('scale\\(([^)]+)\\)', 'i');
        if (scale_regex.test(transformStr)) {
            // 替换现有的 scale 值
            transformStr = transformStr.replace(scale_regex, `scale(${value})`);
        } else {
            transformStr += ` scale(${value})`;
        }
        
        // 重新渲染值
        this.currentImage.style.transform = transformStr;
    }

    // 计算两个触摸点之间的距离
    private getDistance(touch1: Touch, touch2: Touch): number {
        const deltaX = touch2.clientX - touch1.clientX;
        const deltaY = touch2.clientY - touch1.clientY;
       
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }  

    public static addTotal () {
        this.total +=3
    }

    public removeStyleProperty () {
        if (!this.currentImage) return

        this.currentImage.style.removeProperty('top')
        this.currentImage.style.removeProperty('left')
        this.currentImage.style.removeProperty('position')
        this.currentImage.style.removeProperty('transform')
        this.currentImage = null
    }

    public destroyed() {
        window.removeEventListener('wheel', this.onWheel.bind(this))

        this.removeStyleProperty()

        this.currentImage = null
    }
}

export default ImageViewerCore;