import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'
import {NestedPopover} from '@/shared/ui/DropdownMenu/components/NestedPopover/NestedPopover'
import {useLanguageData} from '@/shared/ui/InstructionTab/components/LanguageSwitcher/lib/useLanguageData'
import {t} from 'i18next'

interface ILanguageOptionButtonProps {
    isOpen: boolean
    onSelect: (type: 'language', value: string) => void
}

export const LanguageOptionButton: FC<ILanguageOptionButtonProps> = ({isOpen, onSelect}) => {
    const {i18n} = useTranslation()
    const languages = useLanguageData()

    return (
        <NestedPopover
            isOpen={isOpen}
            items={languages}
            renderItem={(lang) => (
                <button
                    key={lang.code}
                    className={cn('nested-popover-item', i18n.language === lang.code && 'active')}
                    onClick={() => onSelect('language', lang.code)}
                    title={cn(lang.nativeName, i18n.language === lang.code && t('TOOLTIP_ACTIVE_LANGUAGE'))}
                >
                    <span className="w-4 h-4 flex items-center justify-center text-sm flex-shrink-0">
                        <lang.flag />
                    </span>
                    <span className="flex-1 transition-transform duration-300 ease-out">{lang.nativeName}</span>
                </button>
            )}
        />
    )
}
