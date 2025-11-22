import {FC, memo, useCallback} from 'react'
import cn from 'classnames'
import type {ILanguageWithFlag} from '@/shared/ui/InstructionTab/components/LanguageSwitcher/lib/useLanguageData'
import LanguageButtonContent from './LanguageButtonContent'
import './LanguageButton.css'

interface ILanguageButtonProps {
    language: ILanguageWithFlag
    isActive: boolean
    onClick: (langCode: string) => void
}

const LanguageButton: FC<ILanguageButtonProps> = ({language, isActive, onClick}) => {
    const handleClick = useCallback(() => {
        onClick(language.code)
    }, [onClick, language.code])

    return (
        <button
            onClick={handleClick}
            className={cn('language-button group', isActive && 'active')}
            title={language.nativeName}
            aria-label={`Выбрать язык ${language.nativeName}`}
            aria-pressed={isActive}
        >
            <LanguageButtonContent language={language} isActive={isActive} />
        </button>
    )
}

export default memo(LanguageButton)
