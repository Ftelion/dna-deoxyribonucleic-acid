import {useState, useEffect} from 'react'
import type {ThemeType} from './colors'

const THEME_STORAGE_KEY = 'dna-explorer-theme'

/**
 * Получаем сохраненную тему из localStorage или определяем системную тему
 */
const getStoredTheme = (): ThemeType => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
        return stored
    }

    // Определяем системную тему
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
}

/**
 * Сохраняем тему в localStorage
 */
const saveTheme = (theme: ThemeType): void => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
}

/**
 * Применяем тему к document.body
 */
const applyTheme = (theme: ThemeType): void => {
    document.body.setAttribute('data-theme', theme)
}

/**
 * Хук для управления темой приложения
 */
export const useTheme = () => {
    const [theme, setTheme] = useState<ThemeType>(() => getStoredTheme())

    // Применяем тему при изменении
    useEffect(() => {
        applyTheme(theme)
        saveTheme(theme)
    }, [theme])

    // Слушаем изменения системной темы
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e: MediaQueryListEvent) => {
            // Меняем тему только если нет сохраненной темы в localStorage
            if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                const newTheme = e.matches ? 'dark' : 'light'
                setTheme(newTheme)
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    const setThemeValue = (newTheme: ThemeType) => {
        setTheme(newTheme)
    }

    return {
        theme,
        toggleTheme,
        setTheme: setThemeValue,
    }
}
