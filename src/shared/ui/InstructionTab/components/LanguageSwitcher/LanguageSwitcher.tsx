import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {useLanguageData} from './lib/useLanguageData'
import {SectionTitle} from '@/shared/ui/Typography/ui/SectionTitle'
import LanguageButton from '@/shared/ui/Buttons/components/LanguageInInstructionsTab/LanguageButton'

const LanguageSwitcher: FC = () => {
    const {i18n} = useTranslation()
    const languages = useLanguageData()

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode)
    }

    return (
        <div className="pl-1 pb-4 pr-2">
            <SectionTitle titleKey="LANGUAGE" size="base" color="light-gray" />
            <div className="grid grid-cols-1 gap-3 pl-2 pr-1">
                {languages.map((lang) => {
                    const isActive = i18n.language === lang.code
                    return (
                        <LanguageButton key={lang.code} language={lang} isActive={isActive} onClick={changeLanguage} />
                    )
                })}
            </div>

            {/* Дополнительная информация */}
            <div className="mt-4 pl-2 pr-1">
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    {i18n.t('LANGUAGE_HINT', 'Выберите язык интерфейса для комфортной работы')}
                </p>
            </div>
        </div>
    )
}

export default LanguageSwitcher
