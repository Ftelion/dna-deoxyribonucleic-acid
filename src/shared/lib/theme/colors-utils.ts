import {UI_COLORS, TOOLTIP_COLORS} from './colors'
import type {ThemeType} from './colors'

/**
 * Получаем цвет кнопки с учетом темы и состояния
 */
export const getButtonColor = (
    variant: 'primary' | 'secondary' | 'success',
    state: 'default' | 'hover' | 'active' = 'default',
    theme: ThemeType = 'light'
) => {
    const themeColors = UI_COLORS[theme]
    const buttonVariant = themeColors.button[variant] as Record<string, string>
    return buttonVariant[state] ?? buttonVariant.default
}

/**
 * Получаем цвета UI компонентов для текущей темы
 */
export const getUIColors = (theme: ThemeType = 'light') => {
    return UI_COLORS[theme]
}

/**
 * Получаем цвета tooltip для текущей темы
 */
export const getTooltipColors = (theme: ThemeType = 'light') => {
    return TOOLTIP_COLORS[theme]
}

/**
 * Конвертирует hex цвет в rgba формат с указанной прозрачностью
 */
export const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
