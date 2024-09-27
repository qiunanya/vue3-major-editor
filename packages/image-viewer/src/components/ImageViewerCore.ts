class ImageViewerCore {
    // 配置全局变量供外部调用
    static viewer: ImageViewerCore;
    // 配置静态属性，防止被外部修改
    private static total: number = 0;
    public currentImage: HTMLImageElement | null = null
    private constructor () {
        console.log('ImageViewerCore的构造器');
    }

    public static getInStance () {
        if (!this.viewer) {
            this.viewer = new ImageViewerCore()
        }
        return this.viewer;
    }

    public setOptions () {

    }

    public horizontalInvert () {
        this.setInvert('scaleY')
    }   
    public verticalInvert () {
        this.setInvert('scaleX')
    } 

    public setInvert (type:string="scaleX") {

    }

    public zoomIn () {
        this.setZoom('+')
    }

    public zoomOut () {
        this.setZoom('-')
    }

    public rotate (type:string="+") {

    }

    public setZoom (flag:string="+") {
        console.log(this.currentImage, 6666)
    }

    public setImage (dom: HTMLImageElement | null) {
        this.currentImage = dom
    }

    public static addTotal () {
        this.total +=3
    }
}

export default ImageViewerCore;