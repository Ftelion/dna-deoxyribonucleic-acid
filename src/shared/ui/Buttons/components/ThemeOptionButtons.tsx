import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'
import {NestedPopover} from '@/shared/ui/DropdownMenu/components/NestedPopover/NestedPopover'
import {themeOptions} from '@/shared/ui/DropdownMenu/lib/constants/menuConstants'
import {useThemeContext} from '@/shared/lib/theme/ThemeProvider'
import '@/shared/ui/DropdownMenu/ui/ThemeIconsAnimation.css'

interface IThemeOptionButtonsProps {
    isOpen: boolean
    onSelect: (type: 'theme', value: string) => void
}

export const ThemeOptionButtons: FC<IThemeOptionButtonsProps> = ({isOpen, onSelect}) => {
    const {t} = useTranslation()
    const {theme: currentTheme} = useThemeContext()

    return (
        <NestedPopover
            isOpen={isOpen}
            items={themeOptions}
            renderItem={(theme) => (
                <button
                    key={theme.id}
                    className={cn('nested-popover-item', currentTheme === theme.id && 'active')}
                    onClick={() => onSelect('theme', theme.id)}
                    title={cn(
                        t(theme.labelKey, theme.labelFallback),
                        currentTheme === theme.id && t('TOOLTIP_ACTIVE_THEME')
                    )}
                >
                    <span
                        className={cn(
                            'w-4 h-4 flex items-center justify-center text-sm flex-shrink-0',
                            theme.id === 'light' && 'sun-icon',
                            theme.id === 'dark' && 'moon-icon'
                        )}
                    >
                        {theme.icon}
                    </span>
                    <span className="flex-1 transition-transform duration-300 ease-out">
                        {t(theme.labelKey, theme.labelFallback)}
                    </span>
                </button>
            )}
        />
    )
}
