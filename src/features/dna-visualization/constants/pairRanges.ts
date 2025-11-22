/**
 * Предопределенные диапазоны пар нуклеотидов для быстрого выбора
 */
export const PAIR_RANGES = [
    {
        label: '1-19',
        range: Array.from({length: 20}, (_, i) => i * 2 + 1),
    },
    {
        label: '2-20',
        range: Array.from({length: 20}, (_, i) => i * 2 + 2),
    },
    {
        label: 'Все',
        range: Array.from({length: 40}, (_, i) => i + 1),
    },
] as const

/**
 * Тип для диапазона пар
 */
export type PairRange = (typeof PAIR_RANGES)[number]
