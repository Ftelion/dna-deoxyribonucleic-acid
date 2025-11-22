import type {ITooltipBadgeProps, TooltipState} from '../types/types'

/**
 * Получаем CSS класс контейнера tooltip'а
 */
export const getTooltipClassName = (state: TooltipState, size: 'normal' | 'small' = 'normal'): string => {
    const baseClasses = 'tooltip-container'
    const sizeClass = size === 'small' && 'tooltip-small'

    const stateClass = (() => {
        switch (state) {
            case 'selected':
                return 'tooltip-selected'
            case 'hover':
                return 'tooltip-hover'
            case 'default':
                return 'tooltip-default'
        }
    })()

    return [baseClasses, sizeClass, stateClass].filter(Boolean).join(' ')
}

/**
 * Получаем стиль индикатора tooltip'а
 */
export const getIndicatorStyle = (state: TooltipState, baseColor: string) => {
    if (state === 'default') {
        return {backgroundColor: baseColor}
    }
    return {}
}

/**
 * Получаем базовые свойства бейджа tooltip'а без текстов
 */
export const getBadgeBaseProps = (state: TooltipState): Omit<ITooltipBadgeProps, 'text'> => {
    switch (state) {
        case 'selected':
            return {
                visible: true,
                className: 'tooltip-badge tooltip-badge-selected',
                indicatorClassName: 'tooltip-badge-indicator tooltip-badge-indicator-selected',
            }
        case 'hover':
            return {
                visible: true,
                className: 'tooltip-badge tooltip-badge-hover',
                indicatorClassName: 'tooltip-badge-indicator tooltip-badge-indicator-hover',
            }
        default:
            return {
                visible: false,
                className: '',
                indicatorClassName: '',
            }
    }
}

/**
 * Получаем текст для бейджа в зависимости от состояния
 */
export const getBadgeTextKey = (state: TooltipState): string => {
    switch (state) {
        case 'selected':
            return 'SELECTED'
        case 'hover':
            return 'CLICK_TO_SELECT'
        default:
            return ''
    }
}
