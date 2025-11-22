export interface ILanguage {
    code: string
    name: string
    nativeName: string
}

export const SUPPORTED_LANGUAGES: readonly ILanguage[] = [
    {
        code: 'ru',
        name: 'Русский',
        nativeName: 'Русский',
    },
    {
        code: 'en',
        name: 'English',
        nativeName: 'English',
    },
    {
        code: 'la',
        name: 'Latina',
        nativeName: 'Latina',
    },
] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']
