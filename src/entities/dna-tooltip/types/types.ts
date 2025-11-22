import type {DNANucleotideColor} from '@/shared/types/colors'

export type TooltipState = 'selected' | 'hover' | 'default'

export interface ITooltipBadgeProps {
    visible: boolean
    className: string
    text: string
    indicatorClassName: string
}

// Интерфейс для данных одного tooltip'а
export interface ITooltipData {
    id: number
    state: TooltipState
    baseColor: DNANucleotideColor
    basePairLabel: string
    containerClassName: string
    indicatorStyle: React.CSSProperties
    badgeProps: ITooltipBadgeProps
}
