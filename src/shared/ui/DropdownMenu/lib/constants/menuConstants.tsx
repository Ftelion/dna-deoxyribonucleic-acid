import {ReactNode} from 'react'
import {SettingsIcon} from '@/shared/ui/Icon/ui/dropdownMenuIcons/SettingsIcon'
import {ResetIcon} from '@/shared/ui/Icon/ui/dropdownMenuIcons/ResetIcon'
import {ThemeIcon} from '@/shared/ui/Icon/ui/dropdownMenuIcons/ThemeIcon'
import {LanguageIcon} from '@/shared/ui/Icon/ui/dropdownMenuIcons/LanguageIcon'
import {SunIcon} from '@/shared/ui/Icon/ui/dropdownMenuIcons/SunIcon'
import {MoonIcon} from '@/shared/ui/Icon/ui/dropdownMenuIcons/MoonIcon'

export interface IMenuItem {
    id: string
    icon: ReactNode
    labelKey: string
    labelFallback: string
}

export interface IThemeOption {
    id: string
    icon: ReactNode
    labelKey: string
    labelFallback: string
}

export const themeOptions: IThemeOption[] = [
    {
        id: 'dark',
        icon: <MoonIcon />,
        labelKey: 'DARK_THEME',
        labelFallback: 'Темная',
    },
    {
        id: 'light',
        icon: <SunIcon />,
        labelKey: 'LIGHT_THEME',
        labelFallback: 'Светлая',
    },
]

export const getMenuItems = (): IMenuItem[] => [
    {
        id: 'reset',
        icon: <ResetIcon />,
        labelKey: 'RESET_MENU_ITEM',
        labelFallback: 'Сброс',
    },
    {
        id: 'theme',
        icon: <ThemeIcon />,
        labelKey: 'THEME_MENU_ITEM',
        labelFallback: 'Тема',
    },
    {
        id: 'language',
        icon: <LanguageIcon />,
        labelKey: 'LANGUAGE_MENU_ITEM',
        labelFallback: 'Язык',
    },
    {
        id: 'settings',
        icon: <SettingsIcon />,
        labelKey: 'SETTINGS_MENU_ITEM',
        labelFallback: 'Настройки',
    },
]
