import {SUPPORTED_LANGUAGES} from '@/shared/lib/i18n/config/languages'
import RussianFlag from '@/shared/ui/Icon/ui/flags/RussianFlag'
import AmericanFlag from '@/shared/ui/Icon/ui/flags/AmericanFlag'
import LatinFlag from '@/shared/ui/Icon/ui/flags/LatinFlag'
import {FC} from 'react'

export interface ILanguageWithFlag {
    code: string
    name: string
    nativeName: string
    flag: FC
}

export const useLanguageData = (): ILanguageWithFlag[] => {
    const flagComponents = {
        ru: RussianFlag,
        en: AmericanFlag,
        la: LatinFlag,
    }

    return SUPPORTED_LANGUAGES.map((lang) => ({
        ...lang,
        flag: flagComponents[lang.code as keyof typeof flagComponents],
    }))
}
