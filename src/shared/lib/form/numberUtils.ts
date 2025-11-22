/**
 * Ограничиваем значение в пределах min/max
 */
export const clampValue = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

/**
 * Преобразуем значение для отображения в процентах (умножаем на 100)
 */
export const toDisplayValue = (value: number): string => String(Math.round(value * 100))

/**
 * Преобразуем отображаемое значение обратно в число (делим на 100)
 */
export const fromDisplayValue = (displayValue: string): number => {
    const parsed = parseFloat(displayValue)
    return isNaN(parsed) ? 0 : parsed / 100
}

/**
 * Проверяем, является ли строка промежуточным состоянием ввода числа
 */
export const isIntermediateNumberInput = (value: string): boolean =>
    value === '' || value === '-' || value === '.' || value === '-.'
