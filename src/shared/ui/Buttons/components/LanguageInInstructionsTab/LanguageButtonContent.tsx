import {FC} from 'react'
import cn from 'classnames'
import type {ILanguageWithFlag} from '@/shared/ui/InstructionTab/components/LanguageSwitcher/lib/useLanguageData'

interface ILanguageButtonContentProps {
    language: ILanguageWithFlag
    isActive: boolean
}

const LanguageButtonContent: FC<ILanguageButtonContentProps> = ({language, isActive}) => {
    return (
        <>
            <div
                className={cn(
                    'absolute inset-0 transition-all duration-300 ease-out',
                    isActive
                        ? 'bg-gradient-to-br from-blue-400/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-700/20'
                        : 'bg-gradient-to-br from-transparent to-transparent group-hover:from-blue-50/50 group-hover:to-blue-100/50 dark:group-hover:from-blue-900/30 dark:group-hover:to-blue-800/30'
                )}
            />

            <div className="relative z-10 mb-1 transform transition-transform duration-300 ease-out group-hover:scale-110">
                <language.flag />
            </div>

            <div
                className={cn(
                    'relative z-10 text-xs font-medium transition-all duration-300 ease-out',
                    isActive
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400'
                )}
            >
                {language.nativeName}
            </div>

            {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
            )}
        </>
    )
}

export default LanguageButtonContent
