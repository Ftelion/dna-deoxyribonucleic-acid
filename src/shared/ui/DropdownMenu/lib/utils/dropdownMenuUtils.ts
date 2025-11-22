import type {i18n} from 'i18next'
import type {ThemeType} from '@/shared/lib/theme/colors'

export type MenuItem =
    | 'theme'
    | 'theme-dark'
    | 'theme-light'
    | 'language-ru'
    | 'language-en'
    | 'language-la'
    | 'reset'
    | 'settings'

interface IDropdownMenuUtils {
    i18n: i18n
    resetAll: () => void
    setIsSideMenuOpen: (isOpen: boolean) => void
    setTheme: (theme: ThemeType) => void
}

export const createDropdownMenuHandler = ({i18n, resetAll, setIsSideMenuOpen, setTheme}: IDropdownMenuUtils) => {
    return (item: string) => {
        const menuItem = item as MenuItem
        switch (menuItem) {
            case 'theme':
                // Логика для показа подменю тем
                break
            case 'theme-dark':
                setTheme('dark')
                break
            case 'theme-light':
                setTheme('light')
                break
            case 'language-ru':
                i18n.changeLanguage('ru')
                break
            case 'language-en':
                i18n.changeLanguage('en')
                break
            case 'language-la':
                i18n.changeLanguage('la')
                break
            case 'reset':
                resetAll()
                break
            case 'settings':
                // Открываем drawer с настройками
                setIsSideMenuOpen(true)
                break
        }
    }
}
