import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import ru from '../locales/ru.json'
import en from '../locales/en.json'
import la from '../locales/la.json'

const resources = {
    ru: {
        translation: ru,
    },
    en: {
        translation: en,
    },
    la: {
        translation: la,
    },
}

/**
 * Определяем язык пользователя на основе настроек браузера
 */
const getUserLanguage = (): string => {
    const browserLang = navigator.language.slice(0, 2).toLowerCase()

    const languageMap: Record<string, string> = {
        ru: 'ru',
        en: 'en',
        la: 'la',
    }

    return languageMap[browserLang] || 'en'
}

i18n.use(initReactI18next).init({
    resources,
    lng: getUserLanguage(),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
})

export default i18n
