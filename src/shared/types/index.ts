/**
 * Константы для типов пар нуклеотидов DNA
 */
export const DNA_PAIR_TYPES = {
    AT: 'AT',
    GC: 'GC',
} as const

/**
 * Тип для обозначения типа пары нуклеотидов
 */
export type DNAPairType = (typeof DNA_PAIR_TYPES)[keyof typeof DNA_PAIR_TYPES]
export interface IVector3Array {
    0: number
    1: number
    2: number
}

export interface IDNAPair {
    id: number
    left: IVector3Array
    right: IVector3Array
    originalY: number
    color: string
}

/**
 * Типы тем приложения
 */
export type {ThemeType} from '@/shared/lib/theme/colors'
