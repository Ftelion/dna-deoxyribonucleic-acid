import {RADIAL_MENU_CONSTANTS} from '../constants/radialMenuConstants'
import {clampValue} from '@/shared/lib/form/numberUtils'

/**
 * Рассчитываем позицию кнопки в радиальном меню
 */
export const calculateButtonPosition = (index: number, totalButtons: number, radius: number) => {
    const angle = (2 * Math.PI * index) / totalButtons - RADIAL_MENU_CONSTANTS.START_ANGLE_OFFSET
    const buttonRadius = radius - RADIAL_MENU_CONSTANTS.BUTTON_EDGE_OFFSET
    const centerOffset = radius - RADIAL_MENU_CONSTANTS.BUTTON_CENTER_OFFSET

    return {
        x: centerOffset + buttonRadius * Math.cos(angle),
        y: centerOffset + buttonRadius * Math.sin(angle),
    }
}

/**
 * Ограничиваем позицию меню в пределах окна браузера
 */
export const clampMenuPosition = (
    left: number | undefined,
    top: number | undefined,
    radius: number
): {x: number | undefined; y: number | undefined} => {
    if (typeof left !== 'number' || typeof top !== 'number') {
        return {x: left, y: top}
    }

    const clampedLeft = clampValue(left, 0, window.innerWidth - radius * 2)
    const clampedTop = clampValue(top, 0, window.innerHeight - radius * 2)

    return {x: clampedLeft, y: clampedTop}
}
