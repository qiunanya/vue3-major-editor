import { createI18n } from 'vue-i18n'
import zh from './zhCn'
import en from './enCn'

const messages = {
    en,
    zh
}

const language = (navigator.language || 'en').toLocaleLowerCase()

const i18n = createI18n({
    locale: localStorage.getItem('lang') as string || language.split('-')[0] || 'zh',
    fallbackLocale: 'zh',
    messages
})

export default i18n;