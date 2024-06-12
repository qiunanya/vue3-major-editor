import SvgIcon from './index.vue';

// 使用install方法，在app.use挂载
SvgIcon.install = app => {
    app.component('SvgIcon', SvgIcon)
}

export { SvgIcon }

export default SvgIcon;