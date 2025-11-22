import {FC, ReactNode, createContext, useContext} from 'react'
import {useTheme} from './useTheme'
import type {ThemeType} from './colors'

interface IThemeContextValue {
    theme: ThemeType
    toggleTheme: () => void
    setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<IThemeContextValue | undefined>(undefined)

interface IThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider: FC<IThemeProviderProps> = ({children}) => {
    const themeValue = useTheme()

    return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
}

/**
 * Хук для использования контекста темы
 */
export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider')
    }
    return context
}
