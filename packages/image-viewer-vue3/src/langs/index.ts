import zh from './zhCn'
import en from './enCn'

export const messages = {
    en,
    zh
}

const language = (navigator.language || 'zh').toLocaleLowerCase()

export const lang = localStorage.getItem('lang') as string || language.split('-')[0] || 'zh'


import { createI18n } from "vue-i18n";
import zhCN from "./locales/zh_CN";
import enUS from "./locales/en_US";

const i18n = createI18n({
    legacy: false,
    locale: "zh-cn", // 默认显示语言
    messages: {
        "zh-cn": zhCN,
        "en-us": enUS,
    },
});

export default i18n;