import zh from './zhCn'
import en from './enCn'

export const messages = {
    en,
    zh
}

const language = (navigator.language || 'en').toLocaleLowerCase()

export const lang = localStorage.getItem('lang') as string || language.split('-')[0] || 'zh'