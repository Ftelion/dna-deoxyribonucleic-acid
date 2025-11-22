import {DNA_NUCLEOTIDES} from '@/shared/lib/theme/colors'
import {DNAPairType, DNA_PAIR_TYPES} from '@/shared/types'

interface IUseLegendItemStylesParams {
    pairType: DNAPairType
    isActive: boolean
    onToggle?: () => void
}

/**
 * Получаем стили для элемента легенды
 */
export const useLegendItemStyles = ({pairType, isActive, onToggle}: IUseLegendItemStylesParams) => {
    const pairColor = pairType === DNA_PAIR_TYPES.AT ? DNA_NUCLEOTIDES.adenineThymine : DNA_NUCLEOTIDES.guanineCytosine

    const background = isActive
        ? `linear-gradient(135deg, ${pairColor}20 0%, ${pairColor}10 100%)`
        : 'linear-gradient(135deg, rgba(156, 163, 175, 0.04) 0%, rgba(209, 213, 219, 0.04) 100%)'

    const borderColor = isActive ? `${pairColor}40` : 'rgba(156, 163, 175, 0.12)'

    const hoverBackground = isActive
        ? `linear-gradient(135deg, ${pairColor}30 0%, ${pairColor}20 100%)`
        : 'linear-gradient(135deg, rgba(156, 163, 175, 0.08) 0%, rgba(209, 213, 219, 0.08) 100%)'

    const hoverBorderColor = isActive ? `${pairColor}60` : 'rgba(156, 163, 175, 0.2)'

    return {
        '--item-background': background,
        '--item-border-color': borderColor,
        '--item-hover-background': hoverBackground,
        '--item-hover-border-color': hoverBorderColor,
        '--item-opacity': isActive ? '1' : '0.6',
        '--item-cursor': onToggle ? 'pointer' : 'default',
        '--indicator-color': isActive ? pairColor : '#9ca3af',
        '--indicator-border-color': isActive ? pairColor : '#d1d5db',
        '--label-weight': isActive ? '600' : '500',
        '--label-color': '#6b7280',
    }
}
